import type { characterSet } from "../data/charset.js";

export interface Opts {
  octets: number;
  octetLength: number;
  octetSeparator: string;
  charset: string | Partial<Record<keyof typeof characterSet, boolean>>;
  octetFormat: number[];
  customize: (octet: string, i: number, arr: string[]) => string;
}
