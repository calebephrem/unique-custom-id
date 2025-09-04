const ucidGenerateId = require('./ucid.core.js');

/**
 * A wrapper around `ucidGenerateId()` that generates customizable, shuffled, optionally timestamped IDs.
 *
 * @function
 * @param {Object} [options={}] - Configuration options for ID generation.
 * @param {number} [options.octets=4] - Number of octets (segments) in the ID.
 * @param {number} [options.octetLength=8] - Default length of each octet if format not provided.
 * @param {string|Array<number>} [options.octetFormat=''] - Custom length for each octet, e.g., "4-6-8" or [4, 6, 8].
 * @param {boolean} [options.uppercase=false] - Include uppercase A–Z characters.
 * @param {boolean} [options.lowercase=true] - Include lowercase a–z characters.
 * @param {boolean} [options.symbols=false] - Include special characters (e.g., !@#$%).
 * @param {boolean} [options.numbers=true] - Include numeric characters 0–9.
 * @param {string} [options.octetSeparator='-'] - Separator string between octets.
 * @param {string|null} [options.includeOnly=null] - Override charset with custom string (disables other charset flags).
 * @param {string|null} [options.timestamp=null] - Include timestamp as 'prefix', 'suffix', etc.
 * @param {string|null} [options.timestampFormat=null] - Timestamp format string (e.g., 'yyyy-mm-dd').
 * @param {string|null} [options.template=null] - If provided, uses `%id` and `%ts` placeholders to build final ID.
 * @param {string} [options.prefix=''] - Optional string to prepend to final ID.
 * @param {string} [options.suffix=''] - Optional string to append to final ID.
 * @param {boolean} [options.verbose=false] - If true, returns object with metadata (`{ ucid, ...options }`).
 * @param {number} [options.instances=1] - Number of IDs to generate.
 * @param {(octet: string, index: number) => string} [options.customize=null] - Function to transform each octet before joining.
 * @returns {string|string[]|Object|Object[]} - Generated ID(s), or metadata object(s) if `verbose` is true.
 *
 * @example
 * ucid(); // "a1b2c3d4-e5f6g7h8-i9j0k1l2-m3n4o5p6"
 */
function ucid(options = {}) {
  return ucidGenerateId(options);
}

module.exports = ucid;
