import { Module } from '@nestjs/common';
import { DocumentManagerService } from './document-manager.service';
import { DocumentManagerController } from './document-manager.controller';
import { ClerkModule } from 'src/module/clerk/clerk.module';

@Module({
  controllers: [DocumentManagerController],
  providers: [DocumentManagerService],
  imports: [ClerkModule],
})
export class DocumentManagerModule {}
