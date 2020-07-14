import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import TransactionController from '../controllers/TransactionController';

const transactionRouter = Router();
const transactionController = new TransactionController();

transactionRouter.use(ensureAuthenticated);

transactionRouter.get('/', transactionController.show);

transactionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      category: Joi.string().required(),
      type: Joi.string().required(),
      value: Joi.number().required(),
    },
  }),
  transactionController.create,
);

export default transactionRouter;
