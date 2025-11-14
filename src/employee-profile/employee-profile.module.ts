import { Module } from '@nestjs/common';
import { EmployeeProfileService } from './employee-profile.service';
import { EmployeeProfileController } from './employee-profile.controller';

@Module({
  providers: [EmployeeProfileService],
  controllers: [EmployeeProfileController]
})
export class EmployeeProfileModule {}
