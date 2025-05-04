import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConversationModule } from './api/v1/conversation/conversation.module';
import appConfig from './config/app.config';
import clerkConfig from './config/clerk.config';
import { PrismaService } from './prisma.service';
import { DocumentsModule } from './api/v1/documents/documents.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, clerkConfig],
    }),
    ConversationModule,
    DocumentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
