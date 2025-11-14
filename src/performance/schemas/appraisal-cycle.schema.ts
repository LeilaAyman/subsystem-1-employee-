import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { PerformanceTemplate } from './performance-template.schema';

export type AppraisalCycleDocument = HydratedDocument<AppraisalCycle>;

export enum AppraisalCycleStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
  ARCHIVED = 'ARCHIVED',
}

@Schema({ timestamps: true })
export class AppraisalCycle {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  code: string; // "ANNUAL_2025"

  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: PerformanceTemplate.name, required: true })
  templateId: Types.ObjectId;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ enum: AppraisalCycleStatus, default: AppraisalCycleStatus.DRAFT })
  status: AppraisalCycleStatus;
}

export const AppraisalCycleSchema =
  SchemaFactory.createForClass(AppraisalCycle);
