import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe, Request, UseGuards } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';


@Controller('blogs')
export class BlogsController {
    
        constructor(private readonly blogsService: BlogsService) { }
    
        @Get() // GET /blogs
        getBlogs(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10) {
            return this.blogsService.getBlogs(page, pageSize);
        }
    
        @Get(':id') // GET /blogs/:id
        getBlog(@Param('id', ParseIntPipe) id: number) {
            return this.blogsService.getBlog(id)
        }
    
        @Post() // POST /blogs
        @UseGuards(JwtGuard)
        createBlog(@Body(ValidationPipe) createBlogDto: CreateBlogDto, @Request() req) {
            return this.blogsService.createBlog(createBlogDto, req)
        }
    
        @Patch(':id') // PATCH /blogs/:id
        @UseGuards(JwtGuard)
        updateBlog(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateBlogDto: UpdateBlogDto, @Request() req){
            return this.blogsService.updateBlog(id, updateBlogDto, req)
        }
    
        @Delete(':id') // DELETE /blogs/:id
        @UseGuards(JwtGuard)
        deleteBlog(@Param('id', ParseIntPipe) id: number, @Request() req) {
            return this.blogsService.deleteBlog(id, req)
        }

        @Patch(':id/approve') // PATCH /blogs/:id/verify
        @UseGuards(JwtGuard)
        verifyBlog(@Param('id', ParseIntPipe) id: number, @Request() req){
            return this.blogsService.approveBlog(id, req)
        }
}
