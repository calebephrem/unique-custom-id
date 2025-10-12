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
  --format                    Predefined ID format that sets multiple options
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

const setOption = (key, value) => {
  const boolFlags = ['uppercase', 'lowercase', 'numbers', 'symbols'];
  const numFlags = ['octets', 'octetLength', 'instances'];
  const strFlags = [
    'octetSeparator',
    'octetFormat',
    'includeOnly',
    'timestamp',
    'timestampFormat',
    'prefix',
    'suffix',
    'template',
  ];

  if (boolFlags.includes(key)) {
    options[key] = value === undefined ? true : value === 'true';
  } else if (key === 'no-numbers') {
    options.numbers = false;
  } else if (numFlags.includes(key)) {
    options[key] = Number(value);
  } else if (['separator', 'sep'].includes(key)) {
    options.octetSeparator = value;
  } else if (key === 'format') {
    ucidFromFormat.changeOpts(value, options);
  } else if (strFlags.includes(key)) {
    options[key] = value;
  } else if (key === 'verbose') {
    options.verbose = true;
  } else if (key === 'help') {
    console.log(helpText);
    process.exit(0);
  } else {
    console.warn(`Unknown option: --${key}`);
    console.log(helpText);
    process.exit(1);
  }
};

for (const arg of args) {
  if (!arg.startsWith('--')) continue;
  const [rawKey, rawVal] = arg.slice(2).split('=');
  setOption(rawKey.trim(), rawVal?.trim());
}

try {
  console.log(ucidGenerateId(options));
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
