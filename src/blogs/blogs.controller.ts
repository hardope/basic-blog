import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe, Req } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';


@Controller('blogs')
export class BlogsController {
    
        constructor(private readonly blogsService: BlogsService) { }
    
        @Get() // GET /blogs

        findAll() {
            return this.blogsService.getBlogs()
        }
    
        @Get(':id') // GET /blogs/:id
        findOne(@Param('id', ParseIntPipe) id: number) {
            return this.blogsService.getBlog(id)
        }
    
        @Post() // POST /blogs
        createBlog(@Body(ValidationPipe) createBlogDto: CreateBlogDto, @Req() req: Request) {
            return this.blogsService.createBlog(createBlogDto, req)
        }
    
        @Patch(':id') // PATCH /blogs/:id
        updateBlog(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateBlogDto: UpdateBlogDto, @Req() req: Request){
            return this.blogsService.updateBlog(id, updateBlogDto, req)
        }
    
        @Delete(':id') // DELETE /blogs/:id
        deleteBlog(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
            return this.blogsService.deleteBlog(id, req)
        }

        @Patch(':id/verify') // PATCH /blogs/:id/verify
        verifyBlog(@Param('id', ParseIntPipe) id: number, @Req() req: Request){
            return this.blogsService.verifyBlog(id, req)
        }
}
