import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  // StudentMethods,
  StudentModel,
  TUserName,
} from './student.interface';

//! Create schema for username
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    validate: function (value: string) {
      const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
      return firstNameStr === value;
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    // ! using validator package for validation
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

// ! Guardian schema
const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, 'Father name is required'] },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required'],
  },
  fatherContactName: {
    type: String,
    required: [true, 'Father contact name is required'],
  },
  motherName: { type: String, required: [true, 'Mother name is required'] },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
  },
  motherContactName: {
    type: String,
    required: [true, 'Mother contact name is required'],
  },
});

//! LocalGuardian schema
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, 'Local guardian name is required'] },
  occupation: {
    type: String,
    required: [true, 'Local guardian occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local guardian contact number is required'],
  },
  address: {
    type: String,
    required: [true, 'Local guardian address is required'],
  },
});

//! Student schema start
// const studentSchema = new Schema<Student>({
//   id: {
//     type: String,
//     required: [true, 'Student ID is required'],
//     unique: true,
//   },
//   name: {
//     type: userNameSchema,
//     required: [true, 'Student name is required'],
//   },
//   // ! Enum declaration
//   gender: {
//     type: String,
//     enum: {
//       values: ['male', 'female', 'other'],
//       // Getting user input value
//       message: '{VALUE} is not valid',
//     },
//     required: [true, 'Gender is required'],
//   },
//   dateOfBirth: { type: String },
//   email: { type: String, required: [true, 'Email is required'], unique: true },
//   contactNo: { type: String, required: [true, 'Contact number is required'] },
//   emergencyContactNo: {
//     type: String,
//     required: [true, 'Emergency contact number is required'],
//   },
//   bloodGroup: {
//     type: String,
//     enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
//     required: [true, 'Blood group is required'],
//   },
//   presentAddress: {
//     type: String,
//     required: [true, 'Present address is required'],
//   },
//   permanentAddress: {
//     type: String,
//     required: [true, 'Permanent address is required'],
//   },
//   guardian: {
//     type: guardianSchema,
//     required: [true, 'Guardian information is required'],
//   },
//   localGuardian: {
//     type: localGuardianSchema,
//     required: [true, 'Local guardian information is required'],
//   },
//   profileImg: { type: String },
//   isActive: {
//     type: String,
//     enum: ['active', 'blocked'],
//     default: 'active',
//   },
// });
// //! Create model for built in
// export const Student = model<TStudent>('Student', studentSchema);
//! Student schema start

//! instance methods student schema start
// const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
//   id: {
//     type: String,
//     required: [true, 'Student ID is required'],
//     unique: true,
//   },
//   name: {
//     type: userNameSchema,
//     required: [true, 'Student name is required'],
//   },
//   // ! Enum declaration
//   gender: {
//     type: String,
//     enum: {
//       values: ['male', 'female', 'other'],
//       // Getting user input value
//       message: '{VALUE} is not valid',
//     },
//     required: [true, 'Gender is required'],
//   },
//   dateOfBirth: { type: String },
//   email: { type: String, required: [true, 'Email is required'], unique: true },
//   contactNo: { type: String, required: [true, 'Contact number is required'] },
//   emergencyContactNo: {
//     type: String,
//     required: [true, 'Emergency contact number is required'],
//   },
//   bloodGroup: {
//     type: String,
//     enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
//     required: [true, 'Blood group is required'],
//   },
//   presentAddress: {
//     type: String,
//     required: [true, 'Present address is required'],
//   },
//   permanentAddress: {
//     type: String,
//     required: [true, 'Permanent address is required'],
//   },
//   guardian: {
//     type: guardianSchema,
//     required: [true, 'Guardian information is required'],
//   },
//   localGuardian: {
//     type: localGuardianSchema,
//     required: [true, 'Local guardian information is required'],
//   },
//   profileImg: { type: String },
//   isActive: {
//     type: String,
//     enum: ['active', 'blocked'],
//     default: 'active',
//   },
// });

//? create methods for custom instance
// studentSchema.methods.isUserExists = async function (id: string) {
//   const excitingStudent = await Student.findOne({ id });
//   return excitingStudent;
// };

//? Create model for custom instance
// export const Student = model<TStudent, StudentModel>('Student', studentSchema);
//! instance methods student schema end
//?---------------------------------------------

//! custom static methods start
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      required: [true, 'Student name is required'],
    },
    // ! Enum declaration
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        // Getting user input value
        message: '{VALUE} is not valid',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: [true, 'Blood group is required'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian information is required'],
    },
    profileImg: { type: String },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//! query middleware find
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//! aggregate middleware
// studentSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
//   next();
// });

//! create virtuals
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName}`;
});

//? create custom static methods
studentSchema.statics.isUserExists = async function (id: string) {
  const excitingStudent = await Student.findOne({ id });
  return excitingStudent;
};

//? create model for custom static
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
//! custom static methods end
