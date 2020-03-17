import UserProfileFormContainerDefault from '../UserProfileFormContainer';
import UserProfileFormContainer from '../index';

jest.mock('../UserProfileFormContainer', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('UserProfileFormContainer Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Should export the main component', () => {
    UserProfileFormContainerDefault();
    expect(UserProfileFormContainer).toHaveBeenCalledTimes(1);
  });
});
