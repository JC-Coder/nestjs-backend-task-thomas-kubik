import { Controller, Post, ParseIntPipe } from '@nestjs/common';
import { Body, Delete, Get, Param, Put } from '@nestjs/common/decorators';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IResponse } from 'src/common/constants/response';
import { IBlog } from 'src/common/interfaces/blogDb.interface';
import { BlogService } from './blog.service';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';

@Controller('blog')
@ApiTags('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  // create post
  @Post()
  @ApiResponse({
    status: 201,
    description: 'A post has been successfully created',
  })
  @ApiResponse({
    status: 404,
    description: 'A post with given id does not exist.',
  })
  create(@Body() payload: CreatePostDto): IResponse {
    return this.blogService.create(payload);
  }

  // get all posts
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Posts fetched successfully',
  })
  getPosts(): IResponse {
    return this.blogService.getPosts();
  }

  // get post by id
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'post fetched successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'A post with given id does not exist.',
  })
  getPost(@Param('id', ParseIntPipe) postId: number): IResponse {
    return this.blogService.getPost(postId);
  }

  // update post by id
  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'post updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'A post with given id does not exist.',
  })
  updatePost(
    @Param('id', ParseIntPipe) postId: number,
    @Body() payload: UpdatePostDto,
  ): IResponse {
    return this.blogService.updatePost(postId, payload);
  }

  // delete post by id
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'post fetched successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'A post with given id does not exist.',
  })
  deletePost(@Param('id', ParseIntPipe) postId: number): IResponse {
    return this.blogService.deletePost(postId);
  }
}
