import {
  getJsonItem,
  getItem,
  setItem,
  clear,
} from '.';

describe('Session Storage', () => {
  beforeEach(() => {
    sessionStorage.clear();
    jest.resetAllMocks();
    sessionStorage.setItem.mockClear();
  });

  it('Should set an item in the sessionStorage', () => {
    setItem('what', 'is this');
    expect(sessionStorage.setItem).toHaveBeenCalledWith('what', JSON.stringify('is this'));
  });

  it('Should return a JSON item from sessionStorage', () => {
    getJsonItem('what');
    expect(sessionStorage.getItem).toHaveBeenCalledWith('what');
  });

  it('should return an item from sessionStorage', () => {
    getItem('what');
    expect(sessionStorage.getItem).toHaveBeenCalledWith('what');
  });

  it('Should empty the sessionStorage', () => {
    clear();
    expect(sessionStorage.clear).toHaveBeenCalled();
  });
});
