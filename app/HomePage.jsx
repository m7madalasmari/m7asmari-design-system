import React from 'react';
import { css } from './lib/css.js';
import AppHeader from './chrome/AppHeader.jsx';
import CommandPalette from '../components/organisms/CommandPalette.jsx';
import Icon from '../components/atoms/Icon.jsx';
import { useTheme } from './lib/useTheme.js';
import { navCommands } from './lib/navCommands.js';

/**
 * HomePage — الصفحة الرئيسية (هاب) لنظام M7 (Vite MPA · entry: app/home.jsx).
 * مدخل موحّد لكل الطبقات: النواة، الكتالوج، المجموعات (Kits)، المختبر، التوثيق.
 * طبقة تنقّل فقط فوق توكنز/أصناف النظام (panel/badge/topbar) — لا هوية أو CSS جديد.
 * إضافة Kit جديد لاحقًا = بطاقة جديدة في LAYERS فقط.
 */
const GH = 'https://github.com/m7madalasmari/m7asmari-design-system/blob/main/';

const LAYERS = [
  { title: 'النواة', tag: 'Core', icon: 'layers', href: '/core.html',
    desc: 'الأسس والمكوّنات والأنماط والمرجع — نظام التصميم الكامل.' },
  { title: 'كتالوج الودجت', tag: 'Catalog', icon: 'layout-grid', href: '/catalog.html',
    desc: 'فهرس widgets النواة المحايدة للمجال، قابل للتصفّح والبحث.' },
  { title: 'مجموعة النماذج', tag: 'Form Kit', icon: 'file-text', href: '/formkit.html',
    desc: 'وصفات نماذج عربية جاهزة (مصادقة/تفاعل/بيانات) فوق M7.' },
  { title: 'مجموعة اللوحات', tag: 'Dashboard Kit', icon: 'bar-chart-2', href: '/dashboardkit.html',
    desc: 'لوحات تحكّم RTL من كتالوج widgets محايد للمجال.' },
  { title: 'المختبر', tag: 'Lab', icon: 'sparkles', href: '/lab.html',
    desc: 'تجارب وعائلات widgets حديثة قبل ترقيتها إلى النواة.' },
  { title: 'التوثيق', tag: 'Docs', icon: 'file-text', href: GH + 'ARCHITECTURE.md', external: true,
    desc: 'المعمارية والتوكنز وتقارير الـKits وسجلّ التغييرات.' },
];

export default function HomePage() {
  const [dark, toggleTheme] = useTheme();
  const [cmdOpen, setCmdOpen] = React.useState(false);
  const rootClass = 'ds' + (dark ? ' dark' : '');

  React.useEffect(() => {
    const onKey = (e) => { if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); setCmdOpen(true); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className={rootClass} dir="rtl" lang="ar">
      <AppHeader
        active="home"
        dark={dark}
        themeLabel={dark ? 'فاتح' : 'داكن'}
        toggleTheme={toggleTheme}
        onOpenCmd={() => setCmdOpen(true)}
      />

      <main className="page">
        <section className="hero" data-screen-label="Hero">
          <span className="eyebrow">نظام M7</span>
          <h1 className="h1">M7 — نظام تصميم وKits عربي</h1>
          <p className="lead">
            نقطة انطلاق واحدة لكل الطبقات: النواة (التوكنز والمكوّنات)، كتالوج الودجت،
            ومجموعات التشغيل (Kits) فوقها. اختر طبقة للبدء، أو افتح ⌘K للتنقّل من أي مكان.
          </p>
        </section>

        <section className="section" data-screen-label="Layers">
          <div className="grid cols3">
            {LAYERS.map((l) => (
              <a
                key={l.tag}
                className="panel panel-pad"
                href={l.href}
                {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                style={css('display:flex;flex-direction:column;gap:10px;text-decoration:none;color:inherit;min-height:150px')}
              >
                <div className="fx ac wrap" style={css('justify-content:space-between;gap:8px')}>
                  <span className="fx ac" style={css('gap:10px;color:var(--brand)')}>
                    <Icon name={l.icon} size={22} />
                  </span>
                  <span className="badge">{l.tag}</span>
                </div>
                <p className="subhead" style={css('margin:0;font-size:18px')}>{l.title}</p>
                <p className="t-sm" style={css('margin:0;color:var(--text-secondary)')}>{l.desc}</p>
                <span className="t-sm" style={css('margin-top:auto;color:var(--brand);font-weight:700')}>
                  {l.external ? 'فتح ↗' : 'دخول ←'}
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} commands={navCommands({ toggleTheme, dark })} placeholder="انتقل إلى طبقة…" />
    </div>
  );
}
