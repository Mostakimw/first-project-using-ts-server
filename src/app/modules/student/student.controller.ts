import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import StudentSchemaZod from './student.zod.validation';
// import studentJoiSchema from './student.joi.validation';

//! get all students
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are retrieve Successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

//! delete student
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Students is deleted Successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

export const StudentControllers = {
  getAllStudents,
  deleteStudent,
};
