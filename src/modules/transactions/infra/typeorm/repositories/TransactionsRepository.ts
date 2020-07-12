/* eslint-disable no-param-reassign */
import { getRepository, Repository } from 'typeorm';

import ITransactionRepository from '@modules/transactions/repositories/ITransactionRepository';
import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';

import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import IBalanceDTO from '@modules/transactions/dtos/IBalanceDTO';

class TransactionsRepository implements ITransactionRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async findAllTransactionByUser(
    user_id: string,
  ): Promise<Transaction[]> {
    const transactions = this.ormRepository.find({
      where: { user_id },
    });

    return transactions;
  }

  public async getBalance(user_id: string): Promise<IBalanceDTO> {
    const transactions = await this.ormRepository.find({
      where: { user_id },
    });

    const { income, outcome } = transactions.reduce(
      (accumalator, transaction) => {
        switch (transaction.type) {
          case 'income':
            accumalator.income += Number(transaction.value);
            break;
          case 'outcome':
            accumalator.outcome += Number(transaction.value);
            break;
          default:
            break;
        }

        return accumalator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    return { income, outcome, total };
  }

  public async create({
    user_id,
    title,
    category_id,
    type,
    value,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = this.ormRepository.create({
      title,
      type,
      value,
      category_id,
      user_id,
    });

    await this.ormRepository.save(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
