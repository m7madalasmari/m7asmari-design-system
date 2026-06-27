import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// jsdom لا يطبّق window.scrollTo (يسجّل "Not implemented") — نضع بديلًا فارغًا.
window.scrollTo = () => {};

// تنظيف DOM بعد كل اختبار.
afterEach(() => cleanup());
