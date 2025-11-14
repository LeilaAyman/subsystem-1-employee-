import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AccessRevocationLogDocument = HydratedDocument<AccessRevocationLog>;

@Schema({ timestamps: true })
export class AccessRevocationLog {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'OffboardingCase', required: true })
  offboardingCaseId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true })
  employeeId: mongoose.Types.ObjectId;

  // 💻 System access
  @Prop({ type: [{ systemName: String, status: String, revokedAt: Date }], default: [] })
  systems: Record<string, any>[];

  @Prop({ type: { status: String, deactivatedAt: Date } })
  email?: Record<string, any>;

  @Prop({ type: { status: String, revokedAt: Date } })
  networkAccess?: Record<string, any>;

  // 🏢 Physical access
  @Prop({ type: { status: String, deactivatedAt: Date } })
  accessCard?: Record<string, any>;

  @Prop({ type: { returned: Boolean, returnedAt: Date } })
  badge?: Record<string, any>;

  // 🧑‍💻 Execution info
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  systemAdminId?: mongoose.Types.ObjectId;

  @Prop({
    enum: ['pending', 'partial', 'completed'],
    default: 'pending',
  })
  status: string;
}

export const AccessRevocationLogSchema = SchemaFactory.createForClass(AccessRevocationLog);
