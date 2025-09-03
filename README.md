# 🎉 UCID

🔑 _UCID stands for Unique Custom ID, The easiest, fastest, and most customizable ID generator you'll ever meet!_

## 💡 Why UCID?

Because it's...

- 💿 **Compact** — Zero dependencies!
- 🪶 **Lightweight** — Less than 30kb!
- 🧠 **Simple** — Just call a single function and boom 💥: instant ID!
- 🔐 **Secure** — Fresh, unique IDs every. single. time.
- 🌀 **CLI** — spin up IDs faster than you can blink

## 📦 Installation

```sh
npm install unique-custom-id
```

## 🧬 What’s Under the Hood?

UCID runs independently without any dependencies — just pure JavaScript magic ✨. It uses Fisher-Yates Shuffle, Random Math etc.

## 🛠️ How to Use It

### ➕ Importing

ES Modules:

```js
import ucid from 'unique-custom-id';
```

CommonJS:

```js
const ucid = require('unique-custom-id');
```

### 🚀 Generate a Simple ID

```js
const id = ucid();

console.log(id);
// Result: dzcmj4dt-7zcqaoo0-t1mtis3v-3dh7r59v
```

## 🧩 Configuration Options

UCID isn’t just easy — it’s _flexible_ too! Customize your ID like a pro 🛠️

### 🔠 `uppercase` and `lowercase` (booleans)

Control letter casing:

- `lowercase`: `true` by default
- `uppercase`: `false` by default

```js
ucid({ uppercase: true });
// Result: TevajtrU-Eei8SnWa-0EZqr6NE-jMAHX0D6

ucid({ uppercase: true, lowercase: false });
// Result: FFJL9DAO-V3YPLZ2V-252L7URX-XCS3GWP5
```

### 🔢 `numbers` and `symbols` (booleans)

Toggle digits or symbols:

- `numbers`: `true` by default
- `symbols`: `false` by default

```js
ucid({ symbols: true });
// Result: 5w55an#e-kw7bw7f3-7iomwp#o-dd79$yf1

ucid({ numbers: false });
// Result: jueldfjw-ljhiphtl-ajuptedx-rramdwne
```

### 🍡 `octets` (number)

Set how many segments (octets) the ID should have. Default: `4`.

```js
ucid({ octets: 3 });
// Result: 4nlwrx87-fi65iq27-43wh2s05

ucid({ octets: 6 });
// Result: hr5bg68k-ycxqfb1o-pkofgsm2-j6hnimgy-ehcxulnl-ptmvuf3j
```

### 📏 `octetLength` (number)

Define how long each octet should be. Default: `8`.

```js
ucid({ octetLength: 4 });
// Result: k6ue-bvfq-fc99-oe07

ucid({ octetLength: 12 });
// Result: nz4kkg3jxxot-9v9bmx6y8ngt-x4ciymz48z9d-mqopg9mad4v2
```

### 🔤 `includeOnly` (string)

Use a custom character set to generate your ID:

```js
ucid({ includeOnly: 'abcdef' });
// Result: bbcefdfe-dfdecada-dbdeffee-acefbeae
```

### 🧯 `octetSeparator` (string)

Customize the character(s) used to separate octets. Default: `"-"`

```js
ucid({ octetSeparator: '=' });
// Result: pro9mns=odvhrd3i=28e2mqzg=t3n530m9

ucid({ octetSeparator: '~~' });
// Result: qm09extn~~dy7s1bd1~~t6fl9q2g~~mv352ie4
```

### 🎛️ `octetFormat` (string | string[] | number | number[])

Set the **exact** length of each octet individually.

```js
ucid({ octets: 3, octetFormat: '352' });
// Result: h0c-hgkf0-k9

ucid({ octets: 4, octetFormat: [2, 4, 6, 8] });
// Result: cb-udw8-e6m4wt-i9kim7xb

ucid({ octets: 2, octetFormat: 49 });
// Result: pr3e-piis0fdy9
```

### 📄 `template` (string | null)

- Use `%id` as a placeholder to inject generated IDs into custom strings.
- Use `%ts` as a placeholder to inject timestamp into custom strings.

```js
ucid({
  octets: 1,
  octetLength: 8,
  includeOnly: '1234567890abcdef',
  template: 'user-%id-session-%id',
});
// Result: user-1a97ada5-session-ec64776c

ucid({
  octets: 1,
  octetLength: 8,
  includeOnly: '1234567890abcdef',
  template: 'user-%id-at-%ts',
});
// Result: user-26001cde-at-20250903
```

### 🗣️ `verbose` (boolean)

Returns a full object instead of just the generated ID string.

If `verbose` is `true`, UCID will return an object containing the generated id and other options that were passed in.

This is especially useful for logging, debugging, testing, or introspection. Default: `false`

```js
ucid({
  octets: 3,
  octetLength: 12,
  includeOnly: '1234567890abcdef',
  verbose: true,
});

/* 

Result: {
  id: '795ebe1fd531-dbf06d32bd02-f512ad09e84a',
  octets: 3,
  uppercase: false,
  lowercase: true,
  octetLength: 12,
  octetFormat: '',
  numbers: true,
  octetSeparator: '-',
  symbols: false,
  includeOnly: '1234567890abcdef',
  template: null,
  prefix: '',
  suffix: '',
  verbose: true
}

*/
```

### `customize` (null | ((octet: string, index: number) => string))

Function to customize each octet further than other options.

```js
ucid({
  octets: 2,
  octetLength: 8,
  includeOnly: '1234567890abcdef',
  customize: (octet, i) => i % 2 ? octet.toUpperCase() : octet.toLowerCase()
});
// Result: 80a1a368-A738C260-32eaf5e3-3AF2803F

ucid({
  octets: 2,
  octetLength: 8,
  includeOnly: '1234567890abcdef',
  customize: (octet, i) => i == 0 ? `user-${octet}` : i == 1 ? `session-${octet}` : octet
});
// Result: user-12971c14-session-3dad3908
```

## 🧪 Use Case Examples

### 🆔 UUID Generator

```js
const uuid = ucid({
  octets: 5,
  octetFormat: [8, 4, 4, 4, 12],
  includeOnly: '1234567890abcdef',
});

console.log(uuid);
// Result: 9803fa1b-e760-6765-30af-a2d7a389c5f6
```

### 🔐 SHA-like ID

```js
const sha = ucid({
  octets: 1,
  octetLength: 40,
  includeOnly: '1234567890abcdef',
});

console.log(sha);
// Result: 7ca8f13c663210d577a82fd91aa39227f24d2791
```

## 🤝 Want to Contribute?

We love contributions! 💙  
If you’re thinking about improving UCID, fixing a bug, or just having fun, make sure to read the [contributing guide](https://github.com/calebephrem/unique-custom-id/blob/main/CONTRIBUTING.md) before you start. It’s got everything you need to know to get up and running! 🚀

## 🧸 Final Thoughts

UCID is built for _fun_ and _flexibility_ — perfect for devs who want a secure, short, and sweet identifier in seconds. 🧑‍💻

## 🌟 Give It a Try!

```js
const magic = ucid();
console.log(`✨ Your shiny new ID: ${magic}`);
```
