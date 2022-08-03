// modules
const needle  = require('needle');
const cheerio = require('cheerio');
const fs      = require("fs");

require('dotenv').config({ path: '../.env' });

// interfaces
import { FaculteInterface } from './interface/FacultsInterface';
import { MajorsInterface, FacultMajorsInterface } from './interface/MajorsInterface';
// import { Database } from './services/Connection';

// services
import { Logger } from './services/Logger';
import { Excel } from './services/Excel';
import { getAllFacults } from './services/Facults';
import { getMajorInfo } from './services/Majors';

// const
/**
 * TODO: all link parse autmaticly
 */

const university = JSON.parse(fs.readFileSync('./univers.json')).university;

console.info('Starting parser...');
console.info('Get facults from university...');

(async () => {
  // init Logger
  const logger = new Logger(true);
  let xls = new Excel();

  for await (const tmp of university) {
    await needle('get', tmp)
    .then(async (res:any) => {
      let $ = cheerio.load(res.body);
      const title = $('h1').text();
      console.info(`Parsing ${title}`);
      await xls.createNewPage(title);
      await xls.setDefaultHeader();

      const facults = $('ul.list-university-faculties li').toArray().map(
        (element: any) => {
          return {
            'text': $('a', element).attr('title'),
            'link': process.env.APP_BASE_URI + $('a', element).attr('href'),
          };
        }
      );

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
    })
    .catch(async (err:any) => {
      if (err) {
        logger.writeLog(err);
      }
    });
  }
  
  console.log('Save file');
  xls.saveFile('PortalVS_parsing_data.xlsx');
})();


/**
 *  
    "https://www.portalvs.sk/sk/vysoka-skola/katolicka-univerzita-v-ruzomberku",
    "https://www.portalvs.sk/sk/vysoka-skola/slovenska-polnohospodarska-univerzita-v-nitre",
    "https://www.portalvs.sk/sk/vysoka-skola/trnavska-univerzita-v-trnave",
    "https://www.portalvs.sk/sk/vysoka-skola/univerzita-komenskeho-v-bratislave",
    "https://www.portalvs.sk/sk/vysoka-skola/univerzita-konstantina-filozofa-v-nitre",
    "https://www.portalvs.sk/sk/vysoka-skola/univerzita-mateja-bela-v-banskej-bystrici",
    "https://www.portalvs.sk/sk/vysoka-skola/univerzita--pavla-jozefa-safarika-v-kosiciach",
    "https://www.portalvs.sk/sk/vysoka-skola/univerzita-sv-cyrila-a-metoda-v-trnave",
    "https://www.portalvs.sk/sk/vysoka-skola/univerzita-veterinarskeho-lekarstva-v-kosiciach",
    "https://www.portalvs.sk/sk/vysoka-skola/slovenska-zdravotnicka-univerzita-v-bratislave"
 */