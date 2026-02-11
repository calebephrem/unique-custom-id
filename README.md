# 🎉 UCID

![version](https://img.shields.io/npm/v/unique-custom-id?label=version)
![License](https://img.shields.io/github/license/calebephrem/unique-custom-id)
![Downloads](https://img.shields.io/npm/dt/unique-custom-id)
![size](https://packagephobia.com/badge?p=unique-custom-id)
![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

🔑 _UCID stands for Unique Custom ID, the easiest, fastest, and most customizable ID generator you'll ever meet!_

## 💡 Why UCID?

Because it's...

- 💿 **Compact** — [Zero dependencies](https://www.npmjs.com/package/unique-custom-id?activeTab=dependencies)!
- 🪶 **Lightweight** — Less than 50kb!
- 🧠 **Simple** — Just call a single function and boom 💥: instant ID!
- 🔐 **Secure** — Fresh, unique IDs every. single. time.
- 🌀 **CLI** — spin up IDs faster than you can blink!

## 🧬 What’s Under the Hood?

UCID runs independently [without any dependencies](https://www.npmjs.com/package/unique-custom-id?activeTab=dependencies) — just pure JavaScript magic ✨.

### ✅ Interesting Fact

If you use the **default options**, even if you generate **1 billion IDs per second**, you'd need **hundreds of millions of years** to have a meaningful chance of a collision. Sounds unbelievable? Have a look at the [wiki page](https://github.com/calebephrem/unique-custom-id/wiki/Entropy) for the math.


## 🛠️ How to Use UCID

### 📦 Installation

Install via npm:

```sh
npm install unique-custom-id
```

Or with yarn:

```sh
yarn add unique-custom-id
```

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

### `uppercase` and `lowercase` (booleans)

Control letter casing:

- `lowercase`: `true` by default
- `uppercase`: `false` by default

```js
ucid({
  uppercase: true,
});
// Result: TevajtrU-Eei8SnWa-0EZqr6NE-jMAHX0D6

ucid({
  uppercase: true,
  lowercase: false,
});
// Result: FFJL9DAO-V3YPLZ2V-252L7URX-XCS3GWP5
```

### `numbers` and `symbols` (booleans)

Toggle digits or symbols:

- `numbers`: `true` by default
- `symbols`: `false` by default

```js
ucid({
  symbols: true,
});
// Result: 5w55an#e-kw7bw7f3-7iomwp#o-dd79$yf1

ucid({
  numbers: false,
});
// Result: jueldfjw-ljhiphtl-ajuptedx-rramdwne
```

### `octets` (number)

Set how many segments (octets) the ID should have. Default: `4`.

```js
ucid({
  octets: 3,
});
// Result: 4nlwrx87-fi65iq27-43wh2s05

ucid({
  octets: 6,
});
// Result: hr5bg68k-ycxqfb1o-pkofgsm2-j6hnimgy-ehcxulnl-ptmvuf3j
```

### `octetLength` (number)

Define how long each octet should be. Default: `8`.

```js
ucid({
  octetLength: 4,
});
// Result: k6ue-bvfq-fc99-oe07

ucid({
  octetLength: 12,
});
// Result: nz4kkg3jxxot-9v9bmx6y8ngt-x4ciymz48z9d-mqopg9mad4v2
```

### `includeOnly` (string)

Use a custom character set to generate your ID:

```js
ucid({
  includeOnly: '1234567890abcdef',
});
// Result: f800cdb7-0082b1b8-f0736eb3-4b16949a
```

### `timestamp` (string)

Add timestamp to your ID. Either `prefix` or `suffix`.

- `prefix`: before the ID. Aliases: `prefix`, `p`, `pre`, `pref`
- `suffix`: after the ID. Aliases: `suffix`, `s`, `suf`, `suff`

```js
ucid({
  timestamp: 'prefix', // `p`, `pre` or `pref` works too
});
// Result: 20250904-k0ebaf6m-j31g7koc-b25p0p2n-u9iah5i4

ucid({
  timestamp: 'suff',
});
// Result: 05mdc0cp-6k6xvl9c-mgc7s9e3-t98ckh3f-20250904
```

### `timestampFormat` (string)

Controls how the timestamp is formatted.

You can use whatever format you like. yyyy-mm-dd, mm-dd-yy, however you like it, with additional predefined formats:

- `unix` / `epoch`
- `military`
- `iso`
- `utc`
- `rfc` (`rfc3339`)
- `filetime` / `winft` (Windows FILETIME)

```js
ucid({
  octets: 3,
  timestamp: 's',
  timestampFormat: 'dd-mm-yyyy-hh:mm:ss:ms',
});
// Result: gtrf9t1h-u00ycxuw-mxzhjuty-04-09-2025-12:09:00:39

ucid({
  octets: 3,
  timestamp: 'p',
  timestampFormat: 'unix',
});
// Result: 1756976740-61p0xk4r-1ad6fg3l-gxwsgpgk
```

### `octetSeparator` (string)

Customize the character(s) used to separate octets. Default: `"-"`

```js
ucid({ octetSeparator: '=' });
// Result: pro9mns=odvhrd3i=28e2mqzg=t3n530m9

ucid({ octetSeparator: '~' });
// Result: qm09extn~dy7s1bd1~t6fl9q2g~mv352ie4
```

### `octetFormat` (string | string[] | number | number[])

Set the **exact** length of each octet individually.

```js
ucid({
  octets: 3,
  octetFormat: '352',
});
// Result: h0c-hgkf0-k9

ucid({
  octets: 4,
  octetFormat: [2, 4, 6, 8],
});
// Result: cb-udw8-e6m4wt-i9kim7xb

ucid({
  octets: 2,
  octetFormat: 49,
});
// Result: pr3e-piis0fdy9
```

### `instances` (number)

Number of IDs to generate.

```js
ucid({
  instances: 3,
});
/*
Result: [
  '9v7z1v59-0v28lo6h-8g5qpnhk-dx5f6412',
  '5689u3lw-ns4wk8sc-u57bgwxz-nm9r8ydf',
  'ul7pdyya-bgubmkef-zlpp7b79-7v2oo5dq'
]
*/

ucid({
  octets: 4,
  octetFormat: [2, 4, 6, 8],
  instances: 5,
});
/*
Result: [
  'rd-c0ix-mtifus-z7ibcbip',
  'l6-gngn-1v04eg-do2yei8v',
  'kf-fprl-klp5bw-o7gcv39u',
  'tm-v4hq-8h964i-cnpswp29',
  'uq-iwcb-u44bey-yj0nvs98'
]
*/
```

### `template` (string | null)

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

### `prefix` and `suffix` (string)

Add static strings before or after your ID.

```js
ucid({
  prefix: 'ID-',
  suffix: '-done',
});
// Result: ID-k0ebaf6m-j31g7koc-b25p0p2n-u9iah5i4-done
```

### `verbose` (boolean)

Returns a full object instead of just the generated ID string.

If `verbose` is `true`, UCID will return an object containing the generated ID and other options that were passed in.

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
  ucid: '795ebe1fd531-dbf06d32bd02-f512ad09e84a',
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
  customize: (octet, i) => (i % 2 ? octet.toUpperCase() : octet.toLowerCase()),
});
// Result: 80a1a368-A738C260-32eaf5e3-3AF2803F

ucid({
  octets: 3,
  octetLength: 6,
  includeOnly: '1234567890abcdef',
  customize: (octet, i) =>
    i == 0 ? `user-${octet}` : i == 1 ? `session-${octet}` : `${i}${octet}`,
});
// Result: user-81cd0a-session-13634d-212fb85
```

### `condition` (null | ((resolve: Function, reject: Function) => void))

Optional function that acts as a gate before UCID generation begins.  
It must call `resolve()` to allow generation or `reject(msg)` to skip it.

If `reject()` is called, UCID generation is aborted, and the ucid function returns `undefined`.  
If `reject()` is passed an `Error` object, it will be thrown. Otherwise, the error message is logged.

```js
// Allow generation only in production
ucid({
  condition: (resolve, reject) =>
    process.env.NODE_ENV === 'production'
      ? resolve()
      : reject('UCID generation is disabled in non-production environments.'),
});

// Check authentication
ucid({
  condition: (resolve, reject) =>
    auth?.currentUser?.email
      ? resolve()
      : reject(new Error('User must be authenticated.')),
});
```

## Predefined Formats

You don't have to memorize and write all those [configuration options](#-configuration-options). UCID contains predefined id formats like uuid, nanoid, cuid etc.

It uses the default configuration options in the back. For example:

```js
ucid.format('uuid');
// Result: afe5791b-788a-0c72-dc61-34b008e3fd98
```

On the back:

```js
ucid({
  octets: 5,
  octetFormat: [8, 4, 4, 4, 12],
  includeOnly: '1234567890abcdef',
});
// Result: afe5791b-788a-0c72-dc61-34b008e3fd98
```

There are many predefined formats in UCID. Those predefined formats maybe existing or custom formats. Many of them have aliases.

- `uuid`, `uuidv4`, `universal`, `universal-id`
- `nanoid`, `nano`, `nano-id`
- `ksuid`
- `cuid`
- `ulid`
- `snowflake`, `snowflake-id`
- `sha`, `sha1`
- `sha256`
- `sha512`
- `md5`
- `object`, `objectid`, `object-id`
- `mongo`, `objectid24`
- `objectid32`
- `digits`, `numeric`
- `alphanumeric`
- `alpha`
- `ts-id`, `timestamp-id`
- `epoch-id`
- `jwt-id`
- `bcrypt-id`
- `argon-id`
- `host-id`, `machine-id`
- `session-id`
- `short`, `mini`, `ghost`, `phantom`, `ninja`
- `shortuuid`, `short-uuid`, `short-uuidv4`
- `hex`, `hexadecimal`
- `shortucid`, `short-ucid`
- `snake-case`
- `separatorless`, `sepless`, `separator-less`
- `zulu`
- `slug`
- `dna`
- `leet`
- `caps`, `capsid`, `caps-id`
- `wordy`

```js
ucid.format('uuid'); // uuidv4, universal or universal-id also works
// Result: 368463db-db52-768a-499b-88e1b6698036

ucid.format('sha');
// Result: b216a7459df37c38b701ac2b5ad1ad5c634260f2

ucid.format('cuid');
// Result: c25u32ul06423krgbcuygdpce
```

## 🤝 Want to Contribute?

We love contributions! 💙  
If you’re thinking about improving [UCID](https://github.com/calebephrem/unique-custom-id), fixing a [bug](https://github.com/calebephrem/unique-custom-id/issues), or just having fun, make sure to read the [contributing guide](./CONTRIBUTING.md) before you start. It’s got everything you need to know to get up and running! 🚀

## 🧸 Final Thoughts

UCID is built for security, flexibility, and speed — perfect for devs who want secure and customizable identifiers in milliseconds.

View [UCID Wiki](https://github.com/calebephrem/unique-custom-id/wiki) if you want detailed documentation about UCID.

## 🌟 Give It a Try!

```js
const magic = ucid();
console.log(`✨ Your shiny new ID: ${magic}`);
```
