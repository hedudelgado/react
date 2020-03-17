import PaymentCardFormContainer from '../index';
import PaymentCardFormContainerDefault from '../PaymentCardFormContainer';

jest.mock('../PaymentCardFormContainer', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('PaymentForm Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the main component', () => {
    PaymentCardFormContainer();
    expect(PaymentCardFormContainerDefault).toHaveBeenCalled();
  });
});
