const crypto = require('crypto');

/**
 * Returns a formatted timestamp string using a custom format.
 * @param {string} [format='yyyymmdd']
 * @returns {string}
 */
function timeStamp(format = 'yyyymmdd') {
  const now = new Date();
  const pad = (n, len = 2) => String(n).padStart(len, '0');
  const tzOffset = () => {
    const off = -now.getTimezoneOffset();
    const sign = off >= 0 ? '+' : '-';
    const hh = pad(Math.floor(Math.abs(off) / 60));
    const mm = pad(Math.abs(off) % 60);
    return `${sign}${hh}:${mm}`;
  };

  const replacements = {
    yyyy: now.getFullYear(),
    yy: String(now.getFullYear()).slice(-2),
    mm: pad(now.getMonth() + 1),
    dd: pad(now.getDate()),
    hh: pad(now.getHours()),
    min: pad(now.getMinutes()),
    ss: pad(now.getSeconds()),
    ms: pad(Math.floor(now.getMilliseconds() / 10)),
    unix: Math.floor(now.getTime() / 1000),
    epoch: Math.floor(now.getTime() / 1000),
    military: `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`,
    iso: now.toISOString(),
    utc: now.toISOString().replace(/\.\d+Z$/, 'Z'),
    rfc: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}${tzOffset()}`,
    rfc3339: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}${tzOffset()}`,
    filetime: now.getTime() * 10000 + 116444736000000000,
    winft: now.getTime() * 10000 + 116444736000000000,
  };

  return format.replace(
    /yyyy|yy|mm|dd|hh|min|ss|ms|unix|epoch|military|iso|utc|rfc|rfc3339|filetime|winft/g,
    t => replacements[t] ?? t
  );
}

/**
 * Resolves the length of an octet at a specific index based on the format.
 * @param {string|Array<number>} octetFormat
 * @param {number} i
 * @param {number} defaultLen
 * @param {string} sep
 * @returns {number}
 */
function resolveFormat(octetFormat, i, defaultLen, sep) {
  if (Array.isArray(octetFormat)) return +octetFormat[i] || defaultLen;
  const str = String(octetFormat);
  if (str.includes(sep)) return +str.split(sep)[i] || defaultLen;
  return +str[i] || defaultLen;
}

/**
 * Securely picks a random character from a given charset.
 * @param {string} charset
 * @returns {string}
 */
const secureRandChar = charset => charset[crypto.randomBytes(1)[0] % charset.length];

module.exports = { timeStamp, resolveFormat, secureRandChar };
