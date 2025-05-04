import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createDocumentDto: CreateDocumentDto) {
    return 'This action adds a new document';
  }

  findAll() {
    // return this.prisma.document.findMany();
    return [
      {
        id: '1',
        name: 'Market Analysis.pdf',
        type: 'pdf',
        size: '2.4 MB',
        date: '2 days ago',
      },
      {
        id: '2',
        name: 'Competitor Report.docx',
        type: 'docx',
        size: '1.8 MB',
        date: '2 days ago',
      },
      {
        id: '3',
        name: 'Q2 Planning.pdf',
        type: 'pdf',
        size: '3.2 MB',
        date: '3 days ago',
      },
      {
        id: '4',
        name: 'Product Specs.pdf',
        type: 'pdf',
        size: '1.5 MB',
        date: '5 days ago',
      },
      {
        id: '5',
        name: 'Technical Requirements.docx',
        type: 'docx',
        size: '2.1 MB',
        date: '5 days ago',
      },
      {
        id: '6',
        name: 'Q1 Financials.pdf',
        type: 'pdf',
        size: '4.7 MB',
        date: '1 week ago',
      },
      {
        id: '7',
        name: 'Budget Forecast.xlsx',
        type: 'xlsx',
        size: '1.2 MB',
        date: '1 week ago',
      },
      {
        id: '8',
        name: 'User Testing Results.pdf',
        type: 'pdf',
        size: '3.5 MB',
        date: '2 weeks ago',
      },
      {
        id: '9',
        name: 'Feedback Summary.docx',
        type: 'docx',
        size: '1.9 MB',
        date: '2 weeks ago',
      },
    ];
  }

  findOne(id: number) {
    return `This action returns a #${id} document`;
  }

  update(id: number, updateDocumentDto: UpdateDocumentDto) {
    return `This action updates a #${id} document`;
  }

  remove(id: number) {
    return `This action removes a #${id} document`;
  }
}
