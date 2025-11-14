import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OffboardingCaseDocument = HydratedDocument<OffboardingCase>;

@Schema({ timestamps: true })
export class OffboardingCase {
  // 🔗 Employee reference
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true })
  employeeId: mongoose.Types.ObjectId;

  // 👤 Snapshot of employee info at initiation
  @Prop({ required: true }) firstName: string;
  @Prop({ required: true }) lastName: string;
  @Prop({ required: true }) email: string;
  @Prop({ required: true }) position: string;
  @Prop({ required: true }) department: string;

  // 📝 Offboarding details
  @Prop({ enum: ['resignation', 'termination'], required: true })
  offboardingType: string;

  @Prop() reasonCategory?: string;
  @Prop() detailedReason?: string;
  @Prop() additionalNotes?: string;

  // 📅 Important dates
  @Prop() initiationDate?: Date;
  @Prop() resignationSubmittedDate?: Date;
  @Prop() lastWorkingDay?: Date;
  @Prop() noticePeriodDays?: number;
  @Prop() effectiveDate?: Date;

  // ⚙️ Case status
  @Prop({
    enum: ['initiated', 'pending_approval', 'approved', 'in_progress', 'completed', 'cancelled'],
    default: 'initiated',
  })
  status: string;

  // 🧾 Approval workflow
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
  approvals: {
    approverRole: string;
    approverId: mongoose.Types.ObjectId;
    status: string;
    date: Date;
  }[];
}

export const OffboardingCaseSchema = SchemaFactory.createForClass(OffboardingCase);
