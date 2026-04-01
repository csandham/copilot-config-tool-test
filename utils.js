// Utility functions for manual Copilot configuration tests.
// Select code from this file to test AMBER (generate) and QUARTZ (test generation).

/**
 * Reverses a string.
 */
function reverseString(str) {
  return str.split('').reverse().join('');
}

/**
 * Returns the factorial of a non-negative integer.
 */
function factorial(n) {
  if (n < 0) throw new RangeError('Negative input');
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Flattens a nested array to a single depth.
 */
function flatten(arr) {
  const result = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  }
  return result;
}

/**
 * Debounces a function call.
 */
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Groups an array of objects by a key.
 */
function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const group = item[key];
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});
}

/**
 * Checks if a string is a palindrome.
 */
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

/**
 * Clamps a number between a min and max.
 */
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Returns the sum of two numbers.
 */
function sum(a, b) {
  return a + b;
}

module.exports = {
  reverseString,
  factorial,
  flatten,
  debounce,
  groupBy,
  isPalindrome,
  clamp,
  sum,
};
