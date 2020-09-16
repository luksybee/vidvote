import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // add this
import { PostModule } from './post/post.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/vidvote', { useNewUrlParser: true }),
    PostModule,
  ],
})
export class AppModule { }
