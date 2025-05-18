import { Injectable } from '@nestjs/common';
import { DocumentProcessorService } from 'src/module/document-processor/document-processor.service';
import { PrismaService } from 'src/module/prisma/prisma.service';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly documentProcessorService: DocumentProcessorService,
  ) {}

  async uploadFile(file: Express.Multer.File, userId: string) {
    this.documentProcessorService.processDocument(file.path);
    const document = await this.prisma.documents.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        originalName: file.originalname,
        fileName: file.filename,
        size: file.size,
        mimetype: file.mimetype,
        uploadedPath: file.path,
        publicUrl: file.path,
      },
    });
    return {
      message: 'File uploaded successfully',
      publicUrl: document.publicUrl,
      documentId: document.id,
    };
  }
}
