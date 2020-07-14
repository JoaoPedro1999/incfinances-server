import ShowUserTransactionsService from './ShowUserTransactionsService';
import FakeTransactionRepository from '../repositories/fakes/FakeTransactionRepository';

let showUserTransactionsService: ShowUserTransactionsService;
let fakeTransactionRepository: FakeTransactionRepository;

describe('ShowUserTransactions', () => {
  beforeEach(() => {
    fakeTransactionRepository = new FakeTransactionRepository();

    showUserTransactionsService = new ShowUserTransactionsService(
      fakeTransactionRepository,
    );
  });

  it('should be able to list your transactions', async () => {
    const transaction = await fakeTransactionRepository.create({
      title: 'Notebook',
      category_id: 'wdb3yibvyi3ifc2354f9428+9',
      type: 'income',
      value: 2700,
      user_id: '123489419194598491894',
    });

    const transactionTwo = await fakeTransactionRepository.create({
      title: 'Notebook',
      category_id: 'wv3rv3rv4mpfniou9ob',
      type: 'income',
      value: 2700,
      user_id: '123489419194598491894',
    });

    const transactionThree = await fakeTransactionRepository.create({
      title: 'Notebook',
      category_id: 'scsscswevc24vc',
      type: 'income',
      value: 2700,
      user_id: '123489419194598491894',
    });

    const transactionFour = await fakeTransactionRepository.create({
      title: 'Notebook',
      category_id: '121256165468165416',
      type: 'income',
      value: 2700,
      user_id: '123489419194598491894',
    });

    const transactionUser = await showUserTransactionsService.execute({
      user_id: '123489419194598491894',
    });

    expect(transactionUser).toEqual([
      transaction,
      transactionTwo,
      transactionThree,
      transactionFour,
    ]);
  });
});
