import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TimeManagementService } from './time-management.service';
import { CreateTimeManagementDto } from './dto/create-time-management.dto';
import { UpdateTimeManagementDto } from './dto/update-time-management.dto';

@Controller('time-management')
export class TimeManagementController {
  constructor(private readonly timeManagementService: TimeManagementService) {}

  @Post()
  create(@Body() createTimeManagementDto: CreateTimeManagementDto) {
    return this.timeManagementService.create(createTimeManagementDto);
  }

  @Get()
  findAll() {
    return this.timeManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeManagementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimeManagementDto: UpdateTimeManagementDto) {
    return this.timeManagementService.update(+id, updateTimeManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeManagementService.remove(+id);
  }
}
