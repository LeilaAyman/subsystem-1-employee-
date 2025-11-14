import { Module } from '@nestjs/common';
import { OrgStructureService } from './org-structure/org-structure.service';
import { OrgStructureController } from './org-structure/org-structure.controller';

@Module({
  providers: [OrgStructureService],
  controllers: [OrgStructureController]
})
export class OrgStructureModule {}
