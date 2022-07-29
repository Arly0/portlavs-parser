// modules
const needle = require('needle');
const cheerio = require('cheerio');

require('dotenv').config({ path: '../.env' });

// interfaces
import { FaculteInterface } from './interface/FacultsInterface';
import { MajorsInterface, FacultMajorsInterface } from './interface/MajorsInterface';
import { Database } from './services/Connection';

// services
import { Logger } from './services/Logger';
import { Excel } from './services/Excel';
import { getAllFacults } from './services/Facults';
import { getMajorInfo } from './services/Majors';

// const
/**
 * TODO: all link parse autmaticly
 */
const tmp = 'https://www.portalvs.sk/sk/vysoka-skola/zilinska-univerzita-v-ziline';

console.info('Starting parser...');
console.info('Get facults from university...');
// init Logger
const logger = new Logger(true);

needle.get(tmp, function (err: any, res: any) {
  if (err) {
    logger.writeLog(err);
  }

  let $ = cheerio.load(res.body);
  const title = $('h1').text();

  const facults = $('ul.list-university-faculties li').toArray().map(
    (element: any) => {
      return {
        'text': $('a', element).attr('title'),
        'link': process.env.APP_BASE_URI + $('a', element).attr('href'),
      };
    }
  );

  // init Excel instance
  const xls = new Excel(true, 'Zilinska univerzita v ziline');

  facults.forEach((item: FaculteInterface, index: number) => {
    xls.writeFacult(item, index+1);

    // parse all majors from Facults
    getAllFacults(item, (FacultInfo: FacultMajorsInterface) => {
      // index + secondIndex for merge cells
      let secondIndex = 0;
      if (FacultInfo.BC_SK) {
        FacultInfo.BC_SK.forEach((majorItem: FaculteInterface, majorIndex: number) => {
          /**
           * TODO: 
           * 1) Get data from links
           * 2) Write all data into Excel in row
           * 3) Merge cells
           */

          // parse all info from page of Major
          getMajorInfo(majorItem.link, (data:MajorsInterface) => {
            xls.writeMajor(majorItem, data, (index+1)+majorIndex);
          });
        });
      }

      // this is last
      // xls.writeFacult(item, index + 1);
      xls.saveFile('Zilinska univerzita v ziline.xlsx');
    });
    return;
  });
});
