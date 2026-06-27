import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import ThemeBuilderSection from '../sections/reference/ThemeBuilderSection.jsx';

const KEY = 'm7-theme-builder';

describe('ThemeBuilderSection', () => {
  beforeEach(() => { try { localStorage.clear(); } catch (_) {} });

  it('يعرض الترويسة ولوحة الضبط والمعاينة', () => {
    const { container } = render(<ThemeBuilderSection />);
    expect(screen.getByText('مُخصِّص السمة')).toBeTruthy();
    expect(screen.getByLabelText('خيارات تخصيص السمة')).toBeTruthy();
    expect(container.querySelector('.tb-preview')).toBeTruthy();
  });

  it('يطبّق متغيّرات CSS على حاوية المعاينة', () => {
    const { container } = render(<ThemeBuilderSection />);
    const preview = container.querySelector('.tb-preview');
    expect(preview.style.getPropertyValue('--brand')).toBe('#00a6ef');
    expect(preview.style.getPropertyValue('--radius-md')).toBe('14px');
    expect(preview.className).toContain('card-bordered');
  });

  it('تبديل الوضع إلى داكن يضيف صنف dark للمعاينة', () => {
    const { container } = render(<ThemeBuilderSection />);
    const modeGroup = screen.getByRole('group', { name: 'الوضع' });
    fireEvent.click(within(modeGroup).getByText('داكن'));
    expect(container.querySelector('.tb-preview').className).toContain('dark');
  });

  it('تغيير الحوافّ إلى حادّ يحدّث ‎--radius-md‎ في المعاينة', () => {
    const { container } = render(<ThemeBuilderSection />);
    const radiusGroup = screen.getByRole('group', { name: 'الحوافّ' });
    fireEvent.click(within(radiusGroup).getByText('حادّ'));
    expect(container.querySelector('.tb-preview').style.getPropertyValue('--radius-md')).toBe('6px');
  });

  it('يحفظ الإعداد في localStorage عند التغيير', () => {
    const { container } = render(<ThemeBuilderSection />);
    const densGroup = screen.getByRole('group', { name: 'الكثافة' });
    fireEvent.click(within(densGroup).getByText('فسيح'));
    const saved = JSON.parse(localStorage.getItem(KEY));
    expect(saved.density).toBe('spacious');
    expect(container.querySelector('.tb-preview').style.getPropertyValue('--tb-pad')).toBe('32px');
  });

  it('يستعيد الإعداد المحفوظ عند إعادة التركيب', () => {
    localStorage.setItem(KEY, JSON.stringify({ primary: '#16bd74', mode: 'dark' }));
    const { container } = render(<ThemeBuilderSection />);
    const preview = container.querySelector('.tb-preview');
    expect(preview.style.getPropertyValue('--brand')).toBe('#16bd74');
    expect(preview.className).toContain('dark');
  });

  it('إعادة الضبط تعيد المتغيّرات للافتراضي', () => {
    const { container } = render(<ThemeBuilderSection />);
    const radiusGroup = screen.getByRole('group', { name: 'الحوافّ' });
    fireEvent.click(within(radiusGroup).getByText('حبّة'));
    expect(container.querySelector('.tb-preview').style.getPropertyValue('--radius-md')).toBe('24px');
    fireEvent.click(screen.getByText('إعادة الضبط'));
    expect(container.querySelector('.tb-preview').style.getPropertyValue('--radius-md')).toBe('14px');
  });

  it('نسخ CSS يُظهر تغذية راجعة', () => {
    render(<ThemeBuilderSection />);
    fireEvent.click(screen.getByText('نسخ CSS'));
    expect(screen.getByRole('status').textContent).toContain('CSS');
  });
});
