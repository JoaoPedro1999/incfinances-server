/* eslint-disable no-param-reassign */
import { getRepository, Repository } from 'typeorm';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import Category from '@modules/categories/infra/typeorm/entities/Category';
import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';
import IFindCategoryByUserDTO from '@modules/categories/dtos/IFindCategoryByUserDTO';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findCategory({
    user_id,
    title,
  }: IFindCategoryByUserDTO): Promise<Category | undefined> {
    const category = this.ormRepository.findOne({
      where: {
        title,
        user_id,
      },
    });

    return category;
  }

  public async create({
    title,
    user_id,
  }: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create({ title, user_id });

    await this.ormRepository.save(category);

    return category;
  }
}

export default CategoriesRepository;
