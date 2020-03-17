import DeleteModal from '../DeleteModal';


jest.mock('../DeleteModal', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('DeleteModal Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the main component', () => {
    DeleteModal();
    expect(DeleteModal).toHaveBeenCalled();
  });
});
