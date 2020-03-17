import RoomRequirementsFormContainerDefault from '../RoomRequirementsFormContainer';
import RoomRequirementsFormContainer from '../index';

jest.mock('../RoomRequirementsFormContainer', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('RoomRequirementsFormContainer Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Should export the main component', () => {
    RoomRequirementsFormContainerDefault();
    expect(RoomRequirementsFormContainer).toHaveBeenCalledTimes(1);
  });
});
