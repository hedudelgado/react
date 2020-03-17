import ExtrasPreferencesDefault from '../ExtrasPreferences';
import ExtrasPreferences from '../index';

jest.mock('../ExtrasPreferences', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('ExtrasPreferences Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the main component', () => {
    ExtrasPreferencesDefault();
    expect(ExtrasPreferences).toHaveBeenCalledTimes(1);
  });
});
