import RegularGuestsDefault from '../RegularGuests';
import RegularGuests, { RegularGuestsContainer } from '../index';
import RegularGuestsContainerDefault from '../RegularGuestsContainer';

jest.mock('../RegularGuests', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('../RegularGuestsContainer', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('RegularGuests Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the main component', () => {
    RegularGuestsDefault();
    expect(RegularGuests).toHaveBeenCalled();
  });
  it('Should export the container', () => {
    RegularGuestsContainerDefault();
    expect(RegularGuestsContainer).toHaveBeenCalled();
  });
});
