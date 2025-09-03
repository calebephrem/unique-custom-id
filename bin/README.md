# 🧬 UCID CLI — Unique Custom ID Generator

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

| Flag                 | Description                                                    | Default |
| -------------------- | -------------------------------------------------------------- | ------- |
| --uppercase          | Include uppercase letters (A–Z)                                | false   |
| --lowercase          | Include lowercase letters (a–z) (default: true)                | true    |
| --numbers            | Include numeric characters (0–9) (default: true)               | true    |
| --no-numbers         | Disable numeric characters                                     | -       |
| --symbols            | Include symbols (default: false)                               | false   |
| --octets=number      | Number of ID segments (default: 4)                             | 4       |
| --octetLength=number | Length of each segment (default: 8)                            | 8       |
| --instances=number   | Number of IDs to generate                                      | 1       |
| --sep=string         | Separator character between segments (default: "-")            | "-"     |
| --includeOnly=string | Use only the provided characters                               | null    |
| --prefix=string      | Prepend a string to the generated ID                           | ''      |
| --suffix=string      | Append a string to the generated ID                            | ''      |
| --template=string    | Custom template with %id placeholders (e.g. "Your-ID:%id-%id") | null    |
| --verbose            | Return the whole options object including the id               | false   |
| --help               | Show this help message                                         | -       |
