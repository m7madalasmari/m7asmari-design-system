import React from 'react';
import { css } from './lib/css.js';
import SectionHeader from '../docs/SectionHeader.jsx';
import AppHeader from './chrome/AppHeader.jsx';
import CommandPalette from '../components/organisms/CommandPalette.jsx';
import Input from '../components/atoms/Input.jsx';
import { useTheme } from './lib/useTheme.js';
import { navCommands } from './lib/navCommands.js';
import { CATS, LAYER_LABELS, WIDGETS } from './catalog-data.js';

/**
 * CatalogPage — Widget Catalog (Vite MPA · entry: app/catalog.jsx).
 * فهرس widgets النواة المحايدة للمجال، قابل للتصفّح والبحث — مدخل Core موحّد منفصل عن وصفات الـKits.
 * يستخدم الهيدر الموحّد AppHeader + فتات تنقّل، ويعيد استخدام أصناف النظام (panel/badge) بلا CSS جديد.
 */
export default function CatalogPage() {
  const [dark, toggleTheme] = useTheme();
  const [cmdOpen, setCmdOpen] = React.useState(false);
  const [q, setQ] = React.useState('');
  const rootClass = 'ds' + (dark ? ' dark' : '');

  React.useEffect(() => {
    const onKey = (e) => { if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); setCmdOpen(true); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const query = q.trim().toLowerCase();
  const match = (w) => !query || w.name.toLowerCase().includes(query) || w.label.includes(q.trim()) || w.desc.includes(q.trim());
  const filtered = WIDGETS.filter(match);

  return (
    <div className={rootClass} dir="rtl" lang="ar">
      <AppHeader
        active="catalog"
        dark={dark}
        themeLabel={dark ? 'فاتح' : 'داكن'}
        toggleTheme={toggleTheme}
        onOpenCmd={() => setCmdOpen(true)}
        breadcrumb={[{ label: 'الرئيسية', href: '/' }, 'كتالوج الودجت']}
      />

      <main className="page">
        <section className="hero" data-screen-label="Hero">
          <span className="eyebrow">M7 · Widget Catalog</span>
          <h1 className="h1">كتالوج الودجت</h1>
          <p className="lead">
            كل عنصر هنا <strong>ودجت نواة</strong> محايد للمجال يُعاد استخدامه في أي Kit بنفس التوكنز.
            أمّا <strong>الوصفات (Recipes)</strong> فهي تركيبات خاصّة بمجال داخل كل Kit (نماذج/لوحات)
            وتعيش في <code style={css('font-family:var(--font-mono);font-size:.9em')}>kits/&lt;domain&gt;/recipes</code> — ليست عناصر جديدة.
          </p>
        </section>

        <section className="section" data-screen-label="Search">
          <SectionHeader kicker="تصفّح وابحث" title="عناصر النواة" desc="ابحث بالاسم أو الوصف، أو افتح ⌘K للتنقّل بين الطبقات." />
          <div className="fx ac wrap" style={css('gap:16px;margin-bottom:8px')}>
            <div style={css('flex:1;min-width:240px;max-width:420px')}>
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث عن ودجت… (StatTile، خطّ زمني، قمع…)" aria-label="بحث في الكتالوج" />
            </div>
            <span className="t-sm" style={css('color:var(--text-muted)')}>{filtered.length} ودجت</span>
          </div>
        </section>

        {CATS.map((cat) => {
          const items = filtered.filter((w) => w.cat === cat.id);
          if (!items.length) return null;
          return (
            <section className="section" key={cat.id} data-screen-label={cat.title}>
              <SectionHeader kicker="فئة" title={cat.title} />
              <div className="grid cols3">
                {items.map((w) => (
                  <a
                    key={w.name}
                    className="panel panel-pad"
                    href={w.demo}
                    style={css('display:flex;flex-direction:column;gap:8px;text-decoration:none;color:inherit')}
                  >
                    <div className="fx ac wrap" style={css('justify-content:space-between;gap:8px')}>
                      <code style={css('font-family:var(--font-mono);font-size:13px;font-weight:600;color:var(--text-primary)')}>{w.name}</code>
                      <span className="badge">{LAYER_LABELS[w.layer]}</span>
                    </div>
                    <p className="subhead" style={css('margin:0')}>{w.label}</p>
                    <p className="t-sm" style={css('margin:0;color:var(--text-secondary)')}>{w.desc}</p>
                    <span className="t-sm" style={css('margin-top:auto;color:var(--brand);font-weight:700')}>عرض حيّ ↗</span>
                  </a>
                ))}
              </div>
            </section>
          );
        })}

        {filtered.length === 0 ? (
          <section className="section">
            <p className="t-sm" style={css('color:var(--text-muted)')}>لا نتائج للبحث «{q}».</p>
          </section>
        ) : null}
      </main>

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} commands={navCommands({ toggleTheme, dark })} placeholder="انتقل إلى طبقة…" />
    </div>
  );
}
