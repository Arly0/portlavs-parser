const mysql = require('mysql');
import {Connection} from 'mysql';

// services
import { Logger } from './Logger';

// interfaces
import { UniversityInterface } from '../interface/UniversityInterface'

class Database {
  connection: Connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.APP_DB_HOST || 'localhost',
      user: process.env.APP_DB_USER,
      password: process.env.APP_DB_PASSWORD,
      database: process.env.APP_DB_DATABASE,
      socketPath: 
    });
    
    this.connection.connect(function(err:any) {
      if (err) {
        Logger('Bad connection to DB!');
        Logger(err);
        throw err;
      }
      console.info('Success connection to database!');
    })
  }

  addUniversity (university:UniversityInterface)
  {
    const sql = `INSERT INTO universities (name, link) VALUES (${university.title}, ${university.link})`;

    this.connection.query(sql, (err, result) => {
      if (err) {
        Logger(err);
        throw err;
      }

      console.info(`Write new university to DB! [${university.title}]`);
    })
  }

  addFacult ()
  {

  }

  addMajors ()
  {

  }
}