import { Injectable, NotFoundException } from '@nestjs/common';
import { IResponse, ResponseMessage } from 'src/common/constants/response';
import { IBlog } from 'src/common/interfaces/blogDb.interface';
import { CreatePostDto } from './dto/createPost.dto';

@Injectable()
export class BlogService {
  private BLOG_POST_ID: number = 1;
  private BLOG_DB: IBlog[] = [];

  // create post
  create(payload: CreatePostDto): IResponse {
    let data = {
      ...payload,
      id: this.BLOG_POST_ID++,
      dateCreated: new Date(),
      dateModified: new Date(),
    };

    this.BLOG_DB.push(data);

    return new ResponseMessage(true, data, 'Post created successful');
  }

  // get all posts
  getPosts(): IResponse{
    return new ResponseMessage(true, this.BLOG_DB);
  }

  // get post by id
  getPost(postId: number): IResponse{
    let post = this.BLOG_DB.find(item => item.id == postId);


    if(!post){
        throw new NotFoundException(`Post with id: ${postId} not found`)
    }
    
    return new ResponseMessage(true, post)
  }

  // update post by id

  // delete post by id
}
