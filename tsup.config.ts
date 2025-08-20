import { defineConfig } from 'tsup';

export default defineConfig({
	clean: true,
	dts: true,
	entry: ['./src/index.ts'],
	format: ['esm'],
	outDir: 'dist',
	outExtension: () => ({ js: '.mjs' }),
	platform: 'neutral',
	external: ['async_hooks', 'node:async_hooks'],
});
