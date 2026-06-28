import { describe, it, expect, beforeEach } from 'vitest';
import { navCommands, recipeCommands } from '../app/lib/navCommands.js';

describe('navCommands — أوامر التنقّل في ⌘K', () => {
  it('يُرجع أوامر الطبقات بالترتيب والبيانات الصحيحة', () => {
    const cmds = navCommands();
    expect(cmds.map((c) => c.id)).toEqual([
      'nav-home', 'nav-core', 'nav-form', 'nav-dashboard', 'nav-catalog', 'nav-lab',
    ]);
    expect(cmds.every((c) => c.label && c.icon && typeof c.action === 'function')).toBe(true);
  });

  it('يضيف أمر تبديل السمة فقط عند تمرير toggleTheme (وأيقونة حسب الوضع)', () => {
    expect(navCommands().find((c) => c.id === 'theme')).toBeUndefined();
    const theme = navCommands({ toggleTheme: () => {}, dark: true }).find((c) => c.id === 'theme');
    expect(theme).toBeTruthy();
    expect(theme.icon).toBe('sun'); // في الوضع الداكن يعرض أيقونة التحويل للفاتح
  });
});

describe('recipeCommands — قفز للوصفات بالـhash', () => {
  beforeEach(() => { window.location.hash = ''; });

  it('يحوّل الوصفات إلى أوامر تضبط الـhash', () => {
    const cmds = recipeCommands([{ id: 'store', title: 'المتجر' }, { id: 'crm', title: 'CRM' }]);
    expect(cmds.map((c) => c.id)).toEqual(['recipe-store', 'recipe-crm']);
    expect(cmds[0].label).toBe('المتجر');
    cmds[0].action();
    expect(window.location.hash).toBe('#store');
  });

  it('قائمة فارغة تُرجع مصفوفة فارغة', () => {
    expect(recipeCommands()).toEqual([]);
  });
});
