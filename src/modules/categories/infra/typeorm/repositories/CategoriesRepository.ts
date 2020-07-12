/* eslint-disable no-param-reassign */
import { getRepository, Repository } from 'typeorm';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import Category from '@modules/categories/infra/typeorm/entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findCategory(title: string): Promise<Category | undefined> {
    const category = this.ormRepository.findOne({
      where: {
        title,
      },
    });

    return category;
  }

  public async create(title: string): Promise<Category> {
    const category = this.ormRepository.create({ title });

    await this.ormRepository.save(category);

    return category;
  }
}

export default CategoriesRepository;
