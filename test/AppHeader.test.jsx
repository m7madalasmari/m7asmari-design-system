import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AppHeader from '../app/chrome/AppHeader.jsx';

const noop = () => {};

describe('AppHeader — الهيدر الموحّد', () => {
  it('يعرض العلامة وروابط كل الطبقات والفتات', () => {
    render(
      <AppHeader active="core" dark={false} themeLabel="داكن" toggleTheme={noop} onOpenCmd={noop}
        breadcrumb={[{ label: 'الرئيسية', href: '/' }, 'النواة']} />
    );
    expect(screen.getByText('M7asmari')).toBeTruthy();
    ['النواة', 'المجموعات', 'الكتالوج', 'المختبر', 'التوثيق'].forEach((t) => {
      expect(screen.getAllByText(t).length).toBeGreaterThan(0);
    });
    // الفتات يربط الرئيسية كرابط
    expect(screen.getByText('الرئيسية').closest('a').getAttribute('href')).toBe('/');
  });

  it('مُطلِق «المجموعات» زرّ متاح بالكيبورد يفتح القائمة (إصلاح a11y)', () => {
    render(<AppHeader active="dashboard" dark={false} themeLabel="داكن" toggleTheme={noop} onOpenCmd={noop} />);
    const trigger = screen.getByRole('button', { name: /المجموعات/ });
    expect(trigger.tagName).toBe('BUTTON');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText('مجموعة النماذج')).toBeTruthy();
    expect(screen.getByText('مجموعة اللوحات')).toBeTruthy();
  });

  it('يربط النواة بـ/core.html والكتالوج بـ/catalog.html', () => {
    render(<AppHeader active="home" dark={false} themeLabel="داكن" toggleTheme={noop} onOpenCmd={noop} />);
    expect(screen.getByText('النواة').getAttribute('href')).toBe('/core.html');
    expect(screen.getByText('الكتالوج').getAttribute('href')).toBe('/catalog.html');
  });
});
