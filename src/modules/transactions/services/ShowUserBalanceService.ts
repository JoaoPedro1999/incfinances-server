import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import ITransactionsRepository from '../repositories/ITransactionsRepository';

interface Request {
  user_id: string;
}

interface Response {
  total: number;
  income: number;
  outcome: number;
}

@injectable()
class ShowUserBalanceService {
  constructor(
    @inject('TransactionsRepository')
    private transactionRepository: ITransactionsRepository,
  ) {}

  public async execute({ user_id }: Request): Promise<Response | null> {
    const userBalance = this.transactionRepository.getBalance(user_id);

    return userBalance;
  }
}

export default ShowUserBalanceService;
