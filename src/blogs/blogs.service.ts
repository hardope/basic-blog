import { BadRequestException, NotFoundException, Injectable, Req } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from '../models/blog.model';

@Injectable()
export class BlogsService {
    
        async getBlogs() {
            return await Blog.findAll({ where: { isVerified: true }});
        }
    
        async getBlog(id: number){
            const blog = await Blog.findByPk(id);
            if (!blog) {
                throw new NotFoundException(`Blog with id ${id} not found`);
            }
            return blog;
        }

        async createBlog(createBlogDto: CreateBlogDto, @Req() req: Request){
            try{
                const loggedInUser = JSON.parse(req.headers['user']);
                createBlogDto['userId'] = loggedInUser.id;
                var blog = new Blog({ ...createBlogDto });
                await blog.save();
                return blog;
            } catch (error) {
                if (error.name === 'SequelizeForeignKeyConstraintError') {
                    return new BadRequestException('User not found');
                }
            }
        }

        async updateBlog(id: number, updateBlogDto: UpdateBlogDto, @Req() req: Request) {
            try {
                delete updateBlogDto['userId'];
                const blog = await Blog.findByPk(id);
                if (!blog) {
                    throw new NotFoundException(`Blog with id ${id} not found`);
                }
                if (blog.userId !== JSON.parse(req.headers['user']).id) {
                    return new BadRequestException('You cannot update this blog');
                }
                await blog.update({ ...updateBlogDto });
                return blog;
            } catch (error) {
                if (error.name === 'SequelizeForeignKeyConstraintError') {
                    throw new BadRequestException('User not found');
                }
            }
        }

        async deleteBlog(id: number, @Req() req: Request) {

            const loggedInUser = JSON.parse(req.headers['user']);
            
            const blog = await Blog.findByPk(id);
            if (!blog) {
                throw new NotFoundException(`Blog with id ${id} not found`);
            }

            if (blog.userId != loggedInUser.id && loggedInUser.role != 'admin') {
                throw new BadRequestException('You cannot delete this blog');
            }
            await blog.destroy();
            return blog;
        }
    
        async verifyBlog(id: number, @Req() req: Request) {

            let loggedInUser = JSON.parse(req.headers['user']);
            if (loggedInUser.role !== 'admin') {
                throw new BadRequestException('You are not authorized to verify a blog');
            }

            const blog = await Blog.findByPk(id);
            if (!blog) {
                throw new NotFoundException(`Blog with id ${id} not found`);
            }
            await blog.update({ isVerified: true });
            return blog;
        }
}
