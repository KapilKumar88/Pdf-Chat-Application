import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { PrismaModule } from 'src/module/prisma/prisma.module';
import { ClerkModule } from 'src/module/clerk/clerk.module';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService],
  imports: [PrismaModule, ClerkModule],
})
export class DocumentsModule {}
