const ucidGenerateId = require('./ucid.core.js');

/**
 * Generates a customizable and optionally verbose Unique Custom ID (UCID).
 *
 * @function
 * @param {Object} [options={}] - Configuration options for generating the ID(s).
 * @param {number} [options.octets=4] - Number of octets in the ID (must be > 0).
 * @param {number} [options.octetLength=8] - Default length of each octet.
 * @param {string|Array<number>} [options.octetFormat=''] - Custom format for octet lengths, e.g., [4,6,8] or "4-6-8".
 * @param {boolean} [options.uppercase=false] - Whether to include uppercase A–Z characters.
 * @param {boolean} [options.lowercase=true] - Whether to include lowercase a–z characters.
 * @param {boolean} [options.numbers=true] - Whether to include digits 0–9.
 * @param {boolean} [options.symbols=false] - Whether to include symbols (e.g., !@#$%).
 * @param {string} [options.octetSeparator='-'] - Separator string between octets.
 * @param {string|null} [options.includeOnly=null] - If defined, overrides all character sets with a custom one.
 * @param {string|null} [options.timestamp=null] - If set to 'prefix' or 'suffix', includes a timestamp in the ID.
 * @param {string|null} [options.timestampFormat=null] - Custom format for the timestamp (e.g., 'yyyy-mm-dd').
 * @param {string|null} [options.template=null] - If set, will use template instead of octet structure. Use `%id` and `%ts`.
 * @param {string} [options.prefix=''] - Optional string to prepend before the generated ID.
 * @param {string} [options.suffix=''] - Optional string to append after the generated ID.
 * @param {boolean} [options.verbose=false] - If true, returns metadata including the ID and resolved options.
 * @param {number} [options.instances=1] - Number of IDs to generate (≥1).
 * @param {(resolve: Function, reject: Function) => void} [options.condition=null] - Optional function that must call resolve() to allow ID generation, or reject(message) to block it.

 * @param {(octet: string, index: number) => string} [options.customize=null] - Optional function to modify each octet before joining.
 * @returns {string|Object|Array<string|Object>} - Returns the generated ID string(s), or verbose object(s) if `verbose` is true.
 *
 * @example
 * ucidGenerateId(); // -> "ac1d2f3e-d4e5f6g7-h8i9j0k1-l2m3n4o5"
 */
function ucid(options = {}) {
  return ucidGenerateId(options);
}

module.exports = ucid;
