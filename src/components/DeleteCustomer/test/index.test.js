import DeleteCustomerDefault from '../DeleteCustomer';
import DeleteCustomer, { DeleteCustomerContainer } from '../index';
import DeleteCustomerContainerDefault from '../DeleteCustomerContainer';

jest.mock('../DeleteCustomer', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../DeleteCustomerContainer', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('DeleteCustomer Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the main component', () => {
    DeleteCustomerDefault();
    expect(DeleteCustomer).toHaveBeenCalled();
  });
  it('Should export the container', () => {
    DeleteCustomerContainerDefault();
    expect(DeleteCustomerContainer).toHaveBeenCalled();
  });
});
