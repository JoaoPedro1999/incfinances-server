import Category from '../infra/typeorm/entities/Category';

export default interface ITransactionRepository {
  create(title: string): Promise<Category>;
  findCategory(title: string): Promise<Category | undefined>;
}
