// أوامر التنقّل العامّة للوحة الأوامر (⌘K) — موحّدة عبر كل الصفحات.
// تجعل ⌘K بديلًا كاملًا للتنقّل حين تنطوي روابط الهيدر على الشاشات الصغيرة.
const go = (href) => () => { window.location.href = href; };

export function navCommands({ toggleTheme, dark } = {}) {
  const cmds = [
    { id: 'nav-home', label: 'الرئيسية (الهاب)', icon: 'home', action: go('/') },
    { id: 'nav-core', label: 'النواة — نظام التصميم', icon: 'layers', action: go('/core.html') },
    { id: 'nav-form', label: 'مجموعة النماذج (Form Kit)', icon: 'file-text', action: go('/formkit.html') },
    { id: 'nav-dashboard', label: 'مجموعة اللوحات (Dashboard Kit)', icon: 'layout-grid', action: go('/dashboardkit.html') },
    { id: 'nav-catalog', label: 'كتالوج الودجت (Widget Catalog)', icon: 'layers', action: go('/catalog.html') },
    { id: 'nav-lab', label: 'مختبر المكوّنات (Lab)', icon: 'sparkles', action: go('/lab.html') },
  ];
  if (toggleTheme) cmds.push({ id: 'theme', label: 'تبديل السمة', icon: dark ? 'sun' : 'moon', action: toggleTheme });
  return cmds;
}

// أوامر القفز إلى وصفات كِت معيّن عبر رابط الـhash (تُدمج مع navCommands).
export function recipeCommands(recipes = []) {
  return recipes.map((r) => ({
    id: 'recipe-' + r.id,
    label: r.title,
    icon: 'chevron-left',
    action: () => { window.location.hash = r.id; },
  }));
}
