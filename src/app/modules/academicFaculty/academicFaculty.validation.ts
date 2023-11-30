import { z } from 'zod';

const createAcademicFacultyValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'Password must be a String',
  }),
});

export const AcademicFacultyValidations = {
  createAcademicFacultyValidationSchema,
};
