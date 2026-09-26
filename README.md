# UCID

![version](https://img.shields.io/npm/v/unique-custom-id?label=version)
![License](https://img.shields.io/github/license/calebephrem/unique-custom-id)
![Downloads](https://img.shields.io/npm/dt/unique-custom-id)
![size](https://packagephobia.com/badge?p=unique-custom-id)
![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

_Generate an ID that is as structured as you want it to be._

## Why UCID?

Because it's...

- Compact: [Zero dependencies](https://www.npmjs.com/package/unique-custom-id?activeTab=dependencies)
- Lightweight: Less than 50kb!
- Simple: Just call a single function and boom 💥: instant ID! As easy as that
- Secure: Fresh and unique IDs every single time

## How to use

### 1. Install the package

> [!NOTE]
> This guide sticks with bun as the package manager, you can use any.

```sh
bun add unique-custom-id
```

### 2. Import the function

```ts
import ucid from "unique-custom-id";
```

Or if you prefer CommonJS:

```js
const ucid = require("unique-custom-id");
```

### 3. Call the function

```ts
ucid();
// "af6944a12ce0c834eee9a14bc05bbe83"
```

## Customization

There are various options you can pass in to customize your id as you want it to be.

### `octets` (`number`, default: `4`)

The number of octets in the id.

```ts
ucid({ octets: 4, octetSeparator: "-" });
// "5379297e-1eba73d7-17e740cb-7be7d4ed"

ucid({ octets: 5, octetSeparator: "-" });
// "a08f8de7-97455a37-a2e05709-d3f6b1bc-fcc4e4e1"
```

Each section separated by `-` is called an octet.

### `octetSeparator` (`string`, default: `""`)

The separator between the octets.

```ts
ucid({ octets: 3, octetSeparator: "_" });
// "366170ba_6a2c22c5_c31b5596"

ucid({ octets: 4, octetSeparator: "." });
// "544b77f0.bcd372f7.ed00a640.7a4b0da3"
```

### `octetLength` (`number`, default: `8`)

The length of each octet in the id.

```ts
ucid({ octetLength: 5, octets: 3, octetSeparator: "-" });
// "f90ee-cf94d-ba6e2"

ucid({ octetLength: 9, octets: 2, octetSeparator: "-" });
// "06b143d05-0499b260c"
```

### `octetFormat` (`number[]`, default: `[]`)

The format of the octets (if you want them to differ in length).

```ts
ucid({ octetFormat: [8, 4, 4, 4, 12], octetSeparator: "-" });
// "0437ebd0-8fb1-28e3-c819-c243eda258fd"

ucid({ octetFormat: [12, 8, 16], octetSeparator: "-" });
// "5c20948f9e75-39767573-da3c7fcc618e688d"
```

### `charset` (`string | Partial<Record<"lowercase" | "uppercase" | "numbers" | "symbols" | "hex" | "all", boolean>>`, default: `{ hex: true }`)

The set of the characters that the id should be made up of.

```ts
ucid({ charset: "1234567890ABCDEF" });
// "B9344F9CD2D6EC050174A90F0597E3E5"

ucid({ charset: { hex: true, uppercase: true } });
// "V0c8D25ABLQbFXV7P6GMJ8GVKDTNQNKL"
```

### `customize` (`(octet: string, i: number, arr: string[]) => string`, default: `customize: (octet: string) => octet`)

A function to further customize the individual octets.

```ts
ucid({
  customize: (octet, i) => (i === 0 ? `u-` + octet : octet),
  octetSeparator: "-",
});
// "u-0aa5b4d0-fead811a-2e2b6aa6-cf5cbadc"

ucid({
  customize: (octet, i) => (i % 2 === 0 ? octet.toUpperCase() : octet),
  octetSeparator: "-",
}),

// "D454F3D2-ec78ade5-D5C9EA12-ffe98cab"
```

## Contributing

If you've found a bug, want to add a new feature, fix a typo, or anything you've found that's worth adding:

- Fork this pr and clone it down locally
- Create a branch, add your changes, and commit (following the [Conventional Commits](https://conventionalcommits.org/) specification)
- Push your commits to your remote repo (fork)
- Make a pull request against the `main` branch

That's it! Make sure to read [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guide.

## License

Mit (c) Caleb Ephrem

## 🌟 Give It a Try!

```ts
const magic = ucid();

console.log(`✨ Your shiny new ID: ${magic}`);
```
