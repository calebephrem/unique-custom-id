const { shuffleStr, resolveFormat, secureRandChar, timeStamp } = require('./utils.js');

/**
 * Generates a customizable ID string using shuffled octets.
 *
 * @param {Object} [options={}] - Configuration options for ID generation.
 * 
 * @param {number} [options.octets=4] - Number of octets in the ID.
 * @param {number} [options.octetLength=8] - Default length of each octet.
 * @param {string|Array} [options.octetFormat=''] - Custom format for octet lengths (e.g., [4, 6, 8]).
 * @param {number} [options.count=1] - Number of IDs to generate.
 * @param {boolean} [options.uppercase=false] - Include uppercase letters (A–Z).
 * @param {boolean} [options.lowercase=true] - Include lowercase letters (a–z).
 * @param {boolean} [options.symbols=false] - Include symbols (!@#$%, etc.).
 * @param {boolean} [options.numbers=true] - Include numeric characters (0–9).
 * @param {string} [options.octetSeparator='-'] - Separator between octets.
 * @param {string|null} [options.includeOnly=null] - Override character set with a custom string.
 * @param {string|null} [options.timestamp=null] - Include timestamp in the id, either 'prefix' or 'suffix'.
 * @param {string|null} [options.timestampFormat=null] - The format of the timestamp in the id.
 * @param {string|null} [options.template=null] - Generate an id with specific template.
 * @param {string} [options.prefix=''] - Optional string to prepend to the generated ID.
 * @param {string} [options.suffix=''] - Optional string to append to the generated ID.
 * @param {boolean} [options.verbose=false] - Return the whole options object instead of id string
 * @param {(octet: string, index: number) => string} [options.customize] - Function to customize each octet
 * @returns {string} - The generated ID string.
 */
function ucidGenerateId(options = {}) {
  const defaults = {
    octets: 4,
    uppercase: false,
    lowercase: true,
    octetLength: 8,
    octetFormat: '',
    instances: 1,
    numbers: true,
    octetSeparator: '-',
    symbols: false,
    includeOnly: null,
    timestamp: null,
    timestampFormat: null,
    template: null,
    prefix: '',
    suffix: '',
    verbose: false,
    customize: null,
  };

  const {
    octets = 4,
    uppercase = false,
    lowercase = true,
    octetLength = 8,
    octetFormat = '',
    instances = 1,
    numbers = true,
    octetSeparator = '-',
    symbols = false,
    includeOnly = null,
    timestamp = null,
    timestampFormat = null,
    template = null,
    prefix = '',
    suffix = '',
    verbose = false,
    customize = null,
  } = options;

  if (octets <= 0) throw new Error('Octets must be greater than 0');
  if (octetLength <= 0) throw new Error('OctetLength must be greater than 0');

  const charset =
    includeOnly ||
    [
      uppercase && 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase && 'abcdefghijklmnopqrstuvwxyz',
      numbers && '0123456789',
      symbols && '!#$%&',
    ]
      .filter(Boolean)
      .join('');

  if (!charset) throw new Error('Character set is empty. Adjust your options.');

  const generateId = () => {
    const ids = Array.from({ length: octets }, (_, i) => {
      const len = resolveFormat(octetFormat, i, octetLength, octetSeparator);
      const raw = Array.from({ length: len }, () =>
        secureRandChar(charset)
      ).join('');
      const octet = shuffleStr(shuffleStr(raw));
      return typeof customize === 'function' ? customize(octet, i) : octet;
    });
    return `${prefix}${
      ['prefix', 'p', 'pre', 'pref'].includes(timestamp)
        ? timeStamp(timestampFormat) + octetSeparator
        : ''
    }${ids.join(octetSeparator)}${
      ['suffix', 's', 'suf', 'suff'].includes(timestamp)
        ? octetSeparator + timeStamp(timestampFormat)
        : ''
    }${suffix}`;
  };

  if (typeof template === 'string') {
    const generateTemplated = () =>
      template
        .replace(/%id/g, () => generateId())
        .replace(/%ts/g, () => timeStamp(timestampFormat));

    return instances > 1
      ? Array.from({ length: instances }, () => generateTemplated())
      : generateTemplated();
  }

  if (verbose) {
    const generateVerbose = () => ({
      ucid: generateId(),
      ...defaults,
      ...options,
    });

    return instances > 1
      ? Array.from({ length: instances }, () => generateVerbose())
      : generateVerbose();
  }

  return instances > 1
    ? Array.from({ length: instances }, () => generateId())
    : generateId();
}

module.exports = ucidGenerateId;
