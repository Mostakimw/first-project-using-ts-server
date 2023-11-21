import { z } from 'zod';

// Zod schema for UserName
const UserNameSchemaZod = z.object({
  firstName: z.string().min(1).max(255),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[A-Za-z]+$/),
});

// Zod schema for Guardian
const GuardianSchemaZod = z.object({
  fatherName: z.string().min(1).max(255),
  fatherOccupation: z.string().min(1).max(255),
  fatherContactName: z.string().min(1).max(255),
  motherName: z.string().min(1).max(255),
  motherOccupation: z.string().min(1).max(255),
  motherContactName: z.string().min(1).max(255),
});

// Zod schema for LocalGuardian
const LocalGuardianSchemaZod = z.object({
  name: z.string().min(1).max(255),
  occupation: z.string().min(1).max(255),
  contactNo: z.string().min(1).max(20),
  address: z.string().min(1).max(255),
});

// Zod schema for Student
const StudentSchemaZod = z.object({
  id: z.string(),
  password: z.string().max(20),
  name: UserNameSchemaZod,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string(),
  email: z.string().email(),
  contactNo: z.string().min(1).max(20),
  emergencyContactNo: z.string().min(1).max(20),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  presentAddress: z.string().min(1).max(255),
  permanentAddress: z.string().min(1).max(255),
  guardian: GuardianSchemaZod,
  localGuardian: LocalGuardianSchemaZod,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean(),
});

export default StudentSchemaZod;
