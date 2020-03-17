import RegularGuestsFormContainerDefault from '../RegularGuestsFormContainer';
import RegularGuestsFormContainer from '../index';

jest.mock('../RegularGuestsFormContainer', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('RegularGuestsFormContainer Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the main component', () => {
    RegularGuestsFormContainerDefault();
    expect(RegularGuestsFormContainer).toHaveBeenCalled();
  });
});
