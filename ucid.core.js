const { resolveFormat, secureRandChar, timeStamp } = require('./utils.js');

/**
 * Generates customizable and optionally verbose Unique Custom IDs (UCIDs).
 * @param {Object} [options={}] Configuration options
 * @returns {string|Object|Array<string|Object>}
 */
function ucidGenerateId(options = {}) {
  const defaults = Object.freeze({
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
  });

  const opts = { ...defaults, ...options };
  const {
    octets,
    octetLength,
    octetFormat,
    uppercase,
    lowercase,
    numbers,
    symbols,
    includeOnly,
    octetSeparator,
    timestamp,
    timestampFormat,
    template,
    prefix,
    suffix,
    instances,
    verbose,
    customize,
    condition,
  } = opts;

  // Conditional generation guard
  if (typeof condition === 'function') {
    let allowed = false,
      error = null;
    condition(
      () => (allowed = true),
      (msg) => (error = msg || 'UCID condition rejected.')
    );
    if (!allowed)
      return error instanceof Error
        ? (() => {
            throw error;
          })()
        : console.error(error);
  }

  if (octets <= 0 || octetLength <= 0)
    throw new Error('Both `octets` and `octetLength` must be greater than 0.');

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

  if (!charset)
    throw new Error(
      'Character set empty. Enable at least one source of characters.'
    );

  const getTs = () => timeStamp(timestampFormat);

  const generateId = () => {
    const parts = Array.from({ length: octets }, (_, i) => {
      const len = resolveFormat(octetFormat, i, octetLength, octetSeparator);
      const raw = Array.from({ length: len }, () =>
        secureRandChar(charset)
      ).join('');
      return typeof customize === 'function' ? customize(raw, i) : raw;
    }).join(octetSeparator);

    const tsPre = ['prefix', 'p', 'pre', 'pref'].includes(timestamp);
    const tsSuf = ['suffix', 's', 'suf', 'suff'].includes(timestamp);

    return [
      prefix,
      tsPre ? getTs() + octetSeparator : '',
      parts,
      tsSuf ? octetSeparator + getTs() : '',
      suffix,
    ].join('');
  };

  const generateTemplate = () =>
    template.replace(/%id/g, generateId).replace(/%ts/g, getTs);

  const makeVerbose = (ucid) => ({ ucid, ...opts });

  if (template) {
    return instances > 1
      ? Array.from({ length: instances }, generateTemplate)
      : generateTemplate();
  }

  if (verbose) {
    return instances > 1
      ? Array.from({ length: instances }, () => makeVerbose(generateId()))
      : makeVerbose(generateId());
  }

  return instances > 1
    ? Array.from({ length: instances }, generateId)
    : generateId();
}

module.exports = ucidGenerateId;
