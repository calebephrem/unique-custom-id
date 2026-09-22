import { describe, expect, it } from "bun:test";
import { characterSet } from "../src/data/charset.js";
import ucid from "../src/index.js";

describe("ucid", () => {
  it("returns id with length 32", () => {
    expect(ucid()).toHaveLength(32);
    expect(ucid()).toHaveLength(32);
    expect(ucid()).toHaveLength(32);
  });

  it("returns id with only hex characters", () => {
    for (let char of ucid()) {
      expect(characterSet.hex).toInclude(char);
    }
  });
});
