import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CommunicationLogDocument = HydratedDocument<CommunicationLog>;

@Schema({ timestamps: true })
export class CommunicationLog {

  @Prop({ type: Types.ObjectId, ref: 'Candidate', required: true })
  candidateId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Application', required: true })
  applicationId: Types.ObjectId;

  @Prop({ type: String, enum: ['email', 'sms', 'phone_call'], required: true })
  type: 'email' | 'sms' | 'phone_call';

  @Prop()
  subject?: string;

  @Prop({ required: true })
  messageBody: string;

  @Prop({ type: Types.ObjectId, ref: 'Template' })
  templateId?: Types.ObjectId;

  @Prop({ type: String, enum: ['sent', 'delivered', 'failed'], default: 'sent' })
  status: 'sent' | 'delivered' | 'failed';

  @Prop({ type: Types.ObjectId, ref: 'User' })
  sentBy?: Types.ObjectId;

  @Prop({ default: Date.now })
  sentAt: Date;
}

export const CommunicationLogSchema = SchemaFactory.createForClass(CommunicationLog);
