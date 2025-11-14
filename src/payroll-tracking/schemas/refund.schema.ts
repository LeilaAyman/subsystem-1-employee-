import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RefundDocument = Refund & Document;

@Schema({ timestamps: true })
export class Refund {
  @Prop({ required: true })
  employeeId!: string;

  @Prop()
  claimId!: string;

  @Prop()
  disputeId!: string;

  @Prop({ required: true })
  amount!: number;

  @Prop()
  processedBy!: string;

  @Prop()
  processedAt!: Date;
}

export const RefundSchema = SchemaFactory.createForClass(Refund);
