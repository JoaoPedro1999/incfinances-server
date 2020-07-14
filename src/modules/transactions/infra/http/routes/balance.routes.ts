import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import BalanceController from '../controllers/BalanceController';

const balanceRouter = Router();
const balanceController = new BalanceController();

balanceRouter.use(ensureAuthenticated);

balanceRouter.get('/', balanceController.show);

export default balanceRouter;
