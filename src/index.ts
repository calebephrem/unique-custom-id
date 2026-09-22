import { characterSet } from "./data/charset.js";
import map from "./data/map.js";
import { defaultOpts } from "./defaults/opts.js";
import { randChar } from "./lib/randChar.js";
import type { Map } from "./types/map.js";
import type { Opts } from "./types/opts.js";

export default function ucid(opts?: Partial<Opts> | Map): string {
  if (typeof opts !== "object") {
    if (opts) return ucid(map[opts]);

    // return ucid();
  }

  const resolvedOpts: Opts = { ...defaultOpts, ...opts };

  const {
    octetLength,
    charset,
    octetSeparator,
    octets,
    octetFormat,
    customize,
  } = resolvedOpts;

  const octetArr: string[] = [];

  for (let i = 0; i < (octetFormat.length || octets); i++) {
    const octetFragments: string[] = [];

    const resolvedOctetLength =
      // if `octetFormat` is `[]` (default), `Math.max(...[])` = `Math.max()` = `-Infinity`. if so, fallback to `octetLength` (either specified or default)
      Math.max(...octetFormat) === -Infinity
        ? octetLength
        : Math.max(...octetFormat);

    for (let i = 0; i < resolvedOctetLength; i++) {
      if (typeof charset === "string") {
        octetFragments.push(randChar([charset].filter(Boolean).join("")));
      } else {
        const chars: string[] = [];

        for (let char in charset) {
          if (charset[char as keyof typeof charset])
            chars.push(characterSet[char as keyof typeof characterSet]);
        }

        octetFragments.push(randChar(chars.filter(Boolean).join("")));
      }
    }

    octetArr.push(octetFragments.join(""));
  }

  const id =
    // format
    octetArr
      .map((octet, i) => octet.slice(0, octetFormat[i]))
      // customize
      .map((octet, i, arr) => customize(octet, i, arr))
      // link the octets with `octetSeparator`
      .join(octetSeparator);

  return id;
}
