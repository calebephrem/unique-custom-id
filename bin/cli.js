#!/usr/bin/env node

const ucidGenerateId = require('../ucid.core.js');

const args = process.argv.slice(2);
const options = {};

const helpText = `
Usage: npx unique-custom-id [options].

Options:
  --uppercase                 Include uppercase letters (A–Z)
  --lowercase                 Include lowercase letters (a–z)
  --numbers                   Include numeric characters (0–9)
  --no-numbers                Disable numeric characters
  --symbols                   Include symbols (default: false)
  --octets                    Number of ID segments (default: 4)
  --octetLength               Length of each segment (default: 8)
  --instances                 Number of IDs to generate
  --octetSeparator            Separator character between segments
  --octetFormat               Custom format for octet lengths
  --includeOnly               Use only the provided characters
  --prefix                    Prepend a string to the generated ID
  --suffix                    Append a string to the generated ID
  --template                  Custom template with %id placeholders
  --verbose                   Return the whole options object including the id
  --help                      Show this help message
`;

args.forEach((arg) => {
  if (arg.startsWith('--')) {
    const [key, value] = arg.slice(2).split('=');

    switch (key) {
      case 'uppercase':
      case 'lowercase':
      case 'numbers':
      case 'symbols':
        options[key] = value === undefined ? true : value === 'true';
        break;

      case 'no-numbers':
        options.numbers = false;
        break;

      case 'octets':
      case 'octetLength':
      case 'instances':
        options[key] = Number(value);
        break;

      case 'separator':
        options.octetSeparator = value;
        break;

      case 'format':
        options.octetFormat = value;
        break;

      case 'includeOnly':
      case 'prefix':
      case 'suffix':
      case 'template':
        options[key] = value;
        break;

      case 'verbose':
        options.verbose = true;
        break;

      case 'help':
        console.log(helpText);
        process.exit(0);
        break;

      default:
        console.warn(`Unknown option: --${key}`);
        process.exit(1);
    }
  }
});

try {
  const id = ucidGenerateId(options);
  console.log(id);
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
