import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { API_ENDPOINTS } from 'src/constants/route.constants';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';
import { diskStorage } from 'multer';
import { Request } from 'src/common/interfaces';

@UseGuards(AuthGuard)
@Controller({
  path: `${API_ENDPOINTS.V1.PREFIX}${API_ENDPOINTS.V1.ENDPOINTS.FILE_UPLOAD.PREFIX}`,
  version: API_ENDPOINTS.V1.PREFIX,
})
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post(API_ENDPOINTS.V1.ENDPOINTS.FILE_UPLOAD.UPLOAD)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req: Request, file, cb) => {
          const userId = req.user.userId;
          const uploadDir = path.join(__dirname, '../../../uploads', userId);

          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }

          cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
          const fileExtension = file.originalname.match(/\.[^.]+$/);
          const cleanedFileName = file.originalname
            .replace(/\.[^.]+$/, '')
            .replace(/[^a-zA-Z0-9]/g, '-');
          const uniqueId = crypto.randomUUID();
          const fileName = `${uniqueId}-${Date.now()}-${cleanedFileName}${fileExtension}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ): Promise<any> {
    return await this.fileUploadService.uploadFile(file, req.user.userId);
  }
}
