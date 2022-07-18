const mysql = require('mysql');
import {Connection} from 'mysql';

// services
import { Logger } from './Logger';

// interfaces
import { UniversityInterface } from '../interface/UniversityInterface';
import { FaculteInterface } from '../interface/FacultsInterface';
import { ErrorTypes } from '../interface/LoggerInterface';

export class Database {
  connection: Connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.APP_DB_HOST || 'localhost',
      user: process.env.APP_DB_USER,
      password: process.env.APP_DB_PASSWORD,
      database: process.env.APP_DB_DATABASE,
      socketPath: process.env.APP_DB_UNIX_SOCKET,
    });
    
    this.connection.connect(function(err:any) {
      if (err) {
        Logger('Cannot connect to DB!', ErrorTypes.Error);
        Logger(err.stack);
      }
      Logger('Success connection to database!', ErrorTypes.Info);
    })
  }

  /**
   * 
   * @param univ number | string - can be ID or name
   * @param callback function
   * 
   * @return number
   */
  getUniversity (univ: number | string, callback:(result:number) => void)
  {
    let sql = `SELECT * FROM universities WHERE name = '${univ}' OR id = ${univ};`;
    return this.connection.query(sql, function(err:any, result:any) {
      if (err) {
        Logger(err);
        return false;
      }
      return callback(result[0].id);
    });
  }

  /**
   * 
   * @param university UniversityInterface
   * @return Boolean
   */
  addUniversity (university:UniversityInterface)
  {
    // Table University - title have index UNIQUE
    let sql = `INSERT INTO universities (name, link) VALUES (${university.title}, ${university.link})`;

    this.connection.query(sql, (err:any, result:any) => {
      if (err) {
        Logger(err);
        return false;
      }

      Logger(`Write new university to DB! [${university.title}] -> ${result.insertId}`, ErrorTypes.Info);
      
    });
    return true;
  }

  /**
   * 
   * @param facults FaculteInterface[]
   * @param univerId number
   * @return Boolean
   */
  addFacult (facults:FaculteInterface[], univerId:number)
  {
    let sql = `SELECT * FROM facults WHERE university_id = ${univerId} AND name IN (`;
    facults.forEach((facult:FaculteInterface) => {
      sql += `${facult.text},`;
    });
    sql = sql.slice(0, -1);
    sql += `);`;

    this.connection.query(sql, function(err:any, result:any) {

    });
  }

  addMajors ()
  {

  }
}