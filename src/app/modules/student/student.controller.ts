import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
// import StudentSchemaZod from './student.zod.validation';
// import studentJoiSchema from './student.joi.validation';

//! get all students
const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are retrieve Successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//! delete student
const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Students is deleted Successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const StudentControllers = {
  getAllStudents,
  deleteStudent,
};
