import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowUserBalanceService from '@modules/transactions/services/ShowUserBalanceService';

export default class BalanceController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showUserBalanceService = container.resolve(ShowUserBalanceService);

    const balance = await showUserBalanceService.execute({
      user_id,
    });

    return response.json(balance);
  }
}
