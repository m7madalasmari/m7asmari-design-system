import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';

// تطبيق متعدّد الصفحات (MPA): الصفحة الرئيسية (نظام التصميم) + صفحة مُخصِّص السمة + صفحة منصّة الطلبات.
// المصدر في app/ — المداخل: app/main.jsx (index.html)، app/theme-builder.jsx (theme-builder.html)،
// app/requests.jsx (requests.html).
const root = fileURLToPath(new URL('.', import.meta.url));
const at = (p) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  root,
  plugins: [react()],
  server: { port: 8137 },
  build: {
    rollupOptions: {
      input: {
        main: at('./index.html'),
        'theme-builder': at('./theme-builder.html'),
        requests: at('./requests.html'),
        formkit: at('./formkit.html'),
      },
    },
  },
});
