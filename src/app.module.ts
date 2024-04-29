import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlogsModule } from './blogs/blogs.module';
import { JwtAuthMiddleware } from './auth.middleware';
import config from './config';

@Module({
  imports: [SequelizeModule.forRoot({
    dialect: 'postgres',
    host: config.host|| 'localhost',
    port: 5432,
    username: config.username,
    password: config.password,
    database: config.database,
    autoLoadModels: true,
    synchronize: true,
    logging: false
  }),UsersModule, BlogsModule],
  controllers: [AppController],
  providers: [AppService, JwtAuthMiddleware],
})
export class AppModule {}
