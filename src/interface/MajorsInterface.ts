import { FaculteInterface } from "./FacultsInterface"

export interface FacultMajorsInterface {
  title: string,
  BC_SK: FaculteInterface[]|null,
  ING_SK: FaculteInterface[]|null,
  BC_EN: FaculteInterface[]|null,
  ING_EN: FaculteInterface[]|null,
}

export interface MajorsInterface {
  title: string,
  desc: string,
  studyForm: string,
  students: number,
  studyYears: number,
  studyMethod: string,
  graduate: string,
  language: string,
  paymentStandart: string,
  paymentInvite: string,
  paymentOther: string,
}

export const defaultMajor = {
  title: '', // ✅
  desc: '', // ✅
  studyForm: 'дневная',
  students: 0,
  studyYears: 3,
  studyMethod: 'презенчная',
  graduate: 'Bc',
  language: 'SK',
  paymentStandart: '', // ✅
  paymentInvite: '', // ✅
  paymentOther: '', // ✅
}