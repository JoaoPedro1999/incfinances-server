import Category from '../infra/typeorm/entities/Category';

import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import IFindCategoryByUserDTO from '../dtos/IFindCategoryByUserDTO';

export default interface ITransactionRepository {
  create(data: ICreateCategoryDTO): Promise<Category>;
  findCategory(data: IFindCategoryByUserDTO): Promise<Category | undefined>;
}
