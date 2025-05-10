import { Module } from '@nestjs/common';
import { ClerkService } from './clerk.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [ClerkService],
  exports: [ClerkService],
  imports: [PrismaModule],
})
export class ClerkModule {}
