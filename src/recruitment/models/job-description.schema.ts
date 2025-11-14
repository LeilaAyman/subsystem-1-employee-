import {  Prop , Schema , SchemaFactory } from '@nestjs/mongoose' ;
import { HydratedDocument } from 'mongoose';


export type JobDescriptionDocument = HydratedDocument<JobDescription>;

@Schema()

export class JobDescription {

  @Prop ({ required: true })
  jobName: string ;

  @Prop ({ required: true })
  jobCategory: string ;

  @Prop ({ required : true })
  description: string ; 

  @Prop ({ required : true })
  isActive : boolean ;

  @Prop ({required: true })
  createdBy : string ;

  @Prop ({ required : true })
  updatedAt : Date ;

}

export const jobDescriptionSchema = SchemaFactory.createForClass(JobDescription);