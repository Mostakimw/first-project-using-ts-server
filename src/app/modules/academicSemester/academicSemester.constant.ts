import {
  TAcademicSemesterCode,
  TAcademicSemesterCodeMapper,
  TAcademicSemesterName,
  TMonths,
} from './academicSemester.interface';

export const AcademicSemesterMonths: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const AcademicSemesterName: TAcademicSemesterName[] = [
  'Summer',
  'Winter',
  'Fall',
];

export const AcademicSemesterCode: TAcademicSemesterCode[] = ['01', '02', '03'];

//! semester code checking
export const academicSemesterCodeMapper: TAcademicSemesterCodeMapper = {
  Summer: '01',
  Winter: '02',
  Fall: '03',
};
