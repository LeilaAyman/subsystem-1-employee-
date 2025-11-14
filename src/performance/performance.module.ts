import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  PerformanceTemplate,
  PerformanceTemplateSchema,
} from './schemas/performance-template.schema';
import {
  AppraisalCycle,
  AppraisalCycleSchema,
} from './schemas/appraisal-cycle.schema';
import {
  Appraisal,
  AppraisalSchema,
} from './schemas/appraisal.schema';

import { PerformanceService } from './performance.service';
import { PerformanceController } from './performance.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PerformanceTemplate.name, schema: PerformanceTemplateSchema },
      { name: AppraisalCycle.name, schema: AppraisalCycleSchema },
      { name: Appraisal.name, schema: AppraisalSchema },
    ]),
  ],
  controllers: [PerformanceController],
  providers: [PerformanceService],
  exports: [PerformanceService],
})
export class PerformanceModule {}
