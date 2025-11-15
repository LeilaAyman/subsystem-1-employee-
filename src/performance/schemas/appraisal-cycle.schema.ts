import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { AppraisalType } from '../enums/appraisal-type.enum';

export type AppraisalCycleDocument = HydratedDocument<AppraisalCycle>;

@Schema({ timestamps: true })
export class AppraisalCycle {
  @Prop({ required: true })
  name: string; // "2025 Annual Appraisal"

  @Prop({ type: String, enum: AppraisalType, required: true })
  type: AppraisalType;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: true })
  endDate: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AppraisalTemplate',
    required: true,
  })
  template: mongoose.Types.ObjectId;

  @Prop({
    default: 'DRAFT', // could also be enum if you want (same as AppraisalStatus)
  })
  status: string; // DRAFT, ACTIVE, CLOSED, ARCHIVED

  @Prop({ type: [String], default: [] })
  includedOrgUnits?: string[]; // departments or units
}

export const AppraisalCycleSchema =
  SchemaFactory.createForClass(AppraisalCycle);