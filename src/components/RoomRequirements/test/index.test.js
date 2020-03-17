import RoomRequirementsDefault from '../RoomRequirements';
import RoomRequirements from '../index';

jest.mock('../RoomRequirements', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('RoomRequirements Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the main component', () => {
    RoomRequirementsDefault();
    expect(RoomRequirements).toHaveBeenCalledTimes(1);
  });
});
