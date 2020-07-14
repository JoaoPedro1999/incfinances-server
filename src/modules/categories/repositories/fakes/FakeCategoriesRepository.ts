/* eslint-disable no-param-reassign */
import { uuid } from 'uuidv4';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

import Category from '@modules/categories/infra/typeorm/entities/Category';
import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';
import IFindCategoryByUserDTO from '@modules/categories/dtos/IFindCategoryByUserDTO';

class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  public async findCategory({
    user_id,
    title,
  }: IFindCategoryByUserDTO): Promise<Category | undefined> {
    const findCategory = this.categories.find(
      category => category.user_id === user_id && category.title === title,
    );

    return findCategory;
  }

  public async create({
    title,
    user_id,
  }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    category.id = uuid();
    category.user_id = user_id;
    category.title = title;

    this.categories.push(category);

    return category;
  }
}

export default FakeCategoriesRepository;
