import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Payslip, PayslipDocument } from './schemas/payslip.schema';

@Injectable()
export class PayrollTestService implements OnModuleInit {
  constructor(
    @InjectModel(Payslip.name)
    private payslipModel: Model<PayslipDocument>,
  ) {}

  async onModuleInit() {
    console.log('⚡ Testing Payslip schema...');

    const testPayslip = new this.payslipModel({
      employeeId: 'E1001',
      period: { month: 10, year: 2025 },
      baseSalary: 12000,
      allowances: [
        { label: 'Transportation', amount: 500 },
        { label: 'Housing', amount: 2000 },
      ],
      deductions: [{ label: 'Tax', amount: 800 }],
      netSalary: 13700,
      status: 'Generated',
    });

    await testPayslip.save();

    console.log('✅ Payslip inserted successfully');
  }
}
