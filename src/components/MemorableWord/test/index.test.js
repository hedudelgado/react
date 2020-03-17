import MemorableWord from '..';
import MemorableWordContainer from '../MemorableWordContainer';

jest.mock('../MemorableWord', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('../MemorableWordContainer', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('MemorableWord Component interface', () => {
  it('Should export the main component', () => {
    MemorableWord();
    expect(MemorableWordContainer).toHaveBeenCalled();
  });
});
