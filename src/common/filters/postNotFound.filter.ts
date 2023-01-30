import { HttpException, HttpStatus } from '@nestjs/common';

export class PostNotFoundException extends HttpException {
  constructor(id: number) {
    super(`Post with id ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
