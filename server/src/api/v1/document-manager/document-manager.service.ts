import { Injectable } from '@nestjs/common';
import { CreateDocumentManagerDto } from './dto/create-document-manager.dto';
import { UpdateDocumentManagerDto } from './dto/update-document-manager.dto';

@Injectable()
export class DocumentManagerService {
  create(createDocumentManagerDto: CreateDocumentManagerDto) {
    return 'This action adds a new documentManager';
  }

  findAll() {
    return `This action returns all documentManager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} documentManager`;
  }

  update(id: number, updateDocumentManagerDto: UpdateDocumentManagerDto) {
    return `This action updates a #${id} documentManager`;
  }

  remove(id: number) {
    return `This action removes a #${id} documentManager`;
  }
}
