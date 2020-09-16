import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './post.schema';
import { PostController } from './post.controller';
import { AuthenticationMiddleware } from 'src/common/authentication.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
],
  providers: [PostService],
  controllers: [PostController]
})

export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthenticationMiddleware).forRoutes(
      { method: RequestMethod.POST, path: '/post/add' },
      { method: RequestMethod.PUT, path: '/post/edit' },
      { method: RequestMethod.DELETE, path: '/post/delete' }
    )
  }
}