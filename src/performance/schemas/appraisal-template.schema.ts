import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AppraisalType } from '../enums/appraisal-type.enum';

export type AppraisalTemplateDocument = HydratedDocument<AppraisalTemplate>;

@Schema({ timestamps: true })
export class AppraisalTemplate {
  @Prop({ required: true })
  name: string; // "Annual General Template"

  @Prop({ type: String, enum: AppraisalType, required: true })
  type: AppraisalType;

  // which departments/org units this template applies to (can be strings or IDs)
  @Prop({ type: [String], default: [] })
  applicableOrgUnits?: string[];

  @Prop({
    type: [
      {
        name: { type: String, required: true },
        weight: { type: Number, required: true }, // e.g. 30 (%)
      },
    ],
    required: true,
  })
  criteria: { name: string; weight: number }[];

  @Prop()
  description?: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const AppraisalTemplateSchema =
  SchemaFactory.createForClass(AppraisalTemplate);