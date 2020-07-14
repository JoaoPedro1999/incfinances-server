import { Router } from 'express';
import usersRoter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import balanceRouter from '@modules/transactions/infra/http/routes/balance.routes';
import transactionsRouter from '@modules/transactions/infra/http/routes/transactions.routes';

const routes = Router();

routes.get('/', (Request, Response) => {
  return Response.json({ message: 'Hello Incca' });
});
routes.use('/users', usersRoter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/balance', balanceRouter);
routes.use('/transactions', transactionsRouter);

export default routes;
