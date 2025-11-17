// src/employee-profile/employee-profile.module.ts

import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EmployeeProfileController } from './employee-profile.controller';
import { EmployeeProfileService } from './employee-profile.service';

// Schemas
import { Employee, EmployeeSchema } from './schemas/employee.schema';
import {
  EmployeeDocumentFile,
  EmployeeDocumentSchema,
} from './schemas/employee-document.schema';
import {
  EmployeeChangeRequest,
  EmployeeChangeRequestSchema,
} from './schemas/employee-change-request.schema';

// Imported Modules ( Integrations)
import { OrgStructureModule } from 'src/org-structure/org-structure.module';
import { PerformanceModule } from 'src/performance/performance.module';
import { PayrollModule } from 'src/payroll/payroll.module'; // used for status/pay grade updates

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
      { name: EmployeeDocumentFile.name, schema: EmployeeDocumentSchema },
      { name: EmployeeChangeRequest.name, schema: EmployeeChangeRequestSchema },
    ]),

    // Cross–module integrations (Milestone 2)
    forwardRef(() => OrgStructureModule),
    forwardRef(() => PerformanceModule),
    forwardRef(() => PayrollModule), // optional but needed when Status/Pay Grade updates affect payroll
  ],

  controllers: [EmployeeProfileController],
  providers: [EmployeeProfileService],

  exports: [EmployeeProfileService],
})
export class EmployeeProfileModule {}
