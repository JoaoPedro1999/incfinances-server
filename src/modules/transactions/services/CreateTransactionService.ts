/*
 * This file is responsible for creating a new transaction,
 * also checking the balance for creating an outgoing transaction. */

import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import Transaction from '../infra/typeorm/entities/Transaction';

import ITransactionsRepository from '../repositories/ITransactionsRepository';

interface Request {
  user_id: string;
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

@injectable()
class CreateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionRepository: ITransactionsRepository,

    @inject('CategoriesRepository')
    private categoryRepository: ICategoriesRepository,
  ) {}

  public async execute({
    user_id,
    title,
    category,
    type,
    value,
  }: Request): Promise<Transaction | null> {
    let findCategory = await this.categoryRepository.findCategory({
      title: category,
      user_id,
    });

    if (type === 'outcome') {
      const { total } = await this.transactionRepository.getBalance(user_id);

      if (total < value) {
        throw new AppError("You don't have enough credit :'(");
      }
    }

    if (!findCategory) {
      findCategory = await this.categoryRepository.create({
        title: category,
        user_id,
      });
    }

    const transaction = this.transactionRepository.create({
      user_id,
      title,
      category_id: findCategory.id,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
