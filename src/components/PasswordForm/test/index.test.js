import PasswordFormContainerDefault from '../PasswordFormContainer';
import PasswordFormContainer from '../index';

jest.mock('../PasswordFormContainer', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('PasswordFormContainer Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the main component', () => {
    PasswordFormContainerDefault();
    expect(PasswordFormContainer).toHaveBeenCalled();
  });
});
