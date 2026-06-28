import React from 'react';
import { css } from './lib/css.js';
import SectionHeader from '../docs/SectionHeader.jsx';
import { CATEGORIES, RECIPES } from '../kits/form/index.js';
import Field from '../components/molecules/Field.jsx';
import Input from '../components/atoms/Input.jsx';
import Textarea from '../components/atoms/Textarea.jsx';
import PasswordInput from '../components/atoms/PasswordInput.jsx';
import Checkbox from '../components/atoms/Checkbox.jsx';
import Switch from '../components/atoms/Switch.jsx';
import RadioGroup from '../components/molecules/RadioGroup.jsx';
import Select from '../components/organisms/Select.jsx';
import PhoneInput from '../components/molecules/PhoneInput.jsx';
import AppHeader from './chrome/AppHeader.jsx';
import CommandPalette from '../components/organisms/CommandPalette.jsx';
import { useTheme } from './lib/useTheme.js';
import { navCommands, recipeCommands } from './lib/navCommands.js';

/**
 * FormKitPage — معرض Form Kit (Vite MPA · entry: app/formkit.jsx).
 * طبقة تشغيل فوق M7: لمحة عن مكوّنات الحقول وحالاتها + مجموعة وصفات نماذج عربية مصنّفة.
 * يعيد استخدام مكوّنات/توكنز M7 وآلية الثيم (.ds/.dark) دون أي هوية أو توكنز خاصة.
 */
function FieldStates() {
  const [sel, setSel] = React.useState('');
  const [cb, setCb] = React.useState(true);
  const [sw, setSw] = React.useState(true);
  const [plan, setPlan] = React.useState('pro');
  const [pw, setPw] = React.useState('Form123!');
  const [dial, setDial] = React.useState('+966');
  const [phone, setPhone] = React.useState('');
  return (
    <div className="panel panel-pad">
      <div className="grid cols3" style={css('gap:26px')}>
        <Field label="افتراضي"><Input placeholder="نصّ…" /></Field>
        <Field label="مُركّز"><Input className="is-focus" defaultValue="قيمة مركّزة" readOnly /></Field>
        <Field label="معطّل"><Input status="disabled" defaultValue="حقل مقفل" /></Field>
        <Field label="خطأ" status="error" message="قيمة غير صحيحة"><Input status="error" defaultValue="خطأ" readOnly /></Field>
        <Field label="نجاح" status="success" message="✓ تمّ التحقّق"><Input status="success" defaultValue="صحيح" readOnly /></Field>
        <Field label="كلمة مرور (مقياس قوّة)"><PasswordInput value={pw} meter onChange={(e) => setPw(e.target.value)} /></Field>
      </div>
      <div className="grid cols3" style={css('gap:26px;margin-top:24px')}>
        <Field label="قائمة اختيار">
          <Select options={[{ value: 'sa', label: 'السعودية' }, { value: 'eg', label: 'مصر' }, { value: 'ae', label: 'الإمارات' }]} value={sel} onChange={setSel} placeholder="اختر…" ariaLabel="قائمة اختيار" />
        </Field>
        <Field label="منطقة نصّ"><Textarea placeholder="اكتب وصفًا…" /></Field>
        <Field label="مربّع اختيار ومفتاح">
          <div className="fx col gap16">
            <Checkbox checked={cb} onChange={setCb}>أوافق على الشروط</Checkbox>
            <Switch checked={sw} onChange={setSw}>تفعيل الإشعارات</Switch>
          </div>
        </Field>
      </div>
      <div style={css('margin-top:24px')}>
        <Field label="أزرار راديو">
          <RadioGroup
            ariaLabel="اختر الخطة"
            value={plan}
            onChange={setPlan}
            options={[
              { value: 'free', label: 'المجاني', hint: '٠ ر.س' },
              { value: 'pro', label: 'الاحترافي', hint: '٤٩ ر.س' },
              { value: 'team', label: 'الفريق', hint: '٩٩ ر.س' },
            ]}
          />
        </Field>
      </div>
      <div style={css('margin-top:24px')}>
        <Field label="رقم الجوال (مفتاح دولة + رقم LTR)">
          <PhoneInput dial={dial} onDial={setDial} value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Field>
      </div>
    </div>
  );
}

const validId = (h) => RECIPES.some((r) => r.id === h);

export default function FormKitPage() {
  const [dark, toggleTheme] = useTheme();
  const [active, setActive] = React.useState(() => {
    const h = (typeof window !== 'undefined' && window.location.hash.slice(1)) || '';
    return validId(h) ? h : RECIPES[0].id;
  });
  const [cmdOpen, setCmdOpen] = React.useState(false);
  const rootClass = 'ds' + (dark ? ' dark' : '');
  const activeRecipe = RECIPES.find((r) => r.id === active) || RECIPES[0];
  const ActiveForm = activeRecipe.component;

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
    { label: 'مجموعة النماذج', href: '/formkit.html' },
    activeRecipe.title,
  ];
  const commands = [...navCommands({ toggleTheme, dark }), ...recipeCommands(RECIPES)];

  return (
    <div className={rootClass} dir="rtl" lang="ar">
      <AppHeader
        active="form"
        dark={dark}
        themeLabel={dark ? 'فاتح' : 'داكن'}
        toggleTheme={toggleTheme}
        onOpenCmd={() => setCmdOpen(true)}
        breadcrumb={breadcrumb}
      />

      <main className="page">
        <section className="hero" data-screen-label="Hero">
          <span className="eyebrow">M7 · Form Kit</span>
          <h1 className="h1">مجموعة النماذج العربية</h1>
        </section>

        <section className="section" data-screen-label="Field states">
          <SectionHeader kicker="مكوّنات الحقول" title="الحقول وحالاتها" />
          <FieldStates />
        </section>

        <section className="section" data-screen-label="Switcher">
          <SectionHeader kicker="نماذج جاهزة" title="اختر نموذجًا" desc="أربع عشرة وصفة نموذج عربية مبنية من مكوّنات حقول M7 — مصادقة، تفاعل، بيانات، ومتقدّمة — RTL وفي الوضعين." />
          <div className="fx col gap12">
            {CATEGORIES.map((cat) => (
              <div className="fx ac gap10 wrap" key={cat.id}>
                <span className="dk-cat">{cat.title}</span>
                {RECIPES.filter((r) => r.category === cat.id).map((r) => (
                  <button
                    key={r.id}
                    id={'fk-btn-' + r.id}
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
          <ActiveForm />
        </section>
      </main>

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} commands={commands} placeholder="انتقل إلى نموذج أو مجموعة…" />
    </div>
  );
}
