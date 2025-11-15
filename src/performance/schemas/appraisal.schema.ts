import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { AppraisalCycle } from './appraisal-cycle.schema';
import { Employee } from '../../employee-profile/schemas/employee.schema';

export type AppraisalDocument = HydratedDocument<Appraisal>;

export enum AppraisalStatus {
  DRAFT = 'DRAFT',
  IN_PROGRESS = 'IN_PROGRESS',
  SUBMITTED = 'SUBMITTED',
  PUBLISHED = 'PUBLISHED',
  CLOSED = 'CLOSED',
}

export enum DisputeStatus {
  NONE = 'NONE',
  REQUESTED = 'REQUESTED',
  RESOLVED_UPHELD = 'RESOLVED_UPHELD',
  RESOLVED_ADJUSTED = 'RESOLVED_ADJUSTED',
}

@Schema({ _id: false })
export class CriteriaRating {
  @Prop({ required: true })
  criteriaName: string;

  @Prop()
  comment?: string;

  @Prop({ required: true })
  score: number; // should match template ratingScale values
}

@Schema({ timestamps: true })
export class Appraisal {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Employee.name, required: true })
  employeeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Employee.name, required: true })
  reviewerId: Types.ObjectId; // usually manager

  @Prop({ type: Types.ObjectId, ref: AppraisalCycle.name, required: true })
  cycleId: Types.ObjectId;

  @Prop({ type: [CriteriaRating], default: [] })
  criteriaRatings: CriteriaRating[];

  @Prop()
  overallRating?: number;

  @Prop()
  managerComment?: string;

  @Prop()
  employeeComment?: string;

  @Prop({
    enum: AppraisalStatus,
    default: AppraisalStatus.DRAFT,
  })
  status: AppraisalStatus;

  @Prop({
    enum: DisputeStatus,
    default: DisputeStatus.NONE,
  })
  disputeStatus: DisputeStatus;

  @Prop()
  disputeReason?: string;

  @Prop()
  disputeResolutionComment?: string;
}

export const AppraisalSchema = SchemaFactory.createForClass(Appraisal);