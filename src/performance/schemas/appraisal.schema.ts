import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AppraisalDocument = HydratedDocument<Appraisal>;

export enum AppraisalStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  SUBMITTED = 'SUBMITTED',
  PUBLISHED = 'PUBLISHED',
  UNDER_DISPUTE = 'UNDER_DISPUTE',
  CLOSED = 'CLOSED',
}

@Schema({ _id: false })
export class CriterionRating {
  @Prop()
  criterionName: string;
  @Prop()
  ratingValue: number;
  @Prop()
  comment?: string;
}

@Schema({ timestamps: true })
export class Appraisal {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
  employeeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
  managerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'AppraisalCycle', required: true })
  cycleId: Types.ObjectId;

  @Prop({ type: [CriterionRating], default: [] })
  ratings: CriterionRating[];

  @Prop()
  overallRating?: number;

  @Prop()
  managerComment?: string;

  @Prop()
  employeeComment?: string;

  @Prop({ enum: AppraisalStatus, default: AppraisalStatus.IN_PROGRESS })
  status: AppraisalStatus;

  @Prop()
  disputeReason?: string;

  @Prop()
  disputeResolutionComment?: string;
}

export const AppraisalSchema = SchemaFactory.createForClass(Appraisal);
