import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DisputeDocument = Dispute & Document;

@Schema({ timestamps: true })
export class Dispute {
  @Prop({ required: true })
  employeeId!: string;

  @Prop({ required: true })
  payslipId!: string;

  @Prop({ required: true })
  reason!: string;

  @Prop({
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  })
  status!: string;

  @Prop()
  adminComments!: string;
}

export const DisputeSchema = SchemaFactory.createForClass(Dispute);
