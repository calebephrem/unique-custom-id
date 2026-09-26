import type { Opts } from "../types/opts.js";

export const defaultOpts: Opts = {
  octetLength: 8,
  octets: 4,
  octetSeparator: "",
  octetFormat: [],

  charset: {
    hex: true,
  },

  customize: (octet: string) => octet,
};
