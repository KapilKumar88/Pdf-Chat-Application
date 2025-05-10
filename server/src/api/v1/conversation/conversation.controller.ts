import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
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

  @Post()
  create(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationService.create(createConversationDto);
  }

  @Get(API_ENDPOINTS.V1.ENDPOINTS.CONVERSATIONS.LIST)
  findAll(@Req() req: Request) {
    return this.conversationService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conversationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConversationDto: UpdateConversationDto,
  ) {
    return this.conversationService.update(+id, updateConversationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conversationService.remove(+id);
  }
}
