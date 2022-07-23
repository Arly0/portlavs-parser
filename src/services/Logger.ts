import { ErrorTypes } from "../interface/LoggerInterface"
const fs = require("fs");

export class Logger
{
  _path: string;
  _log_to_console: Boolean;
  _new_file: Boolean;

  constructor(logToConsole = false, newFile = false)
  {
    this._path = __dirname + '/../logs/error.log';
    this._log_to_console = logToConsole;
    this._new_file = newFile;
  }


  /**
   * Writing log to file/console
   * @param content string - text
   */
  writeLog (content: string)
  {
    if (process.env.APP_DEBUG && this._log_to_console) {
      console.log(content);
    }

    if (this._new_file) {
      fs.writeFile(this._path, content, function (err:any) {
      if (process.env.APP_DEBUG && err) {
        console.error(err);
        }
      });
    } else {
      fs.appendFile(this._path, content + "\n", function (err:any) {
        if (process.env.APP_DEBUG && err) {
          console.error(err);
        }
      });
    }
  }
}