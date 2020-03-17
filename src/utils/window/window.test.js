import { getHost } from './index';

describe('Window utilities', () => {
  it('should get the Host', () => {
    expect(getHost()).toBe('localhost');
  });
});
