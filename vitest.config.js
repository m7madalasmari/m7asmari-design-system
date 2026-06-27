import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// اختبارات المكوّنات والمنطق — jsdom + Testing Library.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.js'],
    include: ['test/**/*.test.{js,jsx}'],
    css: false,
  },
});
