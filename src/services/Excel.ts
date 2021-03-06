const ExcelJS = require('exceljs');
import { FaculteInterface } from './../interface/FacultsInterface';

export class Excel
{
  _workbook:any;
  _worksheet:any;

  constructor(setDefaultHeader = true)
  {
    // instance
    this._workbook = new ExcelJS.Workbook();
    // if (setDefaultHeader) {

    // }
  }

  /**
   * Get actual WorkBook
   * @returns WorkBook instance 
   */
  getWorkBook ()
  {
    return this._workbook;
  }

  /**
   * Get actual WorkSheet
   * @returns WorkSheet instance 
   */
   getWorkSheet ()
   {
     return this._worksheet ? this._worksheet : null;
   }

   /**
    * Set default header for all pages
    * @returns void
    */
   setDefaultHeader ()
   {
    if (!this._worksheet) {
      this.createNewPage('First');
    }
    const rows = [
      ['Факультети', 'Спеціальності', 'Якісь лєві данні :)']
    ];

    this._worksheet.addRows(rows);
   }



  /**
   * Create and return new WorkSheet
   * @param name string - name of the new sheet
   * @returns WorkSheet
   */
  createNewPage (name: string)
  {
    this._worksheet = this._workbook.addWorksheet(name);
    return this._worksheet;
  }

  writeFacults (facults:FaculteInterface[])
  {
    let rowCounter = 1;
    facults.forEach((item:FaculteInterface) => {
      this._worksheet.getCell(`A${rowCounter++}`).value(`${item.text}`);
    });
  }

  saveFile (fileName = 'SlovakStudy.xlsx')
  {
    this._workbook.xlsx.writeFile(fileName);
  }
}

