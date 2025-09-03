#!/usr/bin/env node

const { ucidGenerateId } = require('../utils'); // adjust path if needed

const args = process.argv.slice(2);
const options = {};

const helpText = `
Usage: ucid [options]

Generates a customizable ID composed of shuffled octets.

Options:
  --uppercase                 Include uppercase letters (A–Z)
  --lowercase                 Include lowercase letters (a–z) (default: true)
  --numbers                   Include numeric characters (0–9) (default: true)
  --no-numbers                Disable numeric characters
  --symbols                   Include symbols (default: false)
  --octets=number             Number of ID segments (default: 4)
  --octetLength=number        Length of each segment (default: 8)
  --sep=string                Separator character between segments (default: "-")
  --includeOnly=string        Use only the provided characters
  --prefix=string             Prepend a string to the generated ID
  --suffix=string             Append a string to the generated ID
  --template=string           Custom template with %id placeholders (e.g. "Your-ID:%id-%id")
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
        options[key] = Number(value);
        break;

      case 'sep':
        options.octetSeparator = value;
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
