import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PerformanceTemplateDocument = HydratedDocument<PerformanceTemplate>;

@Schema({ _id: false })
export class RatingScaleItem {
  @Prop()
  label: string; // e.g. "Exceeds Expectations"
  @Prop()
  value: number; // e.g. 5
}

@Schema({ _id: false })
export class CriteriaItem {
  @Prop({ required: true })
  name: string; // e.g. "Teamwork"
  @Prop()
  description?: string;
  @Prop()
  weight: number; // percentage
}

@Schema({ timestamps: true })
export class PerformanceTemplate {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  code: string; // "ANNUAL_STD_2025"

  @Prop({ required: true })
  name: string;

  @Prop()
  type: 'ANNUAL' | 'PROBATION' | 'MID_YEAR';

  @Prop({ type: [RatingScaleItem], default: [] })
  ratingScale: RatingScaleItem[];

  @Prop({ type: [CriteriaItem], default: [] })
  criteria: CriteriaItem[];
}

export const PerformanceTemplateSchema =
  SchemaFactory.createForClass(PerformanceTemplate);
