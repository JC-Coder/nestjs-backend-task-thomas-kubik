import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import { BlogModule } from './modules/v1/blog/blog.module';

config();

@Module({
  imports: [
    BlogModule
  ],
  providers: [
  ],
})
export class AppModule {}