import { describe, expect, it } from "bun:test";
import ucid from "../src/index.js";

describe("ucid/customize", () => {
  it("returns id altered by calling the customize() function", () => {
    expect(
      ucid({
        octets: 1,
        octetLength: 10,
        customize: (octet) => octet.slice(0, 5),
      }),
    ).toHaveLength(5);

    expect(
      ucid({ customize: (octet, i) => (i === 0 ? "c" + octet : octet) }),
    ).toStartWith("c");
  });
});
