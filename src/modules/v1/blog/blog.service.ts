import { Injectable, NotFoundException } from '@nestjs/common';
import { IResponse, ResponseMessage } from 'src/common/constants/response';
import { PostNotFoundException } from 'src/common/filters/postNotFound.filter';
import { IBlog } from 'src/common/interfaces/blogDb.interface';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';

@Injectable()
export class BlogService {
  private BLOG_POST_ID: number = 1;
  private BLOG_DB: IBlog[] = [];


  // find post by id 
  findPostById(postId: number){
    return this.BLOG_DB.find((item) => item.id == postId);
  }

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
  getPosts(): IResponse {
    return new ResponseMessage(true, this.BLOG_DB);
  }

  // get post by id
  getPost(postId: number): IResponse {
    let post = this.findPostById(postId)

    if (!post) {
      throw new PostNotFoundException(postId);
    }

    return new ResponseMessage(true, post);
  }

  // update post by id
  updatePost(postId: number, payload: UpdatePostDto): IResponse {
    let postToUpdate = this.findPostById(postId);

    if (!postToUpdate) {
      throw new PostNotFoundException(postId);
    }

    let postToUpdateIndex = this.BLOG_DB.findIndex((item) => item.id == postId);

    postToUpdate = { ...postToUpdate, ...payload, dateModified: new Date() };
    this.BLOG_DB[postToUpdateIndex] = postToUpdate;

    return new ResponseMessage(true, postToUpdate, 'Post updated successfully');
  }

  // delete post by id
  deletePost(postId: number): IResponse{
    let post = this.findPostById(postId);

    if(!post){
        throw new PostNotFoundException(postId);
    }

    let postToDeleteIndex = this.BLOG_DB.findIndex(post => post.id == postId);

    this.BLOG_DB.splice(postToDeleteIndex, 1);

    return new ResponseMessage(true, null, 'Post delted successful');
  }
}
