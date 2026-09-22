export const map = {
  uuid: {
    octets: 5,
    octetFormat: [8, 4, 4, 4, 12],
    charset: { hex: true },
    octetSeparator: "-",
  },

  nanoid: {
    octets: 1,
    octetLength: 21,
    charset: { uppercase: true, lowercase: true, numbers: true },
    octetSeparator: "",
  },

  ksuid: {
    octets: 1,
    octetLength: 27,
    charset: { uppercase: true, lowercase: true, numbers: true },
    octetSeparator: "",
  },

  cuid: {
    octets: 3,
    customize: (octet: string, i: number) => (i === 0 ? `c${octet}` : octet),
    octetSeparator: "",
  },

  ulid: {
    octets: 2,
    octetLength: 13,
    charset: { uppercase: true, lowercase: false, numbers: true },
    octetSeparator: "",
  },

  snowflake: {
    octets: 3,
    octetLength: 6,
    charset: { numbers: true },
    octetSeparator: "",
  },

  sha: { octets: 5, octetSeparator: "", charset: { hex: true } },

  sha256: { octets: 8, octetSeparator: "", charset: { hex: true } },

  sha512: {
    octets: 16,
    octetLength: 8,
    octetSeparator: "",
    charset: { hex: true },
  },

  md5: {
    octets: 1,
    octetLength: 32,
    octetSeparator: "",
    charset: { hex: true },
  },

  objectid: {
    octets: 3,
    octetFormat: [8, 4, 8],
    charset: { hex: true },
    octetSeparator: "",
  },

  objectid24: {
    octets: 1,
    octetLength: 24,
    charset: { hex: true },
    octetSeparator: "",
  },

  objectid32: {
    octets: 1,
    octetLength: 32,
    charset: { hex: true },
    octetSeparator: "",
  },

  numeric: {
    charset: { numbers: true },
    octets: 1,
    octetLength: 16,
    octetSeparator: "",
  },

  alphanumeric: {
    charset: { uppercase: false, lowercase: true, numbers: true },
    octets: 1,
    octetLength: 16,
    octetSeparator: "",
  },

  alpha: {
    charset: { uppercase: true, lowercase: true, numbers: false },
    octets: 1,
    octetLength: 16,
    octetSeparator: "",
  },

  "jwt-id": {
    octets: 3,
    octetLength: 16,
    octetSeparator: ".",
    charset: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_",
  },

  "bcrypt-id": {
    octets: 1,
    octetLength: 60,
    charset: "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    octetSeparator: "",
  },

  "argon-id": {
    octets: 1,
    octetLength: 64,
    charset:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    octetSeparator: "",
  },

  "host-id": { octets: 4, octetLength: 6, charset: { hex: true } },

  "session-id": {
    charset: { uppercase: true, lowercase: true, numbers: true },
    octets: 2,
    octetLength: 12,
  },

  short: { octets: 1, octetLength: 8, octetSeparator: "" },

  mini: { octets: 1, octetLength: 6, octetSeparator: "" },

  ghost: { octets: 2, octetLength: 9, octetSeparator: "_" },

  phantom: { octets: 3, octetLength: 10, octetSeparator: "_" },

  ninja: {
    octets: 3,
    octetLength: 7,
    customize: (octet: string, i: number) => (i === 0 ? `n${octet}` : octet),
    octetSeparator: "-",
  },

  "short-uuid": {
    octets: 4,
    octetFormat: [8, 4, 4, 8],
    charset: { hex: true },
  },

  hex: { charset: { hex: true } },

  "short-ucid": { octets: 3 },

  snake: { octets: 3, charset: { hex: true }, octetSeparator: "_" },

  slug: { octets: 2, octetLength: 6, octetSeparator: "-" },

  dna: {
    octets: 1,
    octetLength: 32,
    charset: { uppercase: true, lowercase: true, numbers: true },
  },

  leet: { octets: 1, octetLength: 24, charset: "aeiou1234567890" },

  caps: {
    charset: { uppercase: true, lowercase: true, numbers: true },
    octets: 4,
    octetLength: 6,
  },

  wordy: {
    octets: 3,
    octetLength: 7,
    charset: { uppercase: true, lowercase: true, numbers: false },
    octetSeparator: "-",
  },
};

export default map;
