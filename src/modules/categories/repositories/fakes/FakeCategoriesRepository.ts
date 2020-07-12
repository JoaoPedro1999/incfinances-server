/* eslint-disable no-param-reassign */
import { uuid } from 'uuidv4';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

import Category from '@modules/categories/infra/typeorm/entities/Category';

class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  public async findCategory(title: string): Promise<Category | undefined> {
    const category = this.categories.find(item => item.title === title);

    return category;
  }

  public async create(title: string): Promise<Category> {
    const category = new Category();

    category.id = uuid();
    category.title = title;

    this.categories.push(category);

    return category;
  }
}

export default FakeCategoriesRepository;
