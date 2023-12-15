import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  // used partial (it makes all property optional)
  const userData: Partial<TUser> = {};
  //if password is not given use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  // find academic semester info
  const academicSemester = await AcademicSemester.findById(
    payload.academicSemester,
  );

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //set  generated id
    if (academicSemester !== null) {
      userData.id = await generatedStudentId(academicSemester);
    }
    // create a user
    const newUser = await User.create([userData], { session });
    //   create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    // refer user in student by created user _id
    payload.user = newUser[0]._id; // reference _id
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // commit the session because it was completed
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    // end the session because it was failed
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create student');
  }
};

export const UserServices = {
  createStudentIntoDB,
};
