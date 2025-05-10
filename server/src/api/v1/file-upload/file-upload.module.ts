import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { ClerkModule } from 'src/module/clerk/clerk.module';
import { PrismaModule } from 'src/module/prisma/prisma.module';

@Module({
  controllers: [FileUploadController],
  providers: [FileUploadService],
  imports: [ClerkModule, PrismaModule],
})
export class FileUploadModule {}
