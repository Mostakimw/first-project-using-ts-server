import { Student } from './student.model';

// const createStudentIntoDB = async (studentData: TStudent) => {
//   //! mongoose built in static methods start
//   // const result = await Student.create(studentData);
//   // return result;
//   //! mongoose built in static methods end
//   //? ------------------------------------------
//   //! mongoose built in instance methods start
//   // const student = new Student(studentData);
//   // const result = await student.save();
//   // return result;
//   //! mongoose built in instance methods end
//   //?------------------------------------------------------

//   //! mongoose custom instance methods start
//   // const student = new Student(studentData);
//   // if (await student.isUserExists(student.id)) {
//   //   throw new Error('User Already Exists');
//   // }
//   //! mongoose custom instance methods end
//   //?-----------------------------------------------------

//   //! custom static methods start
//   if (await Student.isUserExists(studentData.id)) {
//     throw new Error('User Already Exists');
//   }
//   const result = await Student.create(studentData);
//   return result;

//   //! custom static methods end
// };

//! get all students from db

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

//! delete student from db
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  deleteStudentFromDB,
};
