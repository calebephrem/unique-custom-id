const ucidGenerateId = require('./ucid.core.js');

/**
 * Adjusts multiple options based on a given format string.
 * @param {string} format
 * @param {Object} [options]
 */
function formatOpts(format, options) {
  if (!format || typeof format !== 'string' || !options)
    return ucidGenerateId();

  const f = format.toLowerCase();

  const map = {
    uuid: {
      octets: 5,
      octetFormat: [8, 4, 4, 4, 12],
      includeOnly: '1234567890abcdef',
    },
    uuidv4: 'uuid',
    universal: 'uuid',
    'universal-id': 'uuid',

    nanoid: { octets: 1, octetLength: 21, uppercase: true, octetSeparator: '' },
    'nano-id': 'nanoid',
    nano: 'nanoid',

    ksuid: { octets: 1, octetLength: 27, uppercase: true, octetSeparator: '' },
    cuid: { octets: 3, prefix: 'c', octetSeparator: '' },
    ulid: {
      octets: 2,
      octetLength: 13,
      lowercase: false,
      uppercase: true,
      octetSeparator: '',
    },
    snowflake: {
      octets: 3,
      octetLength: 6,
      includeOnly: '1234567890',
      octetSeparator: '',
    },
    'snowflake-id': 'snowflake',

    sha: { octets: 5, octetSeparator: '', includeOnly: '1234567890abcdef' },
    sha1: 'sha',
    sha256: { octets: 8, octetSeparator: '', includeOnly: '1234567890abcdef' },
    sha512: {
      octets: 16,
      octetLength: 8,
      octetSeparator: '',
      includeOnly: '1234567890abcdef',
    },
    md5: {
      octets: 1,
      octetLength: 32,
      octetSeparator: '',
      includeOnly: '1234567890abcdef',
    },

    object: {
      octets: 3,
      octetFormat: [8, 4, 8],
      includeOnly: '1234567890abcdef',
      octetSeparator: '',
    },
    objectid: 'object',
    'object-id': 'object',
    mongo: {
      octets: 1,
      octetLength: 24,
      includeOnly: '1234567890abcdef',
      octetSeparator: '',
    },
    objectid24: 'mongo',
    objectid32: {
      octets: 1,
      octetLength: 32,
      includeOnly: '1234567890abcdef',
      octetSeparator: '',
    },

    digits: {
      includeOnly: '0123456789',
      octets: 1,
      octetLength: 16,
      octetSeparator: '',
    },
    numeric: 'digits',
    alphanumeric: {
      uppercase: true,
      lowercase: true,
      numbers: true,
      octets: 1,
      octetLength: 16,
      octetSeparator: '',
    },
    alpha: {
      uppercase: true,
      lowercase: true,
      numbers: false,
      octets: 1,
      octetLength: 16,
      octetSeparator: '',
    },

    'ts-id': { octets: 2, octetLength: 6, timestamp: 'prefix' },
    'timestamp-id': 'ts-id',
    'epoch-id': {
      octets: 1,
      octetLength: 8,
      timestamp: 'prefix',
      timestampFormat: 'unix',
    },

    'jwt-id': {
      octets: 3,
      octetLength: 16,
      octetSeparator: '.',
      includeOnly:
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_',
    },
    'bcrypt-id': {
      octets: 1,
      octetLength: 60,
      includeOnly:
        './ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      octetSeparator: '',
    },
    'argon-id': {
      octets: 1,
      octetLength: 64,
      includeOnly:
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
      octetSeparator: '',
    },

    'host-id': { octets: 4, octetLength: 6, includeOnly: '0123456789abcdef' },
    'machine-id': 'host-id',

    'session-id': {
      uppercase: true,
      octets: 2,
      octetLength: 12,
      timestamp: 'prefix',
    },
    short: { octets: 1, octetLength: 8, octetSeparator: '' },
    mini: { octets: 1, octetLength: 6, octetSeparator: '' },
    ghost: { octets: 2, octetLength: 9, octetSeparator: '_' },
    phantom: { octets: 3, octetLength: 10, octetSeparator: '_' },
    ninja: { octets: 3, octetLength: 7, prefix: 'n', octetSeparator: '-' },

    shortuuid: {
      octets: 4,
      octetFormat: [8, 4, 4, 8],
      includeOnly: '1234567890abcdef',
    },
    'short-uuid': 'shortuuid',
    'short-uuidv4': 'shortuuid',

    hex: { includeOnly: '1234567890abcdef' },
    hexadecimal: 'hex',

    'short-ucid': { octets: 3 },
    shortucid: 'short-ucid',

    snake: { octets: 3, includeOnly: '1234567890abcdef', octetSeparator: '_' },
    'snake-case': 'snake',

    separatorless: { octets: 1, octetLength: 32 },
    'separator-less': 'separatorless',
    sepless: 'separatorless',

    zulu: {
      octets: 2,
      octetLength: 10,
      timestamp: 'prefix',
      timestampFormat: 'military',
    },
    slug: { octets: 2, octetLength: 6, octetSeparator: '-' },
    dna: { octets: 1, octetLength: 32, uppercase: true, lowercase: false },
    leet: { octets: 1, octetLength: 24, includeOnly: 'aeiou1234567890' },
    caps: { uppercase: true, lowercase: false, octets: 4, octetLength: 6 },
    capsid: 'caps',
    'caps-id': 'caps',
    wordy: {
      octets: 3,
      octetLength: 7,
      lowercase: true,
      numbers: false,
      octetSeparator: '-',
    },
  };

  const apply = (name) => {
    const cfg = map[name];
    if (!cfg) return;
    if (typeof cfg === 'string') return apply(cfg);
    Object.assign(options, cfg);
  };

  apply(f);
}

/**
 * Generate IDs based on predefined formats.
 * @param {string} format
 * @returns {string}
 */
function ucidFromFormat(format) {
  const defaults = {
    octets: 4,
    octetLength: 8,
    octetFormat: '',
    uppercase: false,
    lowercase: true,
    numbers: true,
    symbols: false,
    includeOnly: null,
    octetSeparator: '-',
    timestamp: null,
    timestampFormat: null,
    template: null,
    prefix: '',
    suffix: '',
    instances: 1,
    verbose: false,
    customize: null,
    condition: null,
  };

  formatOpts(format, defaults);
  return ucidGenerateId(defaults);
}

ucidFromFormat.changeOpts = formatOpts;

module.exports = ucidFromFormat;
