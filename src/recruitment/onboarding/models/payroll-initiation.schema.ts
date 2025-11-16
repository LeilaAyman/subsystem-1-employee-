import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Employee } from '../../employee.schema';

export enum PayrollInitiationStatus {
  Pending = 'pending',
  Processing = 'processing',
  Completed = 'completed',
  Failed = 'failed',
}

export enum BonusType {
  SigningBonus = 'signing_bonus',
  JoiningBonus = 'joining_bonus',
  Relocation = 'relocation',
  Other = 'other',
}

export type PayrollInitiationDocument = HydratedDocument<PayrollInitiation>;

@Schema({ timestamps: true })
export class PayrollInitiation {
  @Prop({ type: Types.ObjectId, ref: Employee.name, required: true })
  employeeId: Types.ObjectId;

  @Prop({ type: Date, required: true })
  contractSigningDate: Date;

  @Prop({ type: Date, required: true })
  payrollStartDate: Date;

  @Prop({ type: String })
  payrollCycle: string;

  @Prop({
    type: String,
    enum: Object.values(PayrollInitiationStatus),
    required: true,
    default: PayrollInitiationStatus.Pending,
  })
  status: PayrollInitiationStatus;

  @Prop({ type: Date })
  processedAt: Date;

  @Prop({ type: Types.ObjectId, ref: Employee.name })
  processedBy: Types.ObjectId;

  @Prop({ type: Number, required: true })
  baseSalary: number;

  @Prop({
    type: [
      {
        bonusType: {
          type: String,
          enum: Object.values(BonusType),
          required: true,
        },
        amount: { type: Number, required: true },
        paymentDate: { type: Date },
        processed: { type: Boolean, default: false },
        notes: { type: String },
      },
    ],
    default: [],
  })
  bonuses: {
    bonusType: BonusType;
    amount: number;
    paymentDate?: Date;
    processed: boolean;
    notes?: string;
  }[];

  @Prop({ type: Boolean, default: false })
  benefitsEnrolled: boolean;

  @Prop({ type: Date })
  benefitsEnrollmentDate: Date;

  @Prop({ type: Boolean, default: false })
  isAutoProcessed: boolean;

  @Prop({ type: String })
  failureReason: string;

  @Prop({ type: String })
  notes: string;
}

export const PayrollInitiationSchema = SchemaFactory.createForClass(PayrollInitiation);