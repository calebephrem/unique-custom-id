import { defineConfig } from "tsup";

const isProduction = process.env["NODE_ENV"] === "production";

export default defineConfig({
	entry: ["src/index.ts", "src/cli/index.ts", "src/format/index.ts", "src/core/index.ts"],
	format: ["cjs", "esm"],
	outDir: "dist",
	dts: true,
	minifyWhitespace: isProduction,
	minifySyntax: isProduction,
});
