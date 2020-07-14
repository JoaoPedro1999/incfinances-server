import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import Transaction from '../infra/typeorm/entities/Transaction';

import ITransactionsRepository from '../repositories/ITransactionsRepository';

interface Request {
  user_id: string;
}

@injectable()
class ShowUserTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionRepository: ITransactionsRepository,
  ) {}

  public async execute({ user_id }: Request): Promise<Transaction[] | null> {
    const userTransaction = this.transactionRepository.findAllTransactionByUser(
      user_id,
    );

    return userTransaction;
  }
}

export default ShowUserTransactionsService;
