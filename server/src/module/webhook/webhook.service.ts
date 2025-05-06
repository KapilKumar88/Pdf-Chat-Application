import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/module/prisma/prisma.service';

@Injectable()
export class WebhookService {
  constructor(private readonly prisma: PrismaService) {}

  async upsert({
    clerkId,
    email,
    firstName,
    lastName,
  }: {
    clerkId: string;
    email: string;
    firstName: string;
    lastName: string;
  }) {
    return await this.prisma.user.upsert({
      where: { clerkId: clerkId },
      update: {
        email: email,
        firstName: firstName,
        lastName: lastName,
      },
      create: {
        clerkId: clerkId,
        email: email,
        firstName: firstName,
        lastName: lastName,
      },
    });
  }

  async deleteUser(clerkUserId: string) {
    return await this.prisma.user.delete({
      where: { clerkId: clerkUserId },
    });
  }
}
