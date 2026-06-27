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
    </div>
  );
}

export default function FormKitPage() {
  const [dark, setDark] = React.useState(false);
  const rootClass = 'ds' + (dark ? ' dark' : '');
  return (
    <div className={rootClass} dir="rtl" lang="ar">
      <header className="topbar">
        <div className="topbar-in">
          <a className="brandmark" href="/" style={css('color:inherit;text-decoration:none')}>
            <span className="logo">M</span>Form Kit
          </a>
          <div className="topnav">
            <span className="badge brand"><span className="dot"></span>طبقة فوق M7</span>
            <button className="themetoggle" onClick={() => setDark((d) => !d)} aria-label={dark ? 'الوضع الفاتح' : 'الوضع الداكن'}>
              <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
                {dark
                  ? <><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></>
                  : <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />}
              </svg>
              <span className="tb-lbl">{dark ? 'فاتح' : 'داكن'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="page">
        <section className="hero" data-screen-label="Hero">
          <span className="eyebrow">M7 · Form Kit</span>
          <h1 className="h1">مجموعة النماذج العربية</h1>
          <p className="lead">
            طبقة تشغيل فوق نظام M7 تولّد نماذج RTL متعددة من مكوّنات وتوكنز النظام — بلا هوية أو توكنز خاصة.
            {' '}{RECIPES.length} نموذجًا جاهزًا عبر {CATEGORIES.length} فئات، تعمل في الوضعين الفاتح والداكن.
          </p>
        </section>

        <section className="section" data-screen-label="Field states">
          <SectionHeader
            kicker="مكوّنات الحقول"
            title="الحقول وحالاتها"
            desc="مكوّنات أُضيفت إلى M7 core بإعادة استخدام أصنافه: Input · Select · Checkbox · Radio · Switch · Password — بكل الحالات."
          />
          <FieldStates />
        </section>

        {CATEGORIES.map((cat) => (
          <section className="section" key={cat.id} data-screen-label={cat.title}>
            <SectionHeader kicker="نماذج جاهزة" title={cat.title} />
            <div className="grid cols2">
              {RECIPES.filter((r) => r.category === cat.id).map((r) => {
                const Recipe = r.component;
                return <Recipe key={r.id} />;
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
