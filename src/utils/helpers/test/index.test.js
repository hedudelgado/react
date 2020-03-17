import { isBase64 } from '..';

describe('Helper functions', () => {
  describe('isBase64', () => {
    it('should return false for a given empty input', () => {
      expect(isBase64('')).toBe(false);
    });

    it('should return false for a white space input', () => {
      expect(isBase64('    ')).toBe(false);
    });

    it('should return false for a non-Base64 encoded input', () => {
      expect(isBase64('Whitbread')).toBe(false);
    });

    it('should return true for a Base64 encoded input', () => {
      const legitToken = btoa('Whitbread');
      expect(isBase64(legitToken)).toBe(true);
    });
  });
});
