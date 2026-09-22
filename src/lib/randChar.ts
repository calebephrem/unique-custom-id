import * as crypto from "crypto";

export function randChar(charset: string): string {
  return charset[crypto.randomBytes(1)[0]! % charset.length]!;
}
