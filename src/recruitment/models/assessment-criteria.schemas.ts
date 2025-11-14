import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ApplicationCriteriaDocument = HydratedDocument<ApplicationCriteria>;

@Schema({ timestamps: true })
export class ApplicationCriteria {
  @Prop({ type: Types.ObjectId, ref: 'JobPosting', required: true })
  jobPostingId: Types.ObjectId;

  @Prop({
    type: [
      {
        name: { type: String, required: true },
        weight: { type: Number, required: true },
        maxScore: { type: Number, required: true },
      },
    ],
    default: [],
  })
  criteria: {
    name: string;
    weight: number;
    maxScore: number;
  }[];
}

export const ApplicationCriteriaSchema =
  SchemaFactory.createForClass(ApplicationCriteria);
