import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

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
  const result = await Student.find()
    .populate('academicSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

//! single student
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('academicSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

//! update student
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingUpdatedData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingUpdatedData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

//! delete student from db
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

export const StudentServices = {
  getSingleStudentFromDB,
  getAllStudentsFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};
