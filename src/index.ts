// modules
const needle  = require('needle');
const cheerio = require('cheerio');
const Logger  = require('./Logger');
require('dotenv').config();

// interfaces
import { FaculteInterface } from './interface/FacultsInterface';
import { MajorsInterface } from './interface/MajorsInterface';

// const
const tmp = 'https://www.portalvs.sk/sk/vysoka-skola/zilinska-univerzita-v-ziline';

needle.get(tmp, function (err:any, res:any) {
  if (err) {
    Logger(err);
    throw err;
  }

  let $ = cheerio.load(res.body);
  const title = $('h1').text();
  
  const facults = $('ul.list-university-faculties li').toArray().map(
    (element:any) => 
    {
      return {
        'text': $('a', element).attr('title'),
        'link': process.env.APP_BASE_URI + $('a', element).attr('href'),
      };
    }
  );
  facults.forEach((item:FaculteInterface) => {
    needle.get(item.link, function (err:any, res:any) {
      if (err) {
        Logger(err);
        throw err;
      }

      let $ = cheerio.load(res.body);
      const title  = $('h1').text();
      const majors_BC_SK = $(`div#${process.env.APP_BC_TABLE_ID} td`).toArray().map(
        (elemenet:any) => 
        {
          return {
            'text': $('a', elemenet).text().trim() + $('small', elemenet).text().trim(),
            'link': process.env.APP_BASE_URI + $('a', elemenet).attr('href')
          };
        }
      );

      // check on EN
      const majors_BC_EN = $(`div#${process.env.APP_BC_EN_TABLE_ID} td`);
      if (majors_BC_EN) {
        // get data
      } else {
        // EN - nothing
      }

      console.log(majors_BC_SK);
      
    });
  });
  // console.log(facults);
});
