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

| Flag                   | Description                      | Default |
| ---------------------- | -------------------------------- | ------- |
| `--uppercase`          | Include uppercase letters (A–Z)  | `false` |
| `--lowercase`          | Include lowercase letters (a–z)  | `true`  |
| `--numbers`            | Include numeric characters (0–9) | `true`  |
| `--no-numbers`         | Disable numeric characters       | —       |
| `--symbols`            | Include symbols (`!#$%&`)        | `false` |
| `--octets=number`      | Number of ID segments            | `4`     |
| `--octetLength=number` | Length of each segment           | `8`     |
| `--sep=string`         | Separator between segments       | `"-"`   |
| `--includeOnly=string` | Use only the provided characters | `null`  |
| `--prefix=string`      | Prepend a string to the ID       | `""`    |
| `--suffix=string`      | Append a string to the ID        | `""`    |
| `--help`               | Show help message                | —       |
