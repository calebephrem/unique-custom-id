type CustomizeFunction = (raw: string, i: number) => void;
type ConditionFunction = (allowed: () => boolean, msg: (msg: string | Error) => string | Error) => string | Error;

export interface CoreOptions {
	octets: number;
	octetLength: number;
	octetFormat: string;
	uppercase: boolean;
	lowercase: boolean;
	numbers: boolean;
	symbols: boolean;
	includeOnly: string | null;
	octetSeparator: string;
	timestamp: string | null;
	timestampFormat: string | null;
	template: string | null;
	prefix: string;
	suffix: string;
	instances: number;
	verbose: boolean;
	customize: CustomizeFunction | null;
	condition: ConditionFunction | null;
}
