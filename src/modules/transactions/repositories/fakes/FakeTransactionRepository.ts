/* eslint-disable no-param-reassign */
import ITransactionRepository from '@modules/transactions/repositories/ITransactionRepository';
import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';

import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import IBalanceDTO from '@modules/transactions/dtos/IBalanceDTO';
import { uuid } from 'uuidv4';

class FakeTransactionRepository implements ITransactionRepository {
  private transactions: Transaction[];

  public async findAllTransactionByUser(
    user_id: string,
  ): Promise<Transaction[]> {
    const transactions = this.transactions.filter(
      transaction => transaction.user_id === user_id,
    );

    return transactions;
  }

  public async getBalance(): Promise<IBalanceDTO> {
    const balanceTotal = this.transactions.reduce<IBalanceDTO>(
      (balance, transaction) => {
        if (transaction.type === 'income') {
          return {
            ...balance,
            income: balance.income + transaction.value,
            total: balance.total + transaction.value,
          };
        }
        return {
          ...balance,
          outcome: balance.outcome + transaction.value,
          total: balance.total - transaction.value,
        };
      },
      { income: 0, outcome: 0, total: 0 },
    );

    return balanceTotal;
  }

  public async create({
    user_id,
    title,
    category_id,
    type,
    value,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = new Transaction();

    transaction.id = uuid();
    transaction.category_id = category_id;
    transaction.user_id = user_id;
    transaction.title = title;
    transaction.type = type;
    transaction.value = value;

    this.transactions.push(transaction);

    return transaction;
  }
}

export default FakeTransactionRepository;
