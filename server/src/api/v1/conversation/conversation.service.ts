import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { PrismaService } from 'src/module/prisma/prisma.service';

@Injectable()
export class ConversationService {
  constructor(private readonly prisma: PrismaService) {}
  create(createConversationDto: CreateConversationDto) {
    return 'This action adds a new conversation';
  }

  findAll() {
    // return this.prisma.conversation.findMany();
    return [
      {
        id: '1',
        title: 'Project Research',
        preview: 'Analysis of market trends and competitor strategies',
        date: '2 hours ago',
        documents: ['Market Analysis.pdf', 'Competitor Report.docx'],
      },
      {
        id: '2',
        title: 'Meeting Notes',
        preview: 'Notes from the quarterly planning meeting',
        date: 'Yesterday',
        documents: ['Q2 Planning.pdf'],
      },
      {
        id: '3',
        title: 'Product Specifications',
        preview: 'Technical specifications for the new product line',
        date: '3 days ago',
        documents: ['Product Specs.pdf', 'Technical Requirements.docx'],
      },
      {
        id: '4',
        title: 'Financial Report',
        preview: 'Q1 financial performance and projections',
        date: '1 week ago',
        documents: ['Q1 Financials.pdf', 'Budget Forecast.xlsx'],
      },
      {
        id: '5',
        title: 'User Research',
        preview: 'Findings from the latest user testing sessions',
        date: '2 weeks ago',
        documents: ['User Testing Results.pdf', 'Feedback Summary.docx'],
      },
    ];
  }

  findOne(id: number) {
    return `This action returns a #${id} conversation`;
  }

  update(id: number, updateConversationDto: UpdateConversationDto) {
    return `This action updates a #${id} conversation`;
  }

  remove(id: number) {
    return `This action removes a #${id} conversation`;
  }
}
