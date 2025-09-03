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

/**
 * Generates a customizable ID string composed of shuffled octets.
 *
 * @param {Object} [options={}] - Configuration options for ID generation.
 * @param {number} [options.octets=4] - Number of octets in the ID.
 * @param {number} [options.octetLength=8] - Default length of each octet.
 * @param {string|Array} [options.octetFormat=''] - Custom format for octet lengths (e.g., [6, 4, 8]).
 * @param {number} [options.count=1] - Number of IDs to generate.
 * @param {boolean} [options.uppercase=false] - Include uppercase letters (A–Z).
 * @param {boolean} [options.lowercase=true] - Include lowercase letters (a–z).
 * @param {boolean} [options.numbers=true] - Include numeric characters (0–9).
 * @param {boolean} [options.symbols=false] - Include symbols (!#$%&, etc.).
 * @param {string|null} [options.includeOnly=null] - Override character set with a custom string.
 * @param {string|null} [options.template=null] - Generate an id with specific template.
 * @param {string} [options.octetSeparator='-'] - Separator between octets.
 * @param {string} [options.prefix=''] - Optional string to prepend to the generated ID.
 * @param {string} [options.suffix=''] - Optional string to append to the generated ID.
 * @param {boolean} [options.verbose=false] - Return the whole options object instead of id string
 * @param {(octet: string, index: number) => string} [options.customize] -Function to customize each octet
 * @returns {string} - The generated ID string.
 * @throws Will throw an error if `octets` or `octetLength` are less than or equal to zero.
 * @throws Will throw an error if the character set is empty after applying options.
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

  function timestamp() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }

  const generateId = () => {
    const ids = Array.from({ length: octets }, (_, i) => {
      const len = resolveFormat(octetFormat, i, octetLength, octetSeparator);
      const raw = Array.from({ length: len }, () => randChar(charset)).join('');
      const octet = shuffleStr(shuffleStr(raw));
      return typeof customize === 'function' ? customize(octet, i) : octet;
    });
    return `${prefix}${ids.join(octetSeparator)}${suffix}`;
  };

  if (typeof template === 'string') {
    const generateTemplated = () =>
      template
        .replace(/%id/g, () => generateId())
        .replace(/%ts/g, () => timestamp());

    return instances > 1
      ? Array.from({ length: instances }, () => generateTemplated())
      : generateTemplated();
  }

  if (verbose) {
    const generateVerbose = () => ({
      id: generateId(),
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

module.exports = { shuffleStr, ucidGenerateId };
