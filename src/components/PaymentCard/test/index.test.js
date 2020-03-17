import PaymentCardDefault from '../PaymentCard';
import PaymentCardContainerDefault from '../PaymentCardContainer';
import PaymentCard, { PaymentCardContainer } from '../index';

jest.mock('../PaymentCard', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('../PaymentCardContainer', () => ({
  __esModule: true,
  default: jest.fn(),
}));


describe('PaymentCard Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the main component', () => {
    PaymentCardDefault();
    expect(PaymentCard).toHaveBeenCalled();
  });
  it('Should export PaymentCardContainer', () => {
    PaymentCardContainerDefault();
    expect(PaymentCardContainer).toHaveBeenCalled();
  });
});
