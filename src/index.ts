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

needle.get(tmp, async function (err: any, res: any) {
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

  let rowCounter = 2;
  for (const [index, item] of facults.entries()) {
    xls.writeFacult(item, rowCounter);
    // parse all majors from Facults
    const FacultInfo = await getAllFacults(item);
    if (FacultInfo.BC_SK) {
      for (const [subIndex, majorItem] of FacultInfo.BC_SK.entries()) {
        /**
         * TODO: 
         * 1) Get data from links
         * 2) Write all data into Excel in row
         * 3) Merge cells
         */

        // parse all info from page of Major
        const major = await getMajorInfo(majorItem.link);
        xls.writeMajor(majorItem, major, rowCounter);
        rowCounter++;
      }
    }

    if (FacultInfo.ING_SK) {
      for (const [subIndex, majorItem] of FacultInfo.ING_SK.entries()) {
        /**
         * TODO: 
         * 1) Get data from links
         * 2) Write all data into Excel in row
         * 3) Merge cells
         */

        // parse all info from page of Major
        const major = await getMajorInfo(majorItem.link);
        xls.writeMajor(majorItem, major, rowCounter);
        rowCounter++;
      }
    }

    if (FacultInfo.BC_EN) {
      for (const [subIndex, majorItem] of FacultInfo.BC_EN.entries()) {
        /**
         * TODO: 
         * 1) Get data from links
         * 2) Write all data into Excel in row
         * 3) Merge cells
         */

        // parse all info from page of Major
        const major = await getMajorInfo(majorItem.link);
        xls.writeMajor(majorItem, major, rowCounter);
        rowCounter++;
      }
    }

    if (FacultInfo.ING_EN) {
      for (const [subIndex, majorItem] of FacultInfo.ING_EN.entries()) {
        /**
         * TODO: 
         * 1) Get data from links
         * 2) Write all data into Excel in row
         * 3) Merge cells
         */

        // parse all info from page of Major
        const major = await getMajorInfo(majorItem.link);
        xls.writeMajor(majorItem, major, rowCounter);
        rowCounter++;
      }
    }
  }
  xls.saveFile('Zilinska univerzita v ziline.xlsx');
});
