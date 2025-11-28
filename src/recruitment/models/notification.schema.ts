import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Notification {

  // Recipient can be either a Candidate or an Employee
  @Prop({ type: Types.ObjectId, refPath: 'recipientModel' })
  recipientId: Types.ObjectId;

  @Prop({ type: String, enum: ['Candidate', 'Employee'], required: true })
  recipientModel: 'Candidate' | 'Employee';

  @Prop({ required: true })
  notificationMessageTitle: string;

  @Prop({ required: true })
  notificationBody: string;

  // @Prop()
  // contextNotificationStatus?: string;

  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  sentBy?: Types.ObjectId;
}

export type NotificationDocument = HydratedDocument<Notification>;
export const NotificationSchema = SchemaFactory.createForClass(Notification);