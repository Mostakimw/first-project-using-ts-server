import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.services';

const createAcademicSemester = catchAsync(async (req, res) => {
  const semesterData = req.body;
  const result =
    await AcademicSemesterServices.createAcademicSemesterIntoDB(semesterData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester created Successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
};
