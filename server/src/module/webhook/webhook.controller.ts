import {
  Controller,
  Headers,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { Request, Response } from 'express';
import { PrismaService } from 'src/module/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Webhook } from 'svix';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  @Post('clerk')
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('svix-id') svixId: string,
    @Headers('svix-timestamp') svixTimestamp: string,
    @Headers('svix-signature') svixSignature: string,
  ) {
    const payload = req.body;
    const headers = {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    };

    const webhookSecret = this.configService.get(
      'clerk.CLERK_WEBHOOK_SIGNING_SECRET',
    );

    if (!webhookSecret) {
      throw new Error('CLERK_WEBHOOK_SIGNING_SECRET is not set');
    }

    const wh = new Webhook(webhookSecret);
    let evt: any;
    try {
      evt = wh.verify(payload, headers);
    } catch (e) {
      return res.status(401).send('Unauthorized');
    }

    const { type, data } = evt;
    try {
      switch (type) {
        case 'user.created':
        case 'user.updated':
          await this.webhookService.upsert({
            clerkId: data.id,
            email: data.email_addresses[0].email_address,
            firstName: data.first_name,
            lastName: data.last_name,
          });
          break;
        case 'user.deleted':
          await this.webhookService.deleteUser(data.id);
          break;
        default:
          console.info('Event type not handled:', type);
      }
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(error?.message ?? 'Server error');
    }

    return res.status(HttpStatus.OK).send('webhook received');
  }
}
