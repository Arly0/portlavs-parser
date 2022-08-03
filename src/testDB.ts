import {Database} from './services/Connection';
import {Logger} from './services/Logger';
import {Excel} from './services/Excel';

require('dotenv').config({path: '../.env'});

const xls = new Excel();
xls.createNewPage('Hello');
// xls.setDefaultHeader();
xls.saveFile('testik.xlsx');

// const logger = new Logger();
// logger.writeLog('TEST2');

// const conn = new Database();
// conn.getUniversity(1, (result:number) => {
  // console.log(result);
// });