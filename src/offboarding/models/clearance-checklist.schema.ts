import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ClearanceChecklistDocument = HydratedDocument<ClearanceChecklist>;

const clearanceItem = {
  item: String,
  status: { type: String, enum: ['pending', 'cleared'], default: 'pending' },
  clearedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  clearedAt: Date,
};

@Schema({ timestamps: true })
export class ClearanceChecklist {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'OffboardingCase', required: true })
  offboardingCaseId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true })
  employeeId: mongoose.Types.ObjectId;

  // 🧹 Departmental clearances
  @Prop({ type: [clearanceItem] }) IT: any[];
  @Prop({ type: [clearanceItem] }) HR: any[];
  @Prop({ type: [clearanceItem] }) Finance: any[];
  @Prop({ type: [clearanceItem] }) Facilities: any[];
  @Prop({ type: [clearanceItem] }) LineManager: any[];

  // 📊 Progress tracking
  @Prop({ enum: ['pending', 'partial', 'completed'], default: 'pending' })
  overallStatus: string;

  @Prop({ default: 0 })
  completionPercentage: number;

  // 🧾 Approval chain
  @Prop({
    type: [
      {
        approverRole: String,
        approverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: { type: String, default: 'pending' },
        date: Date,
      },
    ],
    default: [],
  })
  approvalChain: Record<string, any>[];
}

export const ClearanceChecklistSchema = SchemaFactory.createForClass(ClearanceChecklist);
