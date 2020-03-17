import MoveAccount from '..';
import MoveAccountContainer from '../MoveAccountContainer';

jest.mock('../MoveAccount', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('../MoveAccountContainer', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('MoveAccount Component interface', () => {
  it('Should export the main component', () => {
    MoveAccount();
    expect(MoveAccountContainer).toHaveBeenCalled();
  });
});
