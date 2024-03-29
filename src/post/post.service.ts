import { Injectable } from '@nestjs/common';
import { Post } from './post.interface';
import {Model} from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDTO } from './creat-post.dto';

@Injectable()
export class PostService {
    constructor(@InjectModel('Post') private readonly postModel: Model<Post>){}

    async addPost(createPostDTO: CreatePostDTO): Promise<Post> {
        const newPost = await this.postModel(createPostDTO);
        return newPost.save();

    }  

    async getPost(postID): Promise<Post> {
      const post = await this.postModel
        .findById(postID)
        .exec();
      return post;
    }
  
    async getPosts(): Promise<Post[]> {
      const posts = await this.postModel.find().exec();
      return posts;
    }

    async editPost(postID, createPostDTO: CreatePostDTO): Promise<Post> {
        const editedPost = await this.postModel
          .findByIdAndUpdate(postID, createPostDTO, { new: true });
        return editedPost;
      }
      async deletePost(postID): Promise<any> {
        const deletedPost = await this.postModel
          .findByIdAndRemove(postID);
        return deletedPost;
      }
}
