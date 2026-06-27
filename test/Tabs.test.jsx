import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Tabs from '../components/organisms/Tabs.jsx';

const TABS = [
  { id: 'one', label: 'الأول', panel: 'لوحة الأول' },
  { id: 'two', label: 'الثاني', panel: 'لوحة الثاني' },
  { id: 'three', label: 'الثالث', panel: 'لوحة الثالث' },
];

describe('Tabs', () => {
  it('يبني tablist/tab مع aria-selected', () => {
    render(<Tabs variant="pill" tabs={TABS} defaultActive="one" ariaLabel="تبويبات" showPanel />);
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-label', 'تبويبات');
    expect(screen.getByRole('tab', { name: 'الأول' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'الثاني' })).toHaveAttribute('aria-selected', 'false');
  });

  it('يعرض اللوحة المرتبطة بالتبويب النشط', () => {
    render(<Tabs variant="pill" tabs={TABS} defaultActive="one" showPanel />);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('لوحة الأول');
  });

  it('النقر يبدّل التحديد', () => {
    render(<Tabs variant="pill" tabs={TABS} defaultActive="one" showPanel />);
    fireEvent.click(screen.getByRole('tab', { name: 'الثاني' }));
    expect(screen.getByRole('tab', { name: 'الثاني' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('لوحة الثاني');
  });

  it('السهم لليسار ينتقل للتالي (RTL) والسهم لليمين للسابق', () => {
    render(<Tabs variant="seg" tabs={TABS} defaultActive="one" />);
    const first = screen.getByRole('tab', { name: 'الأول' });
    first.focus();
    fireEvent.keyDown(first, { key: 'ArrowLeft' });
    expect(screen.getByRole('tab', { name: 'الثاني' })).toHaveAttribute('aria-selected', 'true');
    fireEvent.keyDown(screen.getByRole('tab', { name: 'الثاني' }), { key: 'ArrowRight' });
    expect(screen.getByRole('tab', { name: 'الأول' })).toHaveAttribute('aria-selected', 'true');
  });

  it('roving tabindex: النشط 0 والبقية -1', () => {
    render(<Tabs variant="pill" tabs={TABS} defaultActive="one" />);
    expect(screen.getByRole('tab', { name: 'الأول' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('tab', { name: 'الثاني' })).toHaveAttribute('tabindex', '-1');
  });
});
