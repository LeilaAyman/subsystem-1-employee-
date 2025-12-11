
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TimeManagementModule } from './time-management/time-management.module';
import { RecruitmentModule } from './recruitment/recruitment.module';
import { LeavesModule } from './leaves/leaves.module';
import { PayrollTrackingModule } from './payroll-tracking/payroll-tracking.module';
import { EmployeeProfileModule } from './employee-profile/employee-profile.module';
import { OrganizationStructureModule } from './organization-structure/organization-structure.module';
import { PerformanceModule } from './performance/performance.module';
import { PayrollConfigurationModule } from './payroll-configuration/payroll-configuration.module';
import { PayrollExecutionModule } from './payroll-execution/payroll-execution.module';
<<<<<<< HEAD:backend/src/app.module.ts
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forRoot(process.env.DB_URL!),
    AuthModule,
    TimeManagementModule, RecruitmentModule, LeavesModule, PayrollExecutionModule, PayrollConfigurationModule, PayrollTrackingModule, EmployeeProfileModule, OrganizationStructureModule, PerformanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

=======
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 🔥 1) Load .env globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    //  2) MAIN FIX: Connect to Mongo using DB_URL from .env
    MongooseModule.forRoot(process.env.DB_URL as string),

    //  3) Your project modules
    TimeManagementModule,
    RecruitmentModule,
    LeavesModule,
    PayrollExecutionModule,
    PayrollConfigurationModule,
    PayrollTrackingModule,
    EmployeeProfileModule,
    OrganizationStructureModule,
    PerformanceModule,
    AuthModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
>>>>>>> 40db564390103036b6212b59a4e1b86d395093a2:src/app.module.ts
