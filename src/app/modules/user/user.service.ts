import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId } from './user.utils';

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

  //set  generated id
  if (academicSemester !== null) {
    userData.id = await generatedStudentId(academicSemester);
  }
  // create a user
  const newUser = await User.create(userData);
  //   create a student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    // refer user in student by created user _id
    payload.user = newUser._id; // reference _id
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
