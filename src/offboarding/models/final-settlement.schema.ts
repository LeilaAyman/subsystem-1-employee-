import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type FinalSettlementDocument = HydratedDocument<FinalSettlement>;

@Schema({ timestamps: true })
export class FinalSettlement {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'OffboardingCase', required: true })
  offboardingCaseId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true })
  employeeId: mongoose.Types.ObjectId;

  // 🌴 Leave settlement
  @Prop({ default: 0 }) remainingLeaveDays: number;
  @Prop({ default: 0 }) leaveEncashmentAmount: number;
  @Prop({ default: 30 }) leaveEncashmentCap: number;

  // 💰 End-of-service benefits
  @Prop({ default: 0 }) benefitAmount: number;
  @Prop() calculationFormula?: string;
  @Prop({ default: 0 }) eligibilityYears: number;

  // 💸 Deductions
  @Prop({ default: 0 }) pendingLoans: number;
  @Prop({ default: 0 }) advanceSalary: number;
  @Prop({ default: 0 }) damagedAssets: number;

  @Prop({ type: [{ description: String, amount: Number }], default: [] })
  otherDeductions: Record<string, any>[];

  // 🧾 Final calculations
  @Prop({ default: 0 }) grossSettlement: number;
  @Prop({ default: 0 }) totalDeductions: number;
  @Prop({ default: 0 }) netSettlement: number;

  // ⚙️ Status and approval
  @Prop({
    enum: ['pending_calculation', 'calculated', 'approved', 'processed'],
    default: 'pending_calculation',
  })
  status: string;

  @Prop() approvedBy?: mongoose.Types.ObjectId;
  @Prop() approvedAt?: Date;
}

export const FinalSettlementSchema = SchemaFactory.createForClass(FinalSettlement);
