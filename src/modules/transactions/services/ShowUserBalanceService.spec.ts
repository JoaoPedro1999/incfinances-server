import ShowUserBalanceService from './ShowUserBalanceService';
import FakeTransactionRepository from '../repositories/fakes/FakeTransactionRepository';

let showUserBalanceService: ShowUserBalanceService;
let fakeTransactionRepository: FakeTransactionRepository;

describe('ShowUserBalance', () => {
  beforeEach(() => {
    fakeTransactionRepository = new FakeTransactionRepository();

    showUserBalanceService = new ShowUserBalanceService(
      fakeTransactionRepository,
    );
  });

  it('should be able to show yout balance', async () => {
    await fakeTransactionRepository.create({
      title: 'Salary',
      category_id: 'wdb3yibvyi3ifc2354f9428+9',
      type: 'income',
      value: 4000,
      user_id: '123489419194598491894',
    });

    await fakeTransactionRepository.create({
      title: 'Notebook',
      category_id: 'wv3rv3rv4mpfniou9ob',
      type: 'outcome',
      value: 2700,
      user_id: '123489419194598491894',
    });

    await fakeTransactionRepository.create({
      title: 'Salary',
      category_id: 'scsscswevc24vc',
      type: 'income',
      value: 4000,
      user_id: '123489419194598491894',
    });

    await fakeTransactionRepository.create({
      title: 'Bike',
      category_id: '121256165468165416',
      type: 'outcome',
      value: 5000,
      user_id: '123489419194598491894',
    });

    const userBalance = await showUserBalanceService.execute({
      user_id: '123489419194598491894',
    });

    expect(userBalance).toHaveProperty('total');
    expect(userBalance).toHaveProperty('income');
    expect(userBalance).toHaveProperty('outcome');
  });
});
