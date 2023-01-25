import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Message } from './Message';
import { MessageDto } from './MessageDto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.messagesService.findById(+id).catch((e) => {
      throw new NotFoundException(e.message);
    });
  }

  @Post()
  create(@Body() messageDto: MessageDto) {
    return this.messagesService.create(messageDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() messageDto: MessageDto) {
    return this.messagesService.update(+id, messageDto).catch((e) => {
      throw new NotFoundException(e.message);
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.messagesService.delete(+id).catch((e) => {
      throw new NotFoundException(e.message);
    });
  }
}
