import { describe, expect, it } from "bun:test";
import { characterSet } from "../src/data/charset.js";
import ucid from "../src/index.js";

describe("ucid/charset", () => {
  it("returns id only containing the specified charset", () => {
    const charset = Array.from(
      characterSet.numbers + characterSet.uppercase,
    ).join("");

    for (let char of ucid({ charset: charset })) {
      expect(charset).toInclude(char);
    }
  });

  it("returns id with containing only given charset option(s)", () => {
    for (let char of ucid({ charset: { lowercase: true } })) {
      expect(characterSet.lowercase).toInclude(char);
    }

    for (let char of ucid({ charset: { uppercase: true } })) {
      expect(characterSet.uppercase).toInclude(char);
    }

    for (let char of ucid({ charset: { numbers: true } })) {
      expect(characterSet.numbers).toInclude(char);
    }

    for (let char of ucid({ charset: { hex: true } })) {
      expect(characterSet.hex).toInclude(char);
    }

    for (let char of ucid({ charset: { symbols: true } })) {
      expect(characterSet.symbols).toInclude(char);
    }

    for (let char of ucid({ charset: { uppercase: true, symbols: true } })) {
      expect(characterSet.uppercase + characterSet.symbols).toInclude(char);
    }
  });
});
