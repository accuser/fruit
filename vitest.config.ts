import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		api: {
			host: '0.0.0.0',
			port: 5174,
		},
		alias: {
			$lib: path.resolve(__dirname, './src/lib'),
			$test: path.resolve(__dirname, './test'),
			$types: path.resolve(__dirname, './src/types'),
		},
		coverage: {
			exclude: ['*.ts', 'src/**/index.ts', 'src/**/*.test.ts', 'test/**/*.ts', 'coverage/**', 'dist/**'],
			provider: 'v8',
		},
		include: ['./src/**/*.test.ts', './test/**/*.test.ts'],
		setupFiles: ['./test/setup.ts'],
	},
});
