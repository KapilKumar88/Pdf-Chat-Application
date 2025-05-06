import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConversationModule } from './api/v1/conversation/conversation.module';
import appConfig from './config/app.config';
import clerkConfig from './config/clerk.config';
import { DocumentsModule } from './api/v1/documents/documents.module';
import { WebhookModule } from './module/webhook/webhook.module';
import { PrismaModule } from './module/prisma/prisma.module';
import { ClerkModule } from './module/clerk/clerk.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, clerkConfig],
    }),
    ConversationModule,
    DocumentsModule,
    WebhookModule,
    PrismaModule,
    ClerkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
