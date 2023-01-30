import { Controller, Post } from '@nestjs/common';
import { Body, Get, Param } from '@nestjs/common/decorators';
import { IResponse } from 'src/common/constants/response';
import { IBlog } from 'src/common/interfaces/blogDb.interface';
import { BlogService } from './blog.service';
import { CreatePostDto } from './dto/createPost.dto';

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService){}

    // create post 
    @Post()
    create(@Body() payload: CreatePostDto): IResponse {
        return this.blogService.create(payload);
    }


    // get all posts 
    @Get()
    getPosts(): IResponse{
        return this.blogService.getPosts()
    }

    // get post by id 
    @Get(':id')
    getPost(@Param('id') postId: number): IResponse{
        return this.blogService.getPost(postId);
    }

    // update post by id 


    // delete post by id 
}
