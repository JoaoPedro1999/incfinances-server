import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTransactionService from '@modules/transactions/services/CreateTransactionService';
import ShowUserTransactionsService from '@modules/transactions/services/ShowUserTransactionsService';

export default class TransactionController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showUserTransactionsService = container.resolve(
      ShowUserTransactionsService,
    );

    const userTransaction = await showUserTransactionsService.execute({
      user_id,
    });

    return response.json(userTransaction);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, category, type, value } = request.body;
    const user_id = request.user.id;

    const createTransactionService = container.resolve(
      CreateTransactionService,
    );

    const transaction = await createTransactionService.execute({
      title,
      category,
      type,
      user_id,
      value,
    });

    return response.json(transaction);
  }
}
