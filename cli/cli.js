#!/usr/bin/env node

/**
 * UCID CLI: Command-line interface for generating unique custom IDs.
 *
 * Usage:
 *   npx unique-custom-id [options]
 *
 * Example:
 *   npx unique-custom-id --octets=3 --octetLength=6 --prefix="user-"
 */

const ucidGenerateId = require('../ucid.core.js');
const ucidFromFormat = require('../ucid.format.js');

const args = process.argv.slice(2);
const options = {};

/**
 * Help text shown on --help flag.
 */
const helpText = `
Usage: npx unique-custom-id [options]

Options:
  --uppercase                 Include uppercase letters (A–Z)
  --lowercase                 Include lowercase letters (a–z)
  --numbers                   Include numeric characters (0–9)
  --no-numbers                Disable numeric characters
  --symbols                   Include symbols (default: false)
  --octets                    Number of ID segments (default: 4)
  --octetLength               Length of each segment (default: 8)
  --instances                 Number of IDs to generate
  --octetSeparator            Separator character between segments (default: "-")
  --format                    Predefined ID format that sets multiple options.
  --octetFormat               Custom format for octet lengths, e.g. "4-6-8"
  --includeOnly               Use only the provided characters
  --timestamp                 Include timestamp in the ID
  --timestampFormat           Timestamp format (e.g., yyyy-mm-dd)
  --prefix                    Prepend a string to the generated ID
  --suffix                    Append a string to the generated ID
  --template                  Custom template with %id and %ts placeholders
  --verbose                   Return detailed object with generated ID and options
  --help                      Show this help message

Examples:
  npx unique-custom-id --octets=3
  npx unique-custom-id --template="user-%id-%ts" --timestampFormat=yyyy-mm-dd
`;

args.forEach((arg) => {
  if (arg.startsWith('--')) {
    const [rawKey, rawVal] = arg.slice(2).split('=');
    const key = rawKey.trim();
    const value = rawVal?.trim();

    switch (key) {
      // Boolean flags (true if present without value)
      case 'uppercase':
      case 'lowercase':
      case 'numbers':
      case 'symbols':
        options[key] = value === undefined ? true : value === 'true';
        break;

      case 'no-numbers':
        options.numbers = false;
        break;

      // Number options
      case 'octets':
      case 'octetLength':
      case 'instances':
        options[key] = Number(value);
        break;

      // Renamed or aliased options
      case 'octetSeparator':
      case 'separator':
      case 'sep':
        options.octetSeparator = value;
        break;

      case 'octetFormat':
        options.octetFormat = value;
        break;

      case 'format':
        ucidFromFormat.changeOpts(value, options);
        break;

      // String options
      case 'octetSeparator':
      case 'octetFormat':
      case 'includeOnly':
      case 'timestamp':
      case 'timestampFormat':
      case 'prefix':
      case 'suffix':
      case 'template':
        options[key] = value;
        break;

      // Boolean flag (does not accept value)
      case 'verbose':
        options.verbose = true;
        break;

      // help text
      case 'help':
        console.log(helpText);
        process.exit(0);

      // default
      default:
        console.warn(`Unknown option: --${key}`);
        console.log(helpText);
        process.exit(1);
    }
  }
});

try {
  const result = ucidGenerateId(options);
  console.log(result);
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
