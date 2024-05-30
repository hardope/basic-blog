import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlogsModule } from './blogs/blogs.module';
import { AuthModule } from './auth/auth.module';
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
  }),UsersModule, BlogsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
