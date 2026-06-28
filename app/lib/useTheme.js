import React from 'react';

// حالة السمة المشتركة عبر صفحات MPA: تُحفظ في localStorage فتثبت بعد التنقّل بين الصفحات.
// (سابقًا كانت كل صفحة كِت تبدأ فاتحة دائمًا وتفقد اختيار المستخدم عند الانتقال.)
const KEY = 'm7-theme';

export function getStoredTheme() {
  try {
    const v = localStorage.getItem(KEY);
    if (v === 'dark' || v === 'light') return v;
  } catch (_) {}
  return 'light';
}

export function storeTheme(theme) {
  try { localStorage.setItem(KEY, theme === 'dark' ? 'dark' : 'light'); } catch (_) {}
}

// hook لمكوّنات الدوال (صفحات الكِت/المختبر): يعيد [dark, toggle].
export function useTheme() {
  const [dark, setDark] = React.useState(() => getStoredTheme() === 'dark');
  const toggle = React.useCallback(() => setDark((d) => !d), []);
  React.useEffect(() => { storeTheme(dark ? 'dark' : 'light'); }, [dark]);
  return [dark, toggle];
}
