const {
  resolveFormat,
  secureRandChar,
  timeStamp,
} = require('./utils');

/**
 * Generates a customizable and optionally verbose Unique Custom ID (UCID).
 *
 * @function
 * @param {Object} [options={}] - Configuration options for generating the ID(s).
 * @param {number} [options.octets=4] - Number of octets in the ID (must be > 0).
 * @param {number} [options.octetLength=8] - Default length of each octet.
 * @param {string|Array<number>} [options.octetFormat=''] - Custom format for octet lengths, e.g., [4,6,8] or "4-6-8".
 * @param {string|null} [options.idFormat=''] - Predefined ID format that sets multiple options.
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
function ucidGenerateId(options = {}) {
  const defaults = {
    octets: 4,
    uppercase: false,
    lowercase: true,
    octetLength: 8,
    octetFormat: '',
    idFormat: null,
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
    condition: null,
  };

  let {
    octets,
    uppercase,
    lowercase,
    octetLength,
    octetFormat,
    idFormat,
    instances,
    numbers,
    octetSeparator,
    symbols,
    includeOnly,
    timestamp,
    timestampFormat,
    template,
    prefix,
    suffix,
    verbose,
    customize,
    condition,
  } = { ...defaults, ...options };
  if (typeof condition === 'function') {
    let allowed = false;
    let error = null;

    condition(
      () => (allowed = true),
      (msg) => {
        allowed = false;
        error = msg || 'UCID condition rejected.';
      }
    );

    if (!allowed) {
      if (error instanceof Error) {
        throw error;
      }
      console.error(error);
      return;
    }
  }

  if (octets <= 0) throw new Error('Octets must be greater than 0');
  if (octetLength <= 0) throw new Error('OctetLength must be greater than 0');

  if (idFormat && typeof idFormat === 'string') {
    switch (idFormat.toLowerCase()) {
      case 'uuid':
      case 'uuidv4':
      case 'universal':
      case 'universal-id':
        octets = 5;
        octetFormat = [8, 4, 4, 4, 12];
        includeOnly = '1234567890abcdef';
        break;

      case 'sha':
      case 'sha1':
        octets = 5;
        octetSeparator = '';
        includeOnly = '1234567890abcdef';
        break;

      case 'sha256':
        octets = 8;
        octetSeparator = '';
        includeOnly = '1234567890abcdef';
        break;

      case 'object':
      case 'objectid':
      case 'object-id':
        octets = 3;
        octetFormat = [8, 4, 8];
        includeOnly = '1234567890abcdef';
        octetSeparator = '';
        break;

      case 'ulid':
        octets = 2;
        octetLength = 13;
        lowercase = false;
        uppercase = true;
        octetSeparator = '';
        break;

      case 'nanoid':
      case 'nano-id':
      case 'nano':
        octets = 1;
        octetLength = 21;
        uppercase = true;
        octetSeparator = '';
        break;

      case 'ksuid':
        octets = 1;
        octetLength = 27;
        uppercase = true;
        octetSeparator = '';
        break;

      case 'cuid':
        octets = 3;
        octetSeparator = '';
        prefix = 'c';
        break;

      case 'snowflake':
      case 'snowflake-id':
        octets = 3;
        octetLength = 6;
        octetSeparator = '';
        includeOnly = '1234567890';
        break;
    }
  }

  const charset =
    includeOnly ||
    [
      uppercase && 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase && 'abcdefghijklmnopqrstuvwxyz',
      numbers && '0123456789',
      symbols && '!$%&',
    ]
      .filter(Boolean)
      .join('');

  if (!charset) {
    throw new Error('Character set is empty. Adjust your options.');
  }

  /**
   * Generates a single ID based on octets, timestamp, and customizations.
   * @private
   * @returns {string}
   */
  const generateId = () => {
    const ids = Array.from({ length: octets }, (_, i) => {
      const len = resolveFormat(octetFormat, i, octetLength, octetSeparator);
      const octet = Array.from({ length: len }, () =>
        secureRandChar(charset)
      ).join('');
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

  // Use template mode (overrides normal generation)
  if (typeof template === 'string') {
    /**
     * Generates an ID using the template pattern (overrides normal generation)
     * @private
     * @returns {string}
     */
    const generateTemplated = () =>
      template
        .replace(/%id/g, () => generateId())
        .replace(/%ts/g, () => timeStamp(timestampFormat));

    return instances > 1
      ? Array.from({ length: instances }, () => generateTemplated())
      : generateTemplated();
  }

  // Verbose return with metadata
  if (verbose) {
    /**
     * Generates a verbose result object with ID and options.
     * @private
     * @returns {Object}
     */
    const generateVerbose = () => ({
      ucid: generateId(),
      ...defaults,
      ...options,
    });

    return instances > 1
      ? Array.from({ length: instances }, () => generateVerbose())
      : generateVerbose();
  }

  // Default mode: return plain ID(s)
  return instances > 1
    ? Array.from({ length: instances }, () => generateId())
    : generateId();
}

module.exports = ucidGenerateId;
