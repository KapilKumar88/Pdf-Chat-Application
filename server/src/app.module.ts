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

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
