import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async getCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async getCategory(id: number): Promise<Category | undefined> {
    return this.categoryRepository.findOne({ id });
  }

  async deleteCategoryById(_id: number) {
    await this.categoryRepository.delete({ id: _id });
  }

  async insertCategory(category: Category): Promise<Category> {
    await this.categoryRepository.insert(category);

    return category;
  }
}
