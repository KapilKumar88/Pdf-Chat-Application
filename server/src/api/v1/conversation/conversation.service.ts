import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { PrismaService } from 'src/module/prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class ConversationService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createConversationDto: CreateConversationDto, userId: string) {
    let conversationId = createConversationDto.conversationId;
    if (!conversationId) {
      console.log('new conversation');
      const tempRes = await this.prisma.conversation.create({
        data: {
          title: createConversationDto.message,
          documents: {
            connect: createConversationDto.documentIds.map((id) => ({ id })),
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      conversationId = tempRes.id;
    }

    await this.prisma.messages.create({
      data: {
        content: createConversationDto.message,
        messageBy: Role.USER,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
      },
    });
    const botMessageResponse = await this.prisma.messages.create({
      data: {
        content: 'Hello message by a bot',
        messageBy: Role.BOT,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
      },
    });
    return {
      botMessage: botMessageResponse.content,
      messageId: botMessageResponse.id,
      conversationId: conversationId,
    };
  }

  findAll(userId: string) {
    return this.prisma.conversation.findMany({
      where: {
        userId: userId,
      },
    });
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
