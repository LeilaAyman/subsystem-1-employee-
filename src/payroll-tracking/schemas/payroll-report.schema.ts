import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PayrollReportDocument = PayrollReport & Document;

@Schema({ timestamps: true })
export class PayrollReport {
  @Prop({
    enum: ['Monthly', 'Tax', 'Insurance', 'Department'],
    required: true,
  })
  type!: string;

  @Prop({ required: true })
  generatedBy!: string;

  @Prop({ type: Object })
  data!: any;

  @Prop()
  generatedAt!: Date;
}

export const PayrollReportSchema = SchemaFactory.createForClass(PayrollReport);
