import { describe, it, expect } from 'vitest';
import { sortRows, nextSortDir, ariaSortFor } from '../app/lib/sort.js';

const ROWS = [
  { name: 'إيثيريوم', balN: 2.4 },
  { name: 'USDC', balN: 820 },
  { name: 'أربيتروم', balN: 145.5 },
];

describe('sortRows', () => {
  it('بدون مفتاح يُعيد نسخة بنفس الترتيب', () => {
    const out = sortRows(ROWS, null);
    expect(out).toEqual(ROWS);
    expect(out).not.toBe(ROWS); // نسخة لا تعدّل الأصل
  });

  it('يفرز الأرقام تصاعديًا وتنازليًا', () => {
    expect(sortRows(ROWS, 'balN', 1).map((r) => r.balN)).toEqual([2.4, 145.5, 820]);
    expect(sortRows(ROWS, 'balN', -1).map((r) => r.balN)).toEqual([820, 145.5, 2.4]);
  });

  it('يفرز النصوص بترتيب عربي', () => {
    const names = sortRows(ROWS, 'name', 1).map((r) => r.name);
    expect(names[0]).toBe('USDC'.localeCompare('أربيتروم', 'ar') < 0 ? 'USDC' : names[0]);
    expect(sortRows(ROWS, 'name', 1)).toHaveLength(3);
  });

  it('لا يعدّل المصفوفة الأصلية', () => {
    const copy = [...ROWS];
    sortRows(ROWS, 'balN', 1);
    expect(ROWS).toEqual(copy);
  });
});

describe('nextSortDir', () => {
  it('عمود جديد يبدأ تصاعديًا', () => {
    expect(nextSortDir('name', 1, 'balN')).toBe(1);
  });
  it('نفس العمود يعكس الاتجاه', () => {
    expect(nextSortDir('balN', 1, 'balN')).toBe(-1);
    expect(nextSortDir('balN', -1, 'balN')).toBe(1);
  });
});

describe('ariaSortFor', () => {
  it('none لغير العمود النشط، وtالاتجاه للعمود النشط', () => {
    expect(ariaSortFor('balN', 1, 'name')).toBe('none');
    expect(ariaSortFor('balN', 1, 'balN')).toBe('ascending');
    expect(ariaSortFor('balN', -1, 'balN')).toBe('descending');
  });
});
