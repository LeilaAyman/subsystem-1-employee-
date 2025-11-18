import { Injectable } from '@nestjs/common';
import { CreateTimeManagementDto } from './dto/create-time-management.dto';
import { UpdateTimeManagementDto } from './dto/update-time-management.dto';

@Injectable()
export class TimeManagementService {
  create(createTimeManagementDto: CreateTimeManagementDto) {
    return 'This action adds a new timeManagement';
  }

  findAll() {
    return `This action returns all timeManagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} timeManagement`;
  }

  update(id: number, updateTimeManagementDto: UpdateTimeManagementDto) {
    return `This action updates a #${id} timeManagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} timeManagement`;
  }
}
