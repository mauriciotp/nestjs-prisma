import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Message } from './Message';
import { MessageDto } from './MessageDto';

@Injectable()
export class MessagesService {
  public messages: Message[] = [
    {
      id: 1,
      text: 'Primeira mensagem',
    },
    {
      id: 2,
      text: 'Segunda mensagem',
    },
  ];

  findAll() {
    return this.messages;
  }

  async findById(id: number) {
    const message = this.messages.find((message) => message.id == id);

    if (!message) {
      throw Error(`Message with id ${id} does not exist`);
    }

    return message;
  }

  create(messageDto: MessageDto) {
    const id = this.messages.length + 1;

    const message: Message = {
      id,
      ...messageDto,
    };

    this.messages.push(message);

    return message;
  }

  async update(id: number, messageDto: MessageDto) {
    const messageToUpdate = this.messages.find((message) => message.id == id);

    if (!messageToUpdate) {
      throw new Error('Message does not exists');
    }

    messageToUpdate.text = messageDto.text;

    return messageToUpdate;
  }

  async delete(id: number) {
    const index = this.messages.findIndex((message) => message.id == id);

    this.messages.splice(index, 1);

    if (index == -1) {
      throw Error('Message does not exists');
    }
  }
}
