import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PayslipDocument = Payslip & Document;

@Schema({ timestamps: true })
export class Payslip {
  @Prop({ required: true })
  employeeId!: string;

  @Prop({
    type: {
      month: { type: Number, required: true },
      year: { type: Number, required: true },
    },
    required: true,
  })
  period!: {
    month: number;
    year: number;
  };

  @Prop({ required: true })
  baseSalary!: number;

  @Prop({
    type: [
      {
        label: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],
    default: [],
  })
  allowances!: { label: string; amount: number }[];

  @Prop({
    type: [
      {
        label: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],
    default: [],
  })
  deductions!: { label: string; amount: number }[];

  @Prop({ required: true })
  netSalary!: number;

  @Prop({
    enum: ['Generated', 'Approved', 'Paid'],
    default: 'Generated',
  })
  status!: string;

  @Prop()
  generatedAt!: Date;
}

export const PayslipSchema = SchemaFactory.createForClass(Payslip);
