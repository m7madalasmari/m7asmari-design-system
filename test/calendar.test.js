import { describe, it, expect } from 'vitest';
import { buildMonth } from '../app/lib/calendar.js';

describe('buildMonth', () => {
  it('عدد الخلايا من مضاعفات 7', () => {
    const cells = buildMonth(2026, 5, 14); // يونيو 2026
    expect(cells.length % 7).toBe(0);
  });

  it('يضع علامة selected على اليوم المحدّد فقط', () => {
    const cells = buildMonth(2026, 5, 14);
    const sel = cells.filter((c) => c.selected);
    expect(sel).toHaveLength(1);
    expect(sel[0].day).toBe(14);
  });

  it('يضع علامة today عند تطابق السنة والشهر واليوم', () => {
    const cells = buildMonth(2026, 5, 14, { year: 2026, month: 5, day: 8 });
    const today = cells.filter((c) => c.today);
    expect(today).toHaveLength(1);
    expect(today[0].day).toBe(8);
  });

  it('أيام الشهر الحالية غير مُعتَّمة، وأيام الحشو مُعتَّمة', () => {
    const cells = buildMonth(2026, 5, 14);
    const real = cells.filter((c) => !c.muted);
    expect(real).toHaveLength(30); // يونيو 30 يومًا
    expect(real.every((c) => typeof c.day === 'number')).toBe(true);
  });

  it('تغيير المحدّد ينقل العلامة', () => {
    const a = buildMonth(2026, 5, 3).find((c) => c.selected);
    const b = buildMonth(2026, 5, 20).find((c) => c.selected);
    expect(a.day).toBe(3);
    expect(b.day).toBe(20);
  });
});
