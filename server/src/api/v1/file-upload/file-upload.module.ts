import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { ClerkModule } from 'src/module/clerk/clerk.module';
import { PrismaModule } from 'src/module/prisma/prisma.module';
import { DocumentProcessorModule } from 'src/module/document-processor/document-processor.module';

@Module({
  controllers: [FileUploadController],
  providers: [FileUploadService],
  imports: [ClerkModule, PrismaModule, DocumentProcessorModule],
})
export class FileUploadModule {}
