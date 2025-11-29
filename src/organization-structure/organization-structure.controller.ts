import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { OrganizationStructureService } from './organization-structure.service';
import { DepartmentResponseDto } from './dto/department-response.dto';
import { PositionResponseDto } from './dto/position-response.dto';
import { DepartmentDocument } from './models/department.schema';
import { PositionDocument } from './models/position.schema';

@ApiTags('Organization Structure')
@Controller('organization-structure')
export class OrganizationStructureController {
  constructor(private readonly orgStructureService: OrganizationStructureService) {}

  @Get('departments/:id')
  @ApiOperation({ summary: 'Get department by ID' })
  @ApiParam({ name: 'id', description: 'Department ID' })
  @ApiResponse({ status: 200, description: 'Department found', type: DepartmentResponseDto })
  @ApiResponse({ status: 404, description: 'Department not found' })
  async getDepartmentById(@Param('id') id: string): Promise<DepartmentDocument> {
    return this.orgStructureService.getDepartmentById(id);
  }

  @Get('positions/:id')
  @ApiOperation({ summary: 'Get position by ID' })
  @ApiParam({ name: 'id', description: 'Position ID' })
  @ApiResponse({ status: 200, description: 'Position found', type: PositionResponseDto })
  @ApiResponse({ status: 404, description: 'Position not found' })
  async getPositionById(@Param('id') id: string): Promise<PositionDocument> {
    return this.orgStructureService.getPositionById(id);
  }
}
