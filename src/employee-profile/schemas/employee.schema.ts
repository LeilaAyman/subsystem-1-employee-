import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type EmployeeDocument = HydratedDocument<Employee>;

export enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  TERMINATED = 'TERMINATED',
  ON_LEAVE = 'ON_LEAVE',
}

export enum EmployeeRole {
  EMPLOYEE = 'EMPLOYEE',
  MANAGER = 'MANAGER',
  HR_EMPLOYEE = 'HR_EMPLOYEE',
  HR_MANAGER = 'HR_MANAGER',
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
  RECRUITER = 'RECRUITER',
  PAYROLL_OFFICER = 'PAYROLL_OFFICER',
  FINANCE_STAFF = 'FINANCE_STAFF',
  IT_STAFF = 'IT_STAFF',
  FACILITIES_STAFF = 'FACILITIES_STAFF',
  PERFORMANCE_REVIEWER = 'PERFORMANCE_REVIEWER',
  AUDITOR = 'AUDITOR',
}

@Schema({ _id: false })
export class ChangeRequestItem {
  @Prop({ required: true })
  field: string; // e.g. "phone", "personalEmail"

  @Prop()
  oldValue?: string;

  @Prop({ required: true })
  newValue: string;

  @Prop({
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING',
  })
  status: 'PENDING' | 'APPROVED' | 'REJECTED';

  @Prop({ default: () => new Date() })
  requestedAt: Date;

  @Prop()
  reviewedAt?: Date;

  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  reviewedBy?: Types.ObjectId;
}

@Schema({ timestamps: true })
export class Employee {
  _id: Types.ObjectId;

  // ---- Personal info ----
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  middleName?: string;

  @Prop()
  dateOfBirth?: Date;

  // ---- Contact info ----
  @Prop({ required: true, unique: true })
  workEmail: string;

  @Prop()
  personalEmail?: string;

  @Prop()
  phone?: string;

  @Prop()
  profilePictureUrl?: string;

  // ---- Employment identifiers ----
  @Prop({ required: true, unique: true })
  employeeCode: string; // E0001, etc.

  @Prop({ enum: EmployeeStatus, default: EmployeeStatus.ACTIVE })
  status: EmployeeStatus;

  @Prop()
  hireDate?: Date;

  @Prop()
  probationEndDate?: Date;

  @Prop()
  employmentType?: 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR' | 'INTERN';

  @Prop()
  workLocation?: string;

  @Prop()
  grade?: string;

  @Prop()
  payGradeCode?: string;

  // ---- Org structure links ----
  @Prop({ type: Types.ObjectId, ref: 'Department' })
  departmentId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Position' })
  positionId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  managerId?: Types.ObjectId;

  // ---- Access control ----
  @Prop({
    type: [String],
    enum: Object.values(EmployeeRole),
    default: [EmployeeRole.EMPLOYEE],
  })
  roles: EmployeeRole[];

  // ---- Performance history ----
  @Prop({ type: [Types.ObjectId], ref: 'Appraisal', default: [] })
  performanceHistoryIds?: Types.ObjectId[];

  // ---- Change requests for governed fields ----
  @Prop({ type: [ChangeRequestItem], default: [] })
  changeRequests: ChangeRequestItem[];

  // ---- Audit fields ----
  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  createdBy?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  updatedBy?: Types.ObjectId;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);