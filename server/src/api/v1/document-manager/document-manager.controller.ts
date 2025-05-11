import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DocumentManagerService } from './document-manager.service';
import { CreateDocumentManagerDto } from './dto/create-document-manager.dto';
import { UpdateDocumentManagerDto } from './dto/update-document-manager.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { API_ENDPOINTS } from 'src/constants/route.constants';

@UseGuards(AuthGuard)
@Controller({
  path: `${API_ENDPOINTS.V1.PREFIX}${API_ENDPOINTS.V1.ENDPOINTS.DOCUMENTS_MANAGER.PREFIX}`,
  version: API_ENDPOINTS.V1.PREFIX,
})
export class DocumentManagerController {
  constructor(
    private readonly documentManagerService: DocumentManagerService,
  ) {}

  @Post()
  create(@Body() createDocumentManagerDto: CreateDocumentManagerDto) {
    return this.documentManagerService.create(createDocumentManagerDto);
  }

  @Get()
  findAll() {
    return this.documentManagerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentManagerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentManagerDto: UpdateDocumentManagerDto,
  ) {
    return this.documentManagerService.update(+id, updateDocumentManagerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentManagerService.remove(+id);
  }
}
