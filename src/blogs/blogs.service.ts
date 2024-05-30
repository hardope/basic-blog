import { BadRequestException, NotFoundException, Injectable, Request } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from '../models/blog.model';

@Injectable()
export class BlogsService {
    
    async getBlogs(page: number, pageSize: number) {
        const limit = pageSize; // number of records per page
        const offset = (page - 1) * pageSize;
    
        const result = await Blog.findAndCountAll({
            where: { isApproved: true },
            limit: limit,
            offset: offset,
        });
    
        const totalPages = Math.ceil(result.count / pageSize);
    
        return {
            data: result.rows,
            meta: {
                currentPage: page,
                totalItems: result.count,
                itemsPerPage: pageSize,
                totalPages: totalPages,
            },
        };
    }
    
    async getBlog(id: number){
        const blog = await Blog.findByPk(id);
        if (!blog) {
            throw new NotFoundException(`Blog with id ${id} not found`);
        }
        return blog;
    }

    async createBlog(createBlogDto: CreateBlogDto, @Request() req){
        try{
            const loggedInUser = req.user;
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

    async updateBlog(id: number, updateBlogDto: UpdateBlogDto, @Request() req) {
        try {
            const loggedInUser = req.user;
            delete updateBlogDto['userId'];
            const blog = await Blog.findByPk(id);
            if (!blog) {
                throw new NotFoundException(`Blog with id ${id} not found`);
            }
            if (blog.authorId !== loggedInUser.id) {
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

    async deleteBlog(id: number, @Request() req) {

        const loggedInUser = req.user;
        
        const blog = await Blog.findByPk(id);
        if (!blog) {
            throw new NotFoundException(`Blog with id ${id} not found`);
        }

        if (blog.authorId != loggedInUser.id && loggedInUser.role != 'admin') {
            throw new BadRequestException('You cannot delete this blog');
        }
        await blog.destroy();
        return blog;
    }

    async approveBlog(id: number, @Request() req) {

        let loggedInUser = req.user;
        if (loggedInUser.role !== 'admin') {
            throw new BadRequestException('You are not authorized to verify a blog');
        }

        const blog = await Blog.findByPk(id);
        if (!blog) {
            throw new NotFoundException(`Blog with id ${id} not found`);
        }
        await blog.update({ isApproved: true });
        return blog;
    }
}
