import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user object
  // used partial (it makes all property optional)
  const userData: Partial<TUser> = {};
  //if password is not given use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  //generate student id
  // const generatedId = (payload: TAcademicSemester)=>{

  // }

  // set id manually
  userData.id = '2030100001';
  // create a user
  const newUser = await User.create(userData);
  //   create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    // refer user in student by created user _id
    studentData.user = newUser._id; // reference _id
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
