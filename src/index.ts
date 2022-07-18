// modules
const needle  = require('needle');
const cheerio = require('cheerio');

require('dotenv').config({path: __dirname+'/.env'});

// interfaces
import { FaculteInterface } from './interface/FacultsInterface';
import { MajorsInterface, FacultMajorsInterface } from './interface/MajorsInterface';

// services
import { Logger } from './services/Logger';
import { getAllFacults } from './services/Facults';

// const
/**
 * TODO: all link parse autmaticly
 */
const tmp = 'https://www.portalvs.sk/sk/vysoka-skola/zilinska-univerzita-v-ziline';

console.info('Starting parser...');
console.info('Get facults from university...');
needle.get(tmp, function (err:any, res:any) {
  if (err) {
    Logger(err);
    throw err;
  }

  let $ = cheerio.load(res.body);
  const title = $('h1').text();

  const facults = $('ul.list-university-faculties li').toArray().map(
    (element:any) => {
      return {
        'text': $('a', element).attr('title'),
        'link': process.env.APP_BASE_URI + $('a', element).attr('href'),
      };
    }
  );

  // facults.forEach((item:FaculteInterface) => {
    // getAllFacults(item);
    getAllFacults(facults[0]);
  // });
});
