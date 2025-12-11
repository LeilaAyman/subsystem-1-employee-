import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { AdjustmentType } from '../enums/adjustment-type.enum';

export type LeaveAdjustmentDocument = HydratedDocument<LeaveAdjustment>;

@Schema({ timestamps: true })
export class LeaveAdjustment {
  // EMPLOYEE WHOSE BALANCE IS BEING ADJUSTED
  @Prop({ type: Types.ObjectId, ref: 'EmployeeProfile', required: true })
  employeeId: Types.ObjectId;

  // LEAVE TYPE BEING ADJUSTED
  @Prop({ type: Types.ObjectId, ref: 'LeaveType', required: true })
  leaveTypeId: Types.ObjectId;

<<<<<<< HEAD:backend/src/leaves/models/leave-adjustment.schema.ts
  // ADD / DEDUCT / CORRECTION
  @Prop({ enum: AdjustmentType, required: true })
=======
  @Prop({ 
    type: String,
    enum: AdjustmentType, required: true })
>>>>>>> 40db564390103036b6212b59a4e1b86d395093a2:src/leaves/models/leave-adjustment.schema.ts
  adjustmentType: AdjustmentType;

  // NUMBER OF DAYS (+ OR -)
  @Prop({ required: true })
  amount: number;

  // REASON FOR ADJUSTMENT
  @Prop({ required: true })
  reason: string;

  // HR EMPLOYEE WHO PERFORMED THE ADJUSTMENT
  @Prop({ type: Types.ObjectId, ref: 'EmployeeProfile', required: true })
  hrUserId: Types.ObjectId;
}

export const LeaveAdjustmentSchema =
  SchemaFactory.createForClass(LeaveAdjustment);
