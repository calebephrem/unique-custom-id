const { ucidGenerateId } = require('./utils.js');

/**
 * Generates a customizable ID string using shuffled octets.
 *
 * @param {Object} [options={}] - Configuration options for ID generation.
 * @param {number} [options.octets=4] - Number of octets in the ID.
 * @param {number} [options.octetLength=8] - Default length of each octet.
 * @param {string|Array} [options.octetFormat=''] - Custom format for octet lengths (e.g., [4, 6, 8]).
 * @param {boolean} [options.uppercase=false] - Include uppercase letters (A–Z).
 * @param {boolean} [options.lowercase=true] - Include lowercase letters (a–z).
 * @param {boolean} [options.symbols=false] - Include symbols (!@#$%, etc.).
 * @param {boolean} [options.numbers=true] - Include numeric characters (0–9).
 * @param {string} [options.octetSeparator='-'] - Separator between octets.
 * @param {string|null} [options.includeOnly=null] - Override character set with a custom string.
 * @param {string|null} [options.template=null] - Generate an id with specific template.
 * @param {string} [options.prefix=''] - Optional string to prepend to the generated ID.
 * @param {string} [options.suffix=''] - Optional string to append to the generated ID.
 * @param {boolean} [options.verbose=false] - Return the whole options object instead of id string
 * @param {(octet: string, index: number) => string} [options.customize] - Function to customize each octet
 * @returns {string} - The generated ID string.
 */
function ucid(
  options = {
    octets: 4,
    octetLength: 8,
    octetFormat: '',
    uppercase: false,
    lowercase: true,
    symbols: false,
    numbers: true,
    octetSeparator: '-',
    includeOnly: null,
    template: null,
    prefix: '',
    suffix: '',
    verbose: false,
    customize: null,
  }
) {
  return ucidGenerateId(options);
}

module.exports = ucid;
