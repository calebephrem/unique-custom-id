import ucidGenerateId from "../core/index.js";
import type { CoreOptions } from "../types/core.js";
import map from "./map.js";
/**
 * Adjusts multiple options based on a given format string.
 * @param {string} format
 * @param {Object} [options]
 */
function formatOpts(format: string, options?: CoreOptions) {
	if (!format || typeof format !== "string" || !options) return ucidGenerateId();

	const f = format.toLowerCase();

	const apply = (name: keyof typeof map | string) => {
		const cfg = map[name as keyof typeof map];
		if (!cfg) return;
		if (typeof cfg === "string") return apply(cfg);
		Object.assign(options, cfg);
	};

	apply(f);
}

/**
 * Generate IDs based on predefined formats.
 * @param {string} format
 * @returns {string}
 */
function ucidFromFormat(format: string) {
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

export default ucidFromFormat;
