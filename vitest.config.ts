import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		alias: {
			$lib: path.resolve(__dirname, './src/lib'),
			$types: path.resolve(__dirname, './src/types'),
		},
		coverage: {
			exclude: ['./*.ts', './src/**/index.ts', './src/**/*.test.ts', 'dist', 'test'],
			provider: 'v8',
		},
		include: ['./src/**/*.test.ts', 'test/**/*.test.ts'],
		setupFiles: ['./test/setup.ts'],
	},
});
