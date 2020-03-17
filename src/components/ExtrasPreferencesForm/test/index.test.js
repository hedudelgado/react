import ExtrasPreferencesFormContainerDefault from '../ExtrasPreferencesFormContainer';
import ExtrasPreferencesFormContainer from '../index';

jest.mock('../ExtrasPreferencesFormContainer', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('ExtrasPreferencesFormContainer Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the main component', () => {
    ExtrasPreferencesFormContainerDefault();
    expect(ExtrasPreferencesFormContainer).toHaveBeenCalledTimes(1);
  });
});
