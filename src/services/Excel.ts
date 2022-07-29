// interfaces
import { FaculteInterface } from './../interface/FacultsInterface';
import { MajorsInterface } from './../interface/MajorsInterface';


const ExcelJS = require('exceljs');

export class Excel
{
  _workbook:any;
  _worksheet:any;

  constructor(setDefaultHeader = true, firstPageName = 'First page')
  {
    // instance
    this._workbook = new ExcelJS.Workbook();
    this.createNewPage(firstPageName);
    if (setDefaultHeader) {
      this.setDefaultHeader();
    }
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
      [
        'Факультети',
        'Спеціальності',
        'Опис',
        'Форма навчання',
        'Кількість студентів',
        'Років навчання',
        'Метод навчання',
        'Ступінь',
        'Мова навчання',
        'Поплаток за навчання',
        'Поплаток за приглашку',
        'Інші поплатки',
      ]
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

  /**
   * Write facult into Excel
   * @param facult FaculteInterface
   * @param index int
   */
  writeFacult (facult:FaculteInterface, index:number)
  {
    this._worksheet.getCell(`A${index}`).value = {
      text: facult.text,
      hyperlink: facult.link,
      tooltip: facult.link
    };
    // some styles
    this._worksheet.getCell(`A${index}`).font = {
      underline: true,
      color: {argb: 'FF0000EE'}
    }
  }

  /**
   * Write major into Excel
   * @param major MajorsInterface
   * @param index int
   */
  writeMajor (majorName:FaculteInterface, major:MajorsInterface, index:number)
  {
    // set title with link
    this._worksheet.getCell(`B${index}`).value = {
      text: major.title,
      hyperlink: majorName.link,
      tooltip: majorName.link
    }
    // some styles
    this._worksheet.getCell(`B${index}`).font = {
      underline: true,
      color: {argb: 'FF0000EE'}
    }

    // set other
    this._worksheet.getCell(`C${index}`).value = major.desc;
    this._worksheet.getCell(`D${index}`).value = major.studyForm;
    this._worksheet.getCell(`E${index}`).value = major.students;
    this._worksheet.getCell(`F${index}`).value = major.studyYears;
    this._worksheet.getCell(`G${index}`).value = major.studyMethod;
    this._worksheet.getCell(`H${index}`).value = major.graduate;
    this._worksheet.getCell(`I${index}`).value = major.language;
    this._worksheet.getCell(`J${index}`).value = major.paymentStandart;
    this._worksheet.getCell(`K${index}`).value = major.paymentInvite;
    this._worksheet.getCell(`L${index}`).value = major.paymentOther;
  }

  /**
   * 
   * @param fileName 
   */
  saveFile (fileName = 'SlovakStudy.xlsx')
  {
    this._workbook.xlsx.writeFile(fileName);
  }
}

