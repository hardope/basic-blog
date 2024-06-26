import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Blog } from '../models/blog.model';

@Module({
  imports: [SequelizeModule.forFeature([Blog])],
  controllers: [BlogsController],
  providers: [BlogsService]
})
export class BlogsModule {}
