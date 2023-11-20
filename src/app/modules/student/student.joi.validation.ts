import Joi from 'joi';

// Joi schema for username
const userNameJoiSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .regex(/^[A-Za-z]+$/),
  middleName: Joi.string().allow(''),
  lastName: Joi.string()
    .required()
    .regex(/^[A-Za-z]+$/),
});

// Joi schema for Guardian
const guardianJoiSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactName: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactName: Joi.string().required(),
});

// Joi schema for LocalGuardian
const localGuardianJoiSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

// Joi schema for Student
const studentJoiSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameJoiSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  dateOfBirth: Joi.string().allow(''),
  email: Joi.string().required().email(),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .required(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianJoiSchema.required(),
  localGuardian: localGuardianJoiSchema.required(),
  profileImg: Joi.string().allow(''),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentJoiSchema;
