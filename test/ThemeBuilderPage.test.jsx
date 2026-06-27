import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import ThemeBuilderPage from '../app/ThemeBuilderPage.jsx';

describe('ThemeBuilderPage — الصفحة المستقلة', () => {
  beforeEach(() => { try { localStorage.clear(); } catch (_) {} });

  it('تعرض هيكل ‎.ds‎ والترويسة ومُخصِّص السمة بداخلها', () => {
    const { container } = render(<ThemeBuilderPage />);
    expect(container.querySelector('.ds')).toBeTruthy();
    expect(container.querySelector('.tb-preview')).toBeTruthy();
    expect(screen.getByText('مُخصِّص السمة')).toBeTruthy();
  });

  it('فيها رابط رجوع إلى نظام التصميم', () => {
    render(<ThemeBuilderPage />);
    const back = screen.getByRole('link', { name: 'العودة إلى نظام التصميم' });
    expect(back.getAttribute('href')).toBe('/');
  });
});
