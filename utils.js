const crypto = require('crypto');

/**
 * Shuffles the characters in a string using the Fisher-Yates algorithm.
 * @param {string} str - The string to shuffle.
 * @returns {string} - The shuffled string. Returns an empty string if input is invalid.
 */
function shuffleStr(str) {
  if (typeof str !== 'string') {
    console.error(`Error: ${str} is not a string`);
    return '';
  }

  const arr = [...str];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

/**
 * Resolves the length of an octet based on format input.
 * @param {string|Array} octetFormat - Format string or array defining octet lengths.
 * @param {number} i - Index of the current octet.
 * @param {number} defaultLen - Default length if format is invalid.
 * @param {string} sep - Separator used in format string.
 * @returns {number} The resolved length for the current octet.
 */
function resolveFormat(octetFormat, i, defaultLen, sep) {
  if (Array.isArray(octetFormat)) return Number(octetFormat[i]) || defaultLen;
  const formatStr = String(octetFormat);
  if (formatStr.includes(sep)) {
    const joined = formatStr.split(sep).join('');
    return Number(joined[i]) || defaultLen;
  }
  return Number(formatStr[i]) || defaultLen;
}

/**
 * Generates a cryptographically secure random character from a given charset.
 *
 * @param {string} charset - A string containing the set of characters to choose from.
 * @returns {string} A single character randomly selected from the charset.
 *
 * @example
 * const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
 * const char = secureRandChar(charset);
 * console.log(char); // e.g., "g"
 */

const secureRandChar = (charset) => {
  const byte = crypto.randomBytes(1)[0];
  return charset[byte % charset.length];
};

module.exports = { shuffleStr, resolveFormat, secureRandChar };
