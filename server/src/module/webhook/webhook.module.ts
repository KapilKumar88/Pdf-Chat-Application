import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [WebhookController],
  providers: [WebhookService],
  imports: [PrismaModule],
})
export class WebhookModule {}
