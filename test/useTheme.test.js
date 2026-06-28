import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { getStoredTheme, storeTheme, useTheme } from '../app/lib/useTheme.js';

describe('useTheme — تخزين السمة (localStorage)', () => {
  beforeEach(() => { localStorage.clear(); });

  it('الافتراضي فاتح حين لا قيمة محفوظة', () => {
    expect(getStoredTheme()).toBe('light');
  });

  it('يحفظ ويسترجع dark/light', () => {
    storeTheme('dark'); expect(getStoredTheme()).toBe('dark');
    storeTheme('light'); expect(getStoredTheme()).toBe('light');
  });

  it('يتجاهل القيم غير الصالحة ويعود للفاتح', () => {
    localStorage.setItem('m7-theme', 'blue');
    expect(getStoredTheme()).toBe('light');
  });
});

describe('useTheme — الخطّاف', () => {
  beforeEach(() => { localStorage.clear(); });

  it('يبدأ فاتحًا، يبدّل، ويُبقي الاختيار محفوظًا', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current[0]).toBe(false);
    act(() => result.current[1]());
    expect(result.current[0]).toBe(true);
    expect(getStoredTheme()).toBe('dark');
  });
});
