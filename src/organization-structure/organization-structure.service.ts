import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department, DepartmentDocument } from './models/department.schema';
import { Position, PositionDocument } from './models/position.schema';

@Injectable()
export class OrganizationStructureService {
  constructor(
    @InjectModel(Department.name) private departmentModel: Model<DepartmentDocument>,
    @InjectModel(Position.name) private positionModel: Model<PositionDocument>,
  ) {}

  async getDepartmentById(id: string): Promise<DepartmentDocument> {
    const department = await this.departmentModel
      .findById(id)
      .populate('headPositionId')
      .exec();

    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    return department;
  }

  async getPositionById(id: string): Promise<PositionDocument> {
    const position = await this.positionModel
      .findById(id)
      .populate('departmentId')
      .populate('reportsToPositionId')
      .exec();

    if (!position) {
      throw new NotFoundException(`Position with ID ${id} not found`);
    }

    return position;
  }
}
