import React from 'react';
import { render, fireEvent, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DataTable from '../components/organisms/DataTable.jsx';

const COLS = [
  { key: 'name', label: 'الاسم', sortable: true },
  { key: 'n', label: 'رقم', align: 'center', num: true, sortable: true },
];
const ROWS = [
  { id: 1, name: 'ب', n: 3 },
  { id: 2, name: 'أ', n: 1 },
  { id: 3, name: 'ج', n: 2 },
];

describe('DataTable', () => {
  it('يعرض كل الصفوف والأعمدة', () => {
    const { container } = render(<DataTable columns={COLS} rows={ROWS} />);
    expect(container.querySelectorAll('tbody tr').length).toBe(3);
    expect(container.querySelectorAll('thead th').length).toBe(2);
  });

  it('النقر على ترويسة قابلة للفرز يضبط aria-sort ويرتّب تصاعديًا ثم تنازليًا', () => {
    const { container } = render(<DataTable columns={COLS} rows={ROWS} />);
    const th = container.querySelectorAll('thead th')[1]; // عمود الرقم
    expect(th.getAttribute('aria-sort')).toBe('none');

    fireEvent.click(within(th).getByRole('button'));
    expect(th.getAttribute('aria-sort')).toBe('ascending');
    expect(container.querySelectorAll('tbody tr')[0].querySelectorAll('td')[1].textContent).toBe('1');

    fireEvent.click(within(th).getByRole('button'));
    expect(th.getAttribute('aria-sort')).toBe('descending');
    expect(container.querySelectorAll('tbody tr')[0].querySelectorAll('td')[1].textContent).toBe('3');
  });

  it('الترقيم يقصّ الصفوف حسب pageSize ويعرض شريط ترقيم', () => {
    const many = Array.from({ length: 7 }, (_, i) => ({ id: i, name: 'س' + i, n: i }));
    const { container } = render(<DataTable columns={COLS} rows={many} pageSize={3} />);
    expect(container.querySelectorAll('tbody tr').length).toBe(3);
    expect(container.querySelector('nav[aria-label]')).toBeTruthy();
  });
});
