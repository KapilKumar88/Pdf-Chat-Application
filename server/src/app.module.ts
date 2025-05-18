import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConversationModule } from './api/v1/conversation/conversation.module';
import appConfig from './config/app.config';
import clerkConfig from './config/clerk.config';
import { WebhookModule } from './module/webhook/webhook.module';
import { PrismaModule } from './module/prisma/prisma.module';
import { ClerkModule } from './module/clerk/clerk.module';
import { FileUploadModule } from './api/v1/file-upload/file-upload.module';
import { MulterModule } from '@nestjs/platform-express';
import { DocumentProcessorService } from './module/document-processor/document-processor.service';
import { DocumentProcessorModule } from './module/document-processor/document-processor.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, clerkConfig],
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get<string>('app.FILE_UPLOAD_FOLDER'),
      }),
      inject: [ConfigService],
    }),
    ConversationModule,
    WebhookModule,
    PrismaModule,
    ClerkModule,
    FileUploadModule,
    DocumentProcessorModule,
  ],
  controllers: [AppController],
  providers: [AppService, DocumentProcessorService],
})
export class AppModule {}
