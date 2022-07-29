// modules
const needle  = require('needle');
const cheerio = require('cheerio');

// services
import { Logger } from './Logger';

// interfaces
import { MajorsInterface, defaultMajor } from '../interface/MajorsInterface';

export const getMajorInfo = (link: string, callback: (data:MajorsInterface) => void) => {
  // @FIX: callback problem
  needle.get(link, function (err:any, res:any) {
    if (err) {
      throw err;
    }

    const majorInfo:MajorsInterface = defaultMajor;

    let $ = cheerio.load(res.body);
    majorInfo.title = $('h1').text();
    majorInfo.desc  = $('div#details-jobopportunities').text().trim();

    const info = $(`ul.list-dl-primary li`).toArray().map(
      (element:any) => {
        const itemTitle  = $('span.dt', element).text().trim();
        const itemDesc   = $('strong.dd', element).text().trim();
        getCurrectDesc(itemTitle, itemDesc, majorInfo);
      }
    );

    // find payments
    const paymentText = $('div#details-charges').html();
    if (paymentText.length > 0) {
      let substring  = '<strong>Ročné školné</strong><br>',
          startIndex = paymentText.search(substring),
          endIndex   = 0;
      if (startIndex !== -1) {
        let tmp = paymentText.substring(startIndex + substring.length);
        // find standart price
        endIndex = tmp.search('<br>');
        majorInfo.paymentStandart = tmp.substring(0, endIndex).trim();
        tmp = tmp.substring(endIndex + '<br>'.length);
        // find other price
        endIndex = tmp.search('<br>');
        majorInfo.paymentOther = tmp.substring(0, endIndex).trim();
      }
      substring = 'elektronická prihláška:';
      startIndex = paymentText.search(substring);
      if (startIndex !== -1) {
        let tmp = paymentText.substring(startIndex);
        endIndex = tmp.search('<br>');
        majorInfo.paymentInvite = tmp.substring(0, endIndex).trim();
      }
    }

    callback(majorInfo);
  });

  // save value to currect key
  function getCurrectDesc(title:string, desc:string, majorInfo:MajorsInterface) {
    switch (title) {
      case 'Forma štúdia:':
        majorInfo.studyForm = desc
        break;
      case 'Predpokladaný počet prijatých:':
        majorInfo.students = parseInt(desc);
        break;
      case 'Dĺžka štúdia:':
        majorInfo.studyYears = parseInt(desc);
        break;
      case 'Metóda štúdia:':
        majorInfo.studyMethod = desc;
        break;
      case 'Titul absolventov:':
        majorInfo.graduate = desc;
        break;
      case 'Informácie o vyučovacích jazykoch:':
        majorInfo.language = desc;
        break;
    }
  }

};