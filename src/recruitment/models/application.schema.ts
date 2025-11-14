import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export enum ApplicationStatus {
  Submitted = 'submitted',
  Screening = 'screening',
  Shortlisted = 'shortlisted',
  InterviewScheduled = 'interview_scheduled',
  Interviewed = 'interviewed',
  OfferSent = 'offer_sent',
  OfferAccepted = 'offer_accepted',
  Rejected = 'rejected',
  Withdrawn = 'withdrawn',
}

export type ApplicationDocument = HydratedDocument<Application>;

@Schema({ timestamps: true }) 
export class Application {

  @Prop({ type: Types.ObjectId, ref: 'Candidate', required: true })
  candidateId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'JobPosting', required: true })
  jobPostingId: Types.ObjectId;

  @Prop({ type: String, enum: Object.values(ApplicationStatus), required: true, default: ApplicationStatus.Submitted })
  status: ApplicationStatus;

  @Prop({ type: String, enum: Object.values(ApplicationStatus), required: true, default: ApplicationStatus.Submitted })
  currentStage: ApplicationStatus;

  @Prop({
    type: [
      {
        stage: { type: String, enum: Object.values(ApplicationStatus), required: true },
        date: { type: Date, required: true },
        notes: { type: String },
      },
    ],
    default: [],
  })
  stageHistory: {
    stage: ApplicationStatus;
    date: Date;
    notes?: string;
  }[];

  @Prop({ type: Number })
  screeningScore?: number;

  @Prop({ type: String })
  screeningNotes?: string;

  @Prop({ type: Date })
  screeningDate?: Date;

  @Prop({
    type: [
      {
        interviewer: { type: String, required: true },
        interviewDate: { type: Date, required: true },
        interviewNotes: { type: String },
      },
    ],
    default: [],
  })
  interviewDetails: {
    interviewer: string;
    interviewDate: Date;
    interviewNotes?: string;
  }[];

  @Prop({ type: Number })
  totalScore?: number;

  @Prop({ type: String })
  evaluationComments?: string;

  @Prop({
    type: {
      offeredSalary: { type: Number },
      offerDate: { type: Date },
      accepted: { type: Boolean, default: false },
      notes: { type: String },
    },
  })
  offerDetails?: {
    offeredSalary?: number;
    offerDate?: Date;
    accepted?: boolean;
    notes?: string;
  };

}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
