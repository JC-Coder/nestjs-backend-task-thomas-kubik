import { Test, TestingModule } from '@nestjs/testing';
import { PostNotFoundException } from './../../../common/filters/postNotFound.filter';
import { ResponseMessage } from './../../../common/constants/response';
import { BlogService } from './blog.service';
import { CreatePostDto } from './dto/createPost.dto';

describe('BlogService', () => {
  let service: BlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogService],
    }).compile();

    service = module.get<BlogService>(BlogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create post', () => {
    it('should create a post', () => {
      const tolerance = 1000 // 1 second

      const payload = {
        title: 'Test Post',
        content: 'Test content',
        author: 'Test author',
      };

      const response = service.create(payload);
      expect(response).toBeInstanceOf(ResponseMessage);
      expect(response.data['id']).toEqual(1);
      expect(response.data['title']).toEqual(payload.title);
      expect(response.data['author']).toEqual(payload.author);
      expect(response.data['content']).toEqual(payload.content);
      expect(response.data["dateCreated"]).not.toBeNull()
      expect(response.data["dateModified"]).not.toBeNull()
    });
  });

  describe('get all posts', () => {
    it('should get all posts', () => {
      const response = service.getPosts();

      expect(response.success).toEqual(true);
      expect(response.data).not.toBeNull();
    })
  })

  describe('get single post', () => {
    it('should return a post', () => {
      const payload = {
        title: 'test post',
        content: 'test post content',
        author: 'test post author'
      }

      let post = service.create(payload);
      const response = service.getPost(post.data["id"]);
      expect(response).toBeInstanceOf(ResponseMessage);
      console.log(response.data)
    })

    it('should should throw an error if post not found', () => {
      expect(() => service.getPost(50)).toThrowError(PostNotFoundException)
    })
  })

  describe('update post by id', () => {
    it('should update a post', () => {
      const createPostPayload = {
        title: 'Test Post',
        content: 'Test content',
        author: 'Test author',
      };
  
      let createdPost = service.create(createPostPayload);
  
      const updatePostPayload = {
        title: "test post updated"
      }
  
      let updatedPost = service.updatePost(createdPost.data["id"], updatePostPayload);
      expect(updatedPost.data["title"]).toEqual(updatePostPayload.title);
    })

    it('should should throw an error if post not found', () => {
      expect(() => service.getPost(50)).toThrowError(PostNotFoundException)
    })
  })

  describe('delete post by id', () => {
    it('should delete a post', () => {
      const createPostPayload = {
        title: 'Test Post',
        content: 'Test content',
        author: 'Test author',
      };
  
      let createdPost = service.create(createPostPayload);
  
      let response = service.deletePost(createdPost.data["id"]);
      expect(response.success).toEqual(true);
    })


    it('should should throw an error if post not found', () => {
      expect(() => service.getPost(50)).toThrowError(PostNotFoundException)
    })
  })
});
