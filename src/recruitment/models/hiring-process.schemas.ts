import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type HiringProcessTemplateDocument = HydratedDocument<HiringProcessTemplate>;

@Schema({ timestamps: true })
export class HiringProcessTemplate {
  // Template name
  // @Prop({ required: true })
  // name: string;

  @Prop({
    type: [
      {
        name: { type: String, required: true },
        order: { type: Number, required: true },
        description: { type: String, default: '' },
      },
    ],
    default: [
      { name: 'Screening', order: 1, description: '' },
      { name: 'Shortlisting', order: 2, description: '' },
      { name: 'Interview', order: 3, description: '' },
      { name: 'Offer', order: 4, description: '' },
      { name: 'Hired', order: 5, description: '' },
    ],
  })
  stages: {
    name: string;
    order: number;
    description?: string;
  }[];

  // Associated departments or positions
  @Prop({ type: [String], default: [] })
  departmentsOrPositions: string[];
}

export const HiringProcessTemplateSchema =
  SchemaFactory.createForClass(HiringProcessTemplate);
