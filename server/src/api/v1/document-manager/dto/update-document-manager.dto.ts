import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentManagerDto } from './create-document-manager.dto';

export class UpdateDocumentManagerDto extends PartialType(CreateDocumentManagerDto) {}
