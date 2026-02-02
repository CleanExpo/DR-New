import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // Temporarily disabled due to TS6307 errors
  splitting: false,
  sourcemap: true,
  clean: true,
  skipNodeModulesBundle: true,
});
