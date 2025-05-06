import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { PrismaModule } from 'src/module/prisma/prisma.module';
import { ClerkModule } from 'src/module/clerk/clerk.module';

@Module({
  controllers: [ConversationController],
  providers: [ConversationService],
  imports: [PrismaModule, ClerkModule],
})
export class ConversationModule {}
