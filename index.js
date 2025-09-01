const { ucidGenerateId } = require('./utils.js');

/**
 * Generates a customizable ID string using shuffled octets.
 *
 * @param {Object} [options={}] - Configuration options for ID generation.
 * @param {number} [options.octets=4] - Number of octets in the ID.
 * @param {number} [options.octetLength=8] - Default length of each octet.
 * @param {string|Array} [options.octetFormat=''] - Custom format for octet lengths.
 * @param {boolean} [options.uppercase=false] - Include uppercase letters.
 * @param {boolean} [options.lowercase=true] - Include lowercase letters.
 * @param {boolean} [options.symbols=false] - Include symbols.
 * @param {boolean} [options.numbers=true] - Include numeric characters.
 * @param {string} [options.octetSeparator='-'] - Separator between octets.
 * @param {string|null} [options.includeOnly=null] - Override character set with a custom string.
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
  }
) {
  return ucidGenerateId(options);
}

module.exports = ucid;
