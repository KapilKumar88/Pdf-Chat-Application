import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { API_ENDPOINTS } from 'src/constants/route.constants';
import { AuthGuard } from 'src/guard/auth.guard';
import { Request } from 'src/common/interfaces';

@UseGuards(AuthGuard)
@Controller({
  path: `${API_ENDPOINTS.V1.PREFIX}${API_ENDPOINTS.V1.ENDPOINTS.CONVERSATIONS.PREFIX}`,
  version: API_ENDPOINTS.V1.PREFIX,
})
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post(API_ENDPOINTS.V1.ENDPOINTS.CONVERSATIONS.ASK)
  create(
    @Body() createConversationDto: CreateConversationDto,
    @Req() req: Request,
  ) {
    return this.conversationService.create(
      createConversationDto,
      req.user.userId,
    );
  }

  @Get(API_ENDPOINTS.V1.ENDPOINTS.CONVERSATIONS.LIST)
  findAll(@Req() req: Request) {
    return this.conversationService.findAll(req.user.userId);
  }
}
