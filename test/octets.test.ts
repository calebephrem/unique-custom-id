import { describe, expect, it } from "bun:test";
import ucid from "../src/index.js";

describe("ucid/octets", () => {
  it("returns id with n number of octets", () => {
    expect(
      ucid({ octets: 3, octetLength: 10, octetSeparator: "" }),
    ).toHaveLength(30);

    expect(
      ucid({ octets: 4, octetLength: 10, octetSeparator: "" }),
    ).toHaveLength(40);

    expect(
      ucid({ octets: 5, octetLength: 10, octetSeparator: "" }),
    ).toHaveLength(50);

    expect(
      ucid({ octets: 10, octetLength: 10, octetSeparator: "" }),
    ).toHaveLength(100);
  });
});

describe("ucid/octetLength", () => {
  it("returns id with n lengthed octets", () => {
    expect(
      ucid({ octets: 10, octetLength: 3, octetSeparator: "" }),
    ).toHaveLength(30);

    expect(
      ucid({ octets: 10, octetLength: 4, octetSeparator: "" }),
    ).toHaveLength(40);

    expect(
      ucid({ octets: 10, octetLength: 5, octetSeparator: "" }),
    ).toHaveLength(50);

    expect(
      ucid({ octets: 10, octetLength: 10, octetSeparator: "" }),
    ).toHaveLength(100);
  });
});

describe("ucid/octetSeparator", () => {
  it("returns id with the specified octet separator", () => {
    expect(ucid({ octetSeparator: "-" })).toInclude("-");
    expect(ucid({ octetSeparator: "=" })).toInclude("=");
    expect(ucid({ octetSeparator: "~" })).toInclude("~");
    expect(ucid({ octetSeparator: "." })).toInclude(".");
  });
});

describe("ucid/octetFormat", () => {
  it("returns id with the specified octet format", () => {
    const formats = [
      [1, 2, 3],
      [8, 4, 4, 12],
      [10, 5, 5, 15],
      [9, 4, 6, 2],
      [8, 16, 24, 20, 12, 16, 14, 15],
    ];

    // for (let i = 0; i < formats.length; i++){
    //   const id = ucid({ octets: formats[i].length })
    // }
    //
    for (let format of formats) {
      const octets = ucid({
        octetFormat: format,
        octets: format.length,
        octetSeparator: "-",
      }).split("-");

      for (let i = 0; i < format.length; i++) {
        expect(octets[i]).toHaveLength(format[i]!);
      }
    }
  });
});
