import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from '../app/App.jsx';

// اختبار دخان: يركّب التطبيق كاملًا بعد تفكيك المرحلة الثانية ويتأكّد من
// عدم وجود أخطاء/تحذيرات console (مؤشّر انحدار للأقسام التي تقرأ V).
describe('App — اختبار دخان', () => {
  let errSpy, warnSpy;
  beforeEach(() => {
    errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterEach(() => { errSpy.mockRestore(); warnSpy.mockRestore(); });

  it('يُركّب كامل الصفحة بلا أخطاء أو تحذيرات console', () => {
    render(<App />);
    expect(screen.getAllByText('M7asmari').length).toBeGreaterThan(0);
    // المكوّنات المُستخرَجة موجودة (نوافذ/أدراج بحالة مغلقة → مخفيّة عن شجرة الوصولية)
    expect(screen.getAllByRole('dialog', { hidden: true }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('tablist').length).toBeGreaterThan(0);
    expect(errSpy.mock.calls).toEqual([]);
    expect(warnSpy.mock.calls).toEqual([]);
  });
});
