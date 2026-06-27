import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from '../components/molecules/Pagination.jsx';

describe('Pagination', () => {
  it('يعرض الصفحات مع aria-current للحالية', () => {
    render(<Pagination total={5} defaultPage={1} />);
    expect(screen.getByRole('navigation', { name: 'ترقيم الصفحات' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'الصفحة 1' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: 'الصفحة 2' })).not.toHaveAttribute('aria-current');
  });

  it('النقر على صفحة يحدّثها ويستدعي onChange', () => {
    const onChange = vi.fn();
    render(<Pagination total={5} defaultPage={1} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'الصفحة 3' }));
    expect(onChange).toHaveBeenCalledWith(3);
    expect(screen.getByRole('button', { name: 'الصفحة 3' })).toHaveAttribute('aria-current', 'page');
  });

  it('لا يتجاوز الحدود', () => {
    const onChange = vi.fn();
    render(<Pagination total={3} defaultPage={3} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'الصفحة التالية' })); // → يتجاوز آخر صفحة
    expect(onChange).not.toHaveBeenCalled();
  });
});
