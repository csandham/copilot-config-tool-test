const { reverseString, factorial, flatten, groupBy, isPalindrome, clamp, sum } = require('../utils');

describe('reverseString', () => {
  test('reverses a string', () => {
    expect(reverseString('hello')).toBe('olleh');
  });

  test('handles empty string', () => {
    expect(reverseString('')).toBe('');
  });
});

describe('factorial', () => {
  test('returns 1 for 0', () => {
    expect(factorial(0)).toBe(1);
  });

  test('returns 120 for 5', () => {
    expect(factorial(5)).toBe(120);
  });

  test('throws on negative input', () => {
    expect(() => factorial(-1)).toThrow(RangeError);
  });
});

describe('flatten', () => {
  test('flattens nested arrays', () => {
    expect(flatten([1, [2, [3, 4]], 5])).toEqual([1, 2, 3, 4, 5]);
  });

  test('returns flat array unchanged', () => {
    expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
  });
});

describe('groupBy', () => {
  test('groups objects by key', () => {
    const data = [{ type: 'a', v: 1 }, { type: 'b', v: 2 }, { type: 'a', v: 3 }];
    expect(groupBy(data, 'type')).toEqual({
      a: [{ type: 'a', v: 1 }, { type: 'a', v: 3 }],
      b: [{ type: 'b', v: 2 }],
    });
  });
});

describe('isPalindrome', () => {
  test('detects palindrome', () => {
    expect(isPalindrome('racecar')).toBe(true);
  });

  test('ignores case and non-alphanumeric characters', () => {
    expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
  });

  test('returns false for non-palindrome', () => {
    expect(isPalindrome('hello')).toBe(false);
  });
});

describe('clamp', () => {
  test('clamps value below min', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  test('clamps value above max', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  test('returns value within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });
});
