import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/role';
import { Category } from './category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private service: CategoryService) {}

  @Get(':id')
  get(@Param('id') id: number) {
    return this.service.getCategory(id);
  }

  @Get('/')
  getAll() {
    return this.service.getCategories();
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  deleteCategory(@Param('id') id: number) {
    return this.service.deleteCategoryById(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  postUser(@Body() category: Category) {
    return this.service.insertCategory(category);
  }
}
