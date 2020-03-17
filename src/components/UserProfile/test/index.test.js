import UserProfileDefault from '../UserProfile';
import UserProfile from '../index';

jest.mock('../UserProfile', () => ({
  __esModule: true,
  default: jest.fn(),
}));
describe('UserProfile Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the main component', () => {
    UserProfileDefault();
    expect(UserProfile).toHaveBeenCalled();
  });
});
