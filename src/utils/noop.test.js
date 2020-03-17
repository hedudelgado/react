import noop from './noop';

describe('Noop', () => {
  it('should return undefined', () => {
    expect(noop()).toEqual(undefined);
  });
});
