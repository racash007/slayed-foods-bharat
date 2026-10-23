import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: { allowedHosts: ['.trycloudflare.com'] },
  test: { environment: 'jsdom', setupFiles: './src/testSetup.ts' },
});
