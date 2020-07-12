import Transaction from '../infra/typeorm/entities/Transaction';
import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import IBalanceDTO from '../dtos/IBalanceDTO';

export default interface ITransactionRepository {
  findAllTransactionByUser(user_id: string): Promise<Transaction[]>;
  create(data: ICreateTransactionDTO): Promise<Transaction>;
  getBalance(user_id: string): Promise<IBalanceDTO>;
}
