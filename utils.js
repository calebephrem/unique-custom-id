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
 * Selects a random character from a given string pool.
 * @param {string} pool - A string containing characters to choose from.
 * @returns {string} A single randomly selected character.
 */
function randChar(pool) {
  return pool[Math.floor(Math.random() * pool.length)];
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

module.exports = { shuffleStr, resolveFormat, randChar };
