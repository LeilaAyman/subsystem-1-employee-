import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type EmployeeDocument = HydratedDocument<Employee>;

export enum UserRole {
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
  HR_ADMIN = 'HR_ADMIN',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE',
}

export enum EmploymentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  TERMINATED = 'TERMINATED',
  ON_PROBATION = 'ON_PROBATION',
}

@Schema({ timestamps: true })
export class Employee {
  _id: Types.ObjectId;

  // 🔐 Login / Identity
  @Prop({ required: true, unique: true })
  workEmail: string; // also acts as username

  @Prop({ required: true })
  passwordHash: string; // never store plain password

  @Prop({ type: [String], enum: UserRole, default: [UserRole.EMPLOYEE] })
  roles: UserRole[];

  // 📇 Basic profile
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  employeeCode: string; // e.g. EMP-0001

  @Prop()
  personalEmail?: string;

  @Prop()
  phone?: string;

  @Prop()
  profilePhotoUrl?: string;

  // 💼 Employment & org info
  @Prop({ enum: EmploymentStatus, default: EmploymentStatus.ACTIVE })
  status: EmploymentStatus;

  @Prop()
  hireDate?: Date;

  @Prop()
  employmentType?: 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR' | 'INTERN';

  @Prop()
  grade?: string;        // HR grade
  @Prop()
  payGradeCode?: string; // to sync with Payroll

  @Prop({ type: Types.ObjectId, ref: 'Department' })
  departmentId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Position' })
  positionId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  managerId?: Types.ObjectId; // reporting line

  // 🔗 Performance history (optional)
  @Prop({ type: [Types.ObjectId], ref: 'Appraisal', default: [] })
  performanceHistoryIds?: Types.ObjectId[];
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
