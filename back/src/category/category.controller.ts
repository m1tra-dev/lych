import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';
import { AdminGuard } from 'src/decorators/admin.guard';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() body: { category: string }): Promise<Category> {
    return this.categoryService.create(body);
  }

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findOne(+id);
  }
  @UseGuards(AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() body: { category: string }): Promise<Category> {
    return this.categoryService.update(+id, body);
  }
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Category> {
    return this.categoryService.remove(+id);
  }
}
