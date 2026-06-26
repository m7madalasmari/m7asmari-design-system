import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Standard React + Vite. Source lives in app/ (entry: app/main.jsx).
// CSS (tokens/themes/base/components) and fonts are imported from main.jsx.
export default defineConfig({
  plugins: [react()],
  server: { port: 8137 },
});
