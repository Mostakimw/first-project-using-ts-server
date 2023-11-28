import { Schema } from 'mongoose';
import { TAcademicSemester, TMonths } from './academicSemester.interface';

const months: TMonths[] = [
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

export const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    // enum: ['summer', 'winter', 'fall'],
    required: true,
  },
  code: {
    type: String,
    // enum: ['01', '02', '03'],
    required: true,
  },
  year: {
    type: Date,
    required: true,
  },
  startMonth: {
    type: String,
    enum: months,
  },
  endMonth: {
    type: String,
    enum: months,
  },
});
