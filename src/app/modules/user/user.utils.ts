import { TAcademicSemester } from '../academicSemester/academicSemester.interface';

//generate student id
// pattern ---> year code 4digit
export const generatedStudentId = (payload: TAcademicSemester) => {
  // first id 0000
  const currentId = (0).toString();
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
