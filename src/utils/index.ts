// @ts-ignore
import * as crypto from 'crypto';

/**
 * Returns a formatted timestamp string using a custom format.
 * @param {string} [format='yyyymmdd']
 * @returns {string}
 */
export function timeStamp(format: string | null = "yyyymmdd") {
	if (format) {
		const now = new Date();
		const pad = (n: number, len = 2) => String(n).padStart(len, "0");
		const tzOffset = () => {
			const off = -now.getTimezoneOffset();
			const sign = off >= 0 ? "+" : "-";
			const hh = pad(Math.floor(Math.abs(off) / 60));
			const mm = pad(Math.abs(off) % 60);
			return `${sign}${hh}:${mm}`;
		};

		const replacements: { [key: string]: string } = {
			yyyy: String(now.getFullYear()),
			yy: String(now.getFullYear()).slice(-2),
			mm: pad(now.getMonth() + 1),
			dd: pad(now.getDate()),
			hh: pad(now.getHours()),
			min: pad(now.getMinutes()),
			ss: pad(now.getSeconds()),
			ms: pad(Math.floor(now.getMilliseconds() / 10)),
			unix: String(Math.floor(now.getTime() / 1000)),
			epoch: String(Math.floor(now.getTime() / 1000)),
			military: `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`,
			iso: now.toISOString(),
			utc: now.toISOString().replace(/\.\d+Z$/, "Z"),
			rfc: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}${tzOffset()}`,
			rfc3339: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}${tzOffset()}`,
			filetime: String(now.getTime() * 10000 + 116444736000000000),
			winft: String(now.getTime() * 10000 + 116444736000000000),
		};

		return format.replace(
			/yyyy|yy|mm|dd|hh|min|ss|ms|unix|epoch|military|iso|utc|rfc|rfc3339|filetime|winft/g,
			(t) => replacements[t] ?? t,
		);
	}
}

/**
 * Resolves the length of an octet at a specific index based on the format.
 * @param {string|Array<number>} octetFormat
 * @param {number} i
 * @param {number} defaultLen
 * @param {string} sep
 * @returns {number}
 */
export function resolveFormat(octetFormat: string | number[], i: number, defaultLen: number, sep: string) {
	if (Array.isArray(octetFormat)) return octetFormat[i] !== undefined ? +octetFormat[i] : defaultLen;
	const str = String(octetFormat);
	const split = str.includes(sep) ? str.split(sep) : undefined;
	if (split) return split[i] !== undefined ? +split[i] : defaultLen;
	return str[i] !== undefined ? +str[i] : defaultLen;
}

/**
 * Securely picks a random character from a given charset.
 * @param {string} charset
 * @returns {string}
 */
export const secureRandChar = (charset: string) => charset[crypto.randomBytes(1)[0] % charset.length];
