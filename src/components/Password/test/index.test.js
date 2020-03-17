import PasswordDefault from '../Password';
import Password from '../index';

jest.mock('../Password', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Password Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the main component', () => {
    PasswordDefault();
    expect(Password).toHaveBeenCalled();
  });
});
