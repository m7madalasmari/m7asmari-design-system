import React from 'react';
import SectionHeader from '../docs/SectionHeader.jsx';
import AppHeader from './chrome/AppHeader.jsx';
import CommandPalette from '../components/organisms/CommandPalette.jsx';
import { useTheme } from './lib/useTheme.js';
import { navCommands, recipeCommands } from './lib/navCommands.js';
import { CATEGORIES, RECIPES } from '../kits/dashboard/index.js';

/**
 * DashboardKitPage — معرض Dashboard Kit (Vite MPA · entry: app/dashboardkit.jsx).
 * طبقة تشغيل فوق M7: مبدّل لوحات مصنّف حسب الفئة يعرض لوحة كاملة واحدة في كل مرة.
 * يستخدم الهيدر الموحّد AppHeader + فتات تنقّل + رابط hash عميق لكل لوحة (قابل للمشاركة).
 */
const validId = (h) => RECIPES.some((r) => r.id === h);

export default function DashboardKitPage() {
  const [dark, toggleTheme] = useTheme();
  const [active, setActive] = React.useState(() => {
    const h = (typeof window !== 'undefined' && window.location.hash.slice(1)) || '';
    return validId(h) ? h : RECIPES[0].id;
  });
  const [cmdOpen, setCmdOpen] = React.useState(false);
  const rootClass = 'ds' + (dark ? ' dark' : '');
  const activeRecipe = RECIPES.find((r) => r.id === active) || RECIPES[0];

  React.useEffect(() => {
    const onHash = () => { const h = window.location.hash.slice(1); if (validId(h)) setActive(h); };
    const onKey = (e) => { if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); setCmdOpen(true); } };
    window.addEventListener('hashchange', onHash);
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('hashchange', onHash); window.removeEventListener('keydown', onKey); };
  }, []);

  const select = (id) => { window.location.hash = id; }; // يحدّث الـURL ويُطلق onHash → setActive

  const breadcrumb = [
    { label: 'الرئيسية', href: '/' },
    'المجموعات',
    { label: 'مجموعة اللوحات', href: '/dashboardkit.html' },
    activeRecipe.title,
  ];
  const commands = [...navCommands({ toggleTheme, dark }), ...recipeCommands(RECIPES)];

  return (
    <div className={rootClass} dir="rtl" lang="ar">
      <AppHeader
        active="dashboard"
        dark={dark}
        themeLabel={dark ? 'فاتح' : 'داكن'}
        toggleTheme={toggleTheme}
        onOpenCmd={() => setCmdOpen(true)}
        breadcrumb={breadcrumb}
      />

      <main className="page">
        <section className="hero" data-screen-label="Hero">
          <span className="eyebrow">M7 · Dashboard Kit</span>
          <h1 className="h1">مجموعة لوحات التحكّم</h1>
        </section>

        <section className="section" data-screen-label="Switcher">
          <SectionHeader kicker="لوحات جاهزة" title="اختر لوحة" desc="تسع لوحات مبنية من كتالوج widgets محايد للمجال — رسوم، جداول، خطوط زمنية، كانبان — RTL وفي الوضعين." />
          <div className="fx col gap12">
            {CATEGORIES.map((cat) => (
              <div className="fx ac gap10 wrap" key={cat.id}>
                <span className="dk-cat">{cat.title}</span>
                {RECIPES.filter((r) => r.category === cat.id).map((r) => (
                  <button
                    key={r.id}
                    id={'dk-btn-' + r.id}
                    type="button"
                    className={'btn sm ' + (active === r.id ? 'brand' : 'ghost')}
                    aria-pressed={active === r.id}
                    onClick={() => select(r.id)}
                  >
                    {r.title}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="section" data-screen-label={activeRecipe.title}>
          {React.createElement(activeRecipe.component)}
        </section>
      </main>

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} commands={commands} placeholder="انتقل إلى لوحة أو مجموعة…" />
    </div>
  );
}
