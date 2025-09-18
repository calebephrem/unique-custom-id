/**
 * Adjusts multiple options based on a given format
 *
 * @param {string} format
 * @param {Object} [options]
 * @return {void}
 */
function formatOpts(format, options) {
  if (!format || typeof format !== 'string' || options === undefined) {
    return ucidGenerateId();
  }

  switch (format.toLowerCase()) {
    case 'uuid':
    case 'uuidv4':
    case 'universal':
    case 'universal-id':
      options.octets = 5;
      options.octetFormat = [8, 4, 4, 4, 12];
      options.includeOnly = '1234567890abcdef';
      break;

    case 'nanoid':
    case 'nano-id':
    case 'nano':
      options.octets = 1;
      options.octetLength = 21;
      options.uppercase = true;
      options.octetSeparator = '';
      break;

    case 'ksuid':
      options.octets = 1;
      options.octetLength = 27;
      options.uppercase = true;
      options.octetSeparator = '';
      break;

    case 'cuid':
      options.octets = 3;
      options.octetSeparator = '';
      options.prefix = 'c';
      break;

    case 'ulid':
      options.octets = 2;
      options.octetLength = 13;
      options.lowercase = false;
      options.uppercase = true;
      options.octetSeparator = '';
      break;

    case 'snowflake':
    case 'snowflake-id':
      options.octets = 3;
      options.octetLength = 6;
      options.octetSeparator = '';
      options.includeOnly = '1234567890';
      break;

    case 'sha':
    case 'sha1':
      options.octets = 5;
      options.octetSeparator = '';
      options.includeOnly = '1234567890abcdef';
      break;

    case 'sha256':
      options.octets = 8;
      options.octetSeparator = '';
      options.includeOnly = '1234567890abcdef';
      break;

    case 'sha512':
      options.octets = 16;
      options.octetLength = 8;
      options.octetSeparator = '';
      options.includeOnly = '1234567890abcdef';
      break;

    case 'md5':
      options.octets = 1;
      options.octetLength = 32;
      options.octetSeparator = '';
      options.includeOnly = '1234567890abcdef';
      break;

    case 'object':
    case 'objectid':
    case 'object-id':
      options.octets = 3;
      options.octetFormat = [8, 4, 8];
      options.includeOnly = '1234567890abcdef';
      options.octetSeparator = '';
      break;

    case 'mongo':
    case 'objectid24':
      options.octets = 1;
      options.octetLength = 24;
      options.includeOnly = '1234567890abcdef';
      options.octetSeparator = '';
      break;

    case 'objectid32':
      options.octets = 1;
      options.octetLength = 32;
      options.includeOnly = '1234567890abcdef';
      options.octetSeparator = '';
      break;

    case 'digits':
    case 'numeric':
      options.includeOnly = '0123456789';
      options.octets = 1;
      options.octetLength = 16;
      options.octetSeparator = '';
      break;

    case 'alphanumeric':
      options.uppercase = true;
      options.lowercase = true;
      options.numbers = true;
      options.octets = 1;
      options.octetLength = 16;
      options.octetSeparator = '';
      break;

    case 'alpha':
      options.uppercase = true;
      options.lowercase = true;
      options.numbers = false;
      options.octets = 1;
      options.octetLength = 16;
      options.octetSeparator = '';
      break;

    case 'ts-id':
    case 'timestamp-id':
      options.octets = 2;
      options.octetLength = 6;
      options.timestamp = 'prefix';
      break;

    case 'epoch-id':
      options.octets = 1;
      options.octetLength = 8;
      options.timestampFormat = 'unix';
      options.timestamp = 'prefix';
      break;

    case 'jwt-id':
      options.octets = 3;
      options.octetLength = 16;
      options.octetSeparator = '.';
      options.includeOnly =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';
      break;

    case 'bcrypt-id':
      options.octets = 1;
      options.octetLength = 60;
      options.includeOnly =
        './ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      options.octetSeparator = '';
      break;

    case 'argon-id':
      options.octets = 1;
      options.octetLength = 64;
      options.includeOnly =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      options.octetSeparator = '';
      break;

    case 'host-id':
    case 'machine-id':
      options.octets = 4;
      options.octetLength = 6;
      options.includeOnly = '0123456789abcdef';
      break;

    case 'session-id':
      options.uppercase = true;
      options.octets = 2;
      options.octetLength = 12;
      options.timestamp = 'prefix';
      break;

    case 'short':
      options.octets = 1;
      options.octetLength = 8;
      options.octetSeparator = '';
      break;

    case 'mini':
      options.octets = 1;
      options.octetLength = 6;
      options.octetSeparator = '';
      break;

    case 'ghost':
      options.octets = 2;
      options.octetLength = 9;
      options.octetSeparator = '_';
      break;

    case 'phantom':
      options.octets = 3;
      options.octetLength = 10;
      options.octetSeparator = '_';
      break;

    case 'ninja':
      options.octets = 3;
      options.octetLength = 7;
      options.octetSeparator = '-';
      options.prefix = 'n';
      break;

    case 'shortuuid':
    case 'short-uuid':
    case 'short-uuidv4':
      options.octets = 4;
      options.octetFormat = [8, 4, 4, 8];
      options.includeOnly = '1234567890abcdef';
      break;

    case 'hex':
    case 'hexadecimal':
      options.includeOnly = '1234567890abcdef';
      break;
  }
}

/**
 * Generate IDs based on predefined formats
 *
 * @param {string} format
 * @returns {string}
 * @example
 * ucidFromFormat('uuid') // -> c6ec0bb8-8b7e-85fe-9da5-6b35797c9d62
 */
function ucidFromFormat(format) {
  const options = {
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
    condition: null,
  };

  formatOpts(format, options);

  return require('./ucid.core.js')(options);
}

ucidFromFormat.changeOpts = function (format, options) {
  return formatOpts(format, options);
};

module.exports = ucidFromFormat;
