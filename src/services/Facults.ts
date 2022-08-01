// modules
const needle = require('needle');
const cheerio = require('cheerio');

// services
import { Logger } from './Logger';
import { getMajorInfo } from './Majors';

import { FaculteInterface } from './../interface/FacultsInterface';
import { FacultMajorsInterface } from '../interface/MajorsInterface';

export const getAllFacults =
  async (
    facult: FaculteInterface,
    // callback: (result: FacultMajorsInterface) => void
  ) => {
    let majors_BC_SK: any = [],
      majors_ING_SK: any = [],
      majors_BC_EN: any = [],
      majors_ING_EN: any = [];

    return needle('get', facult.link)
      .then((res: any) => {

        let $ = cheerio.load(res.body);
        const titleFacult = $('h1').text();

        /**
         * SK
         */

        // BC
        const majors_BC_SK_Layout = $(`div#${process.env.APP_BC_TABLE_ID} td`)
        if (majors_BC_SK_Layout) {
          majors_BC_SK = majors_BC_SK_Layout.toArray().map(
            (elemenet: any) => {
              return {
                'text': $('a', elemenet).text().trim() + $('small', elemenet).text().trim(),
                'link': process.env.APP_BASE_URI + $('a', elemenet).attr('href')
              };
            }
          );
        }


        // ING
        let majors_ING_SK_Layout = $(`div#${process.env.APP_ING_TABLE_ID} td`)
        if (majors_ING_SK_Layout) {
          majors_ING_SK = majors_ING_SK_Layout.toArray().map(
            (elemenet: any) => {
              return {
                'text': $('a', elemenet).text().trim() + $('small', elemenet).text().trim(),
                'link': process.env.APP_BASE_URI + $('a', elemenet).attr('href')
              };
            }
          );
        }

        /**
         * ENG
         */

        // BC
        let majors_BC_EN_Layout = $(`div#${process.env.APP_BC_EN_TABLE_ID} td`);
        if (majors_BC_EN_Layout) {
          majors_BC_EN = majors_BC_EN_Layout.toArray().map(
            (elemenet: any) => {
              return {
                'text': $('a', elemenet).text().trim() + $('small', elemenet).text().trim(),
                'link': process.env.APP_BASE_URI + $('a', elemenet).attr('href')
              };
            }
          )
        }

        // ING
        let majors_ING_EN_Layout = $(`div#${process.env.APP_ING_EN_TABLE_ID} td`);
        if (majors_ING_EN_Layout) {
          majors_ING_EN = majors_ING_EN_Layout.toArray().map(
            (elemenet: any) => {
              return {
                'text': $('a', elemenet).text().trim() + $('small', elemenet).text().trim(),
                'link': process.env.APP_BASE_URI + $('a', elemenet).attr('href')
              };
            }
          )
        }

        const FacultInfo: FacultMajorsInterface = {
          'title': titleFacult,
          'BC_SK': majors_BC_SK,
          'ING_SK': majors_ING_SK,
          'BC_EN': majors_BC_EN,
          'ING_EN': majors_ING_SK,
        };

        return FacultInfo;
        // return callback(FacultInfo);
      })
      .catch((err: any) => {
        if (err) {
          // Logger(err);
        }
      });
  }