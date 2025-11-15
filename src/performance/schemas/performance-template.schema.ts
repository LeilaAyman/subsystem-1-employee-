import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PerformanceTemplateDocument = HydratedDocument<PerformanceTemplate>;

@Schema({ _id: false })
export class RatingScaleItem {
  @Prop({ required: true })
  label: string; // e.g. "Exceeds Expectations"

  @Prop({ required: true })
  value: number; // e.g. 5
}

@Schema({ _id: false })
export class CriteriaItem {
  @Prop({ required: true })
  name: string; // e.g. "Teamwork"

  @Prop()
  description?: string;

  @Prop()
  weight: number; // percentage 0–100
}

@Schema({ timestamps: true })
export class PerformanceTemplate {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  code: string; // e.g. "ANNUAL_STD_2025"

  @Prop({ required: true })
  name: string;

  @Prop({ type: String, enum: ['ANNUAL', 'PROBATION', 'MID_YEAR'], required: true })
  type: 'ANNUAL' | 'PROBATION' | 'MID_YEAR';

  @Prop({ type: [RatingScaleItem], default: [] })
  ratingScale: RatingScaleItem[];

  @Prop({ type: [CriteriaItem], default: [] })
  criteria: CriteriaItem[];
}

export const PerformanceTemplateSchema =
  SchemaFactory.createForClass(PerformanceTemplate);