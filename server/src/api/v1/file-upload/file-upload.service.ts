import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/module/prisma/prisma.service';

@Injectable()
export class FileUploadService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadFile(file: Express.Multer.File, userId: string) {
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
