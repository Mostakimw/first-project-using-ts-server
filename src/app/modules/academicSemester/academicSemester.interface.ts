export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcademicSemester = {
  name: 'summer' | 'winter' | 'fall';
  code: '01' | '02' | '03';
  year: Date;
  startMonth: TMonths;
  endMonth: TMonths;
};
