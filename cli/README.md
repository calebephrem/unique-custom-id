# 🧬 UCID CLI

Generate remixable, segment-based IDs straight from your terminal. Whether you're tagging builds, creating user handles, or just vibing with entropy, UCID gives you full control over the character set, format, and flair.

## 🚀 Quick Start

```bash
npx unique-custom-id
```

Or if you've already downloaded the package

```json
"scripts": {
    "ucid": "ucid",
},
```

And then

```bash
npm run ucid
```

## 🛠 CLI Options

| Flag              | Description                                               | Default |
| ----------------- | --------------------------------------------------------- | ------- |
| --uppercase       | Include uppercase letters (A–Z)                           | false   |
| --lowercase       | Include lowercase letters (a–z)                           | false   |
| --numbers         | Include numeric characters (0–9)                          | true    |
| --no-numbers      | Disable numeric characters                                | -       |
| --symbols         | Include symbols (default: false)                          | false   |
| --octets          | Number of ID segments (default: 4)                        | 4       |
| --octetLength     | Length of each segment (default: 8)                       | 8       |
| --instances       | Number of IDs to generate                                 | 1       |
| --octetSeparator  | Separator character between segments                      | '-'     |
| --octetFormat     | Custom format for octet lengths                           | ''      |
| --format        | Predefined ID format that sets multiple options.          | null    |
| --includeOnly     | Use only the provided characters                          | null    |
| --timestamp       | Include timestamp in the id, either 'prefix' or 'suffix'. | null    |
| --timestampFormat | The format of the timestamp in the id.                    | null    |
| --prefix          | Prepend a string to the generated ID                      | ''      |
| --suffix          | Append a string to the generated ID                       | ''      |
| --template        | Custom template with %id placeholders                     | null    |
| --verbose         | Return the whole options object including the id          | false   |
| --help            | Show help message                                         | -       |
