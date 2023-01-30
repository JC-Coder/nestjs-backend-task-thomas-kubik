import { Controller, Post, ParseIntPipe } from '@nestjs/common';
import { Body, Delete, Get, Param, Put } from '@nestjs/common/decorators';
import { IResponse } from 'src/common/constants/response';
import { IBlog } from 'src/common/interfaces/blogDb.interface';
import { BlogService } from './blog.service';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  // create post
  @Post()
  create(@Body() payload: CreatePostDto): IResponse {
    return this.blogService.create(payload);
  }

  // get all posts
  @Get()
  getPosts(): IResponse {
    return this.blogService.getPosts();
  }

  // get post by id
  @Get(':id')
  getPost(@Param('id', ParseIntPipe) postId: number): IResponse {
    return this.blogService.getPost(postId);
  }

  // update post by id
  @Put(':id')
  updatePost(
    @Param('id', ParseIntPipe) postId: number,
    @Body() payload: UpdatePostDto,
  ): IResponse {
    return this.blogService.updatePost(postId, payload);
  }

  // delete post by id
  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) postId: number): IResponse {
    return this.blogService.deletePost(postId);
  }
}