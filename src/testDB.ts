import {Database} from './services/Connection';

require('dotenv').config({path: '../.env'});

console.info('Try to connect');
const conn = new Database();
conn.getUniversity(1, (result:number) => {
  console.log(result);
});