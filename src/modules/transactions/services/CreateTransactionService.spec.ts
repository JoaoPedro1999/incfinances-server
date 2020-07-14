import AppError from '@shared/errors/AppError';

import FakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';
import CreateTransactionService from './CreateTransactionService';
import FakeTransactionRepository from '../repositories/fakes/FakeTransactionRepository';

let createTransactionService: CreateTransactionService;
let fakeCategoriesRepository: FakeCategoriesRepository;
let fakeTransactionRepository: FakeTransactionRepository;

describe('CreateTransaction', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    fakeTransactionRepository = new FakeTransactionRepository();

    createTransactionService = new CreateTransactionService(
      fakeTransactionRepository,
      fakeCategoriesRepository,
    );
  });

  it('should be able to create a new transaction', async () => {
    const transaction = await createTransactionService.execute({
      title: 'Notebook',
      category: 'Eletonicos',
      type: 'income',
      value: 2700,
      user_id: '123489419194598491894',
    });

    expect(transaction).toHaveProperty('id');
  });

  it('should not be able to create a new transaction greather than yout balance', async () => {
    await createTransactionService.execute({
      title: 'Salary',
      category: 'Salary',
      type: 'income',
      value: 2000,
      user_id: '123489419194598491894',
    });

    await expect(
      createTransactionService.execute({
        title: 'Notebook',
        category: 'Eletronicos',
        type: 'outcome',
        value: 4500,
        user_id: '123489419194598491894',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
