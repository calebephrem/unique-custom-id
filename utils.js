const crypto = require('crypto');

/**
 * Shuffles the characters in a string using the Fisher-Yates algorithm.
 *
 * @function
 * @param {string} str - The input string to shuffle.
 * @returns {string} - The shuffled string. Returns an empty string if input is invalid.
 *
 * @example
 * shuffleStr('hello'); // -> "loelh"
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
 * Returns a formatted timestamp string using a custom format.
 *
 * Supported tokens:
 * - yyyy: Full year (e.g., 2025)
 * - yy: Two-digit year (e.g., 25)
 * - mm: Month (01-12)
 * - dd: Day of the month (01-31)
 * - hh: Hours (00-23)
 * - min: Minutes (00-59)
 * - ss: Seconds (00-59)
 * - ms: Milliseconds (two-digit)
 * - unix: Unix timestamp (seconds)
 * - iso: ISO string
 *
 * @function
 * @param {string} [format='yyyymmdd'] - Format string using supported tokens.
 * @returns {string} - Formatted timestamp string.
 *
 * @example
 * timeStamp('yyyy-mm-dd_hh:min:ss'); // -> "2025-09-04_18:40:22"
 */
function timeStamp(format = 'yyyymmdd') {
  const now = new Date();
  const pad = (n, len = 2) => n.toString().padStart(len, '0');

  const replacements = {
    yyyy: now.getFullYear(),
    yy: now.getFullYear().toString().slice(-2),
    mm: pad(now.getMonth() + 1),
    dd: pad(now.getDate()),
    hh: pad(now.getHours()),
    min: pad(now.getMinutes()),
    ss: pad(now.getSeconds()),
    ms: pad(Math.floor(now.getMilliseconds() / 10)),
    epoch: Math.floor(now.getTime() / 1000),
    unix: Math.floor(now.getTime() / 1000),
    military: `${now.getHours().toString().padStart(2, '0')}${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`,
    iso: now.toISOString(),
    utc: `${now.getUTCFullYear()}-${(now.getUTCMonth() + 1)
      .toString()
      .padStart(2, '0')}-${now.getUTCDate().toString().padStart(2, '0')}T${now
      .getUTCHours()
      .toString()
      .padStart(2, '0')}:${now
      .getUTCMinutes()
      .toString()
      .padStart(2, '0')}:${now.getUTCSeconds().toString().padStart(2, '0')}Z`,

    rfc: `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}T${now
      .getHours()
      .toString()
      .padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now
      .getSeconds()
      .toString()
      .padStart(2, '0')}${(() => {
      const offset = -now.getTimezoneOffset();
      const sign = offset >= 0 ? '+' : '-';
      const hh = Math.floor(Math.abs(offset) / 60)
        .toString()
        .padStart(2, '0');
      const mm = (Math.abs(offset) % 60).toString().padStart(2, '0');
      return `${sign}${hh}:${mm}`;
    })()}`,
    rfc3339: `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}T${now
      .getHours()
      .toString()
      .padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now
      .getSeconds()
      .toString()
      .padStart(2, '0')}${(() => {
      const offset = -now.getTimezoneOffset();
      const sign = offset >= 0 ? '+' : '-';
      const hh = Math.floor(Math.abs(offset) / 60)
        .toString()
        .padStart(2, '0');
      const mm = (Math.abs(offset) % 60).toString().padStart(2, '0');
      return `${sign}${hh}:${mm}`;
    })()}`,
    filetime: now.getTime() * 10000 + 116444736000000000,
    winft: now.getTime() * 10000 + 116444736000000000,
  };

  return format.replace(
    /yyyy|yy|mm|dd|hh|min|ss|ms|unix|epoch|military|iso|utc|rfc|filetime|winft/g,
    (token) => replacements[token] ?? token
  );
}

/**
 * Resolves the length of an octet at a specific index based on the format input.
 *
 * Accepts array format: [4, 6, 8]
 * Or string format with separator: "4-6-8"
 *
 * @function
 * @param {string|Array<number>} octetFormat - Format definition.
 * @param {number} i - Index of the current octet.
 * @param {number} defaultLen - Fallback length if not specified.
 * @param {string} sep - Separator (e.g., "-") for string format.
 * @returns {number} - The resolved length.
 *
 * @example
 * resolveFormat([4, 6, 8], 1, 8, '-') // -> 6
 * resolveFormat("4-6-8", 2, 8, '-')  // -> 8
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
 * Securely picks a random character from a given charset using crypto.
 *
 * @function
 * @param {string} charset - A string of allowed characters.
 * @returns {string} - A single character from the charset.
 *
 * @example
 * secureRandChar('abc123'); // -> "1"
 */
function secureRandChar(charset) {
  const byte = crypto.randomBytes(1)[0];
  return charset[byte % charset.length];
}

/**
 * @module utils
 * @description Utility functions used in UCID generation.
 */
module.exports = {
  shuffleStr,
  resolveFormat,
  secureRandChar,
  timeStamp,
};
