import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ExitInterviewDocument = HydratedDocument<ExitInterview>;

@Schema({ timestamps: true })
export class ExitInterview {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'OffboardingCase', required: true })
  offboardingCaseId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true })
  employeeId: mongoose.Types.ObjectId;

  // 🗣 Interview details
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  interviewer: mongoose.Types.ObjectId;

  @Prop({ enum: ['in_person', 'virtual'], default: 'in_person' })
  mode: string;

  // ❓ Questions and ratings
  @Prop({ type: [{ question: String, answer: String, category: String }] })
  questions: Record<string, any>[];

  @Prop({ type: [{ aspect: String, rating: Number }] })
  ratings: Record<string, any>[];

  // 💬 Feedback
  @Prop() overallFeedback?: string;
  @Prop() suggestions?: string;
  @Prop() confidentialRemarks?: string;

  // 📅 Status
  @Prop({ enum: ['scheduled', 'completed', 'skipped'], default: 'scheduled' })
  status: string;
}

export const ExitInterviewSchema = SchemaFactory.createForClass(ExitInterview);
