import AddRegularGuestDefault from '../AddRegularGuest';
import AddRegularGuest from '../index';

jest.mock('../AddRegularGuest', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('AddRegularGuest Component Interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the main component', () => {
    AddRegularGuestDefault();
    expect(AddRegularGuest).toHaveBeenCalled();
  });
});
