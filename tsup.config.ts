import { defineConfig } from "tsup";

const isProduction = process.env["NODE_ENV"] === "production";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["cjs", "esm"],
	outDir: "dist",
	dts: true,
	minifyWhitespace: isProduction,
	minifySyntax: isProduction,
});
