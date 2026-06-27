import React from 'react';
import { css } from '../../app/lib/css.js';
import {
  DEFAULT_CONFIG, normalizeConfig, buildThemeTokens, tokensToCss, tokensToJson,
} from '../../app/lib/themeTokens.js';
import SectionHeader from '../../docs/SectionHeader.jsx';
import Button from '../../components/atoms/Button.jsx';
import Badge from '../../components/atoms/Badge.jsx';
import Card from '../../components/atoms/Card.jsx';
import StatCard from '../../components/atoms/StatCard.jsx';
import Alert from '../../components/atoms/Alert.jsx';
import EmptyState from '../../components/atoms/EmptyState.jsx';

const STORE_KEY = 'm7-theme-builder';

// أدوات الضبط: خيارات كل مفتاح (label عربي · value داخلي)
const OPTIONS = {
  mode:    [['light', 'فاتح'], ['dark', 'داكن']],
  radius:  [['sharp', 'حادّ'], ['soft', 'ناعم'], ['rounded', 'مستدير'], ['pill', 'حبّة']],
  density: [['compact', 'مُتراصّ'], ['comfortable', 'مريح'], ['spacious', 'فسيح']],
  card:    [['bordered', 'محدّد'], ['filled', 'مملوء'], ['elevated', 'مرتفع'], ['minimal', 'مبسّط']],
  button:  [['solid', 'صلب'], ['soft', 'ناعم'], ['outline', 'محدّد'], ['ghost', 'شبحي']],
  font:    [['official', 'رسمي'], ['friendly', 'ودود'], ['editorial', 'تحريري'], ['technical', 'تقني']],
  motion:  [['none', 'بلا'], ['subtle', 'خفيف'], ['smooth', 'سلس']],
};
const PRIMARY_SWATCHES = ['#00a6ef', '#16bd74', '#fb3d18', '#f5a623', '#6366f1', '#ec4899', '#0ea5a4', '#1b1b19'];
const SECONDARY_SWATCHES = ['#8b5cf6', '#ec4899', '#0ea5a4', '#f5a623', '#16bd74', '#00a6ef', '#fb3d18', '#54534e'];

// قراءة الإعدادات المحفوظة (متانة: تتجاهل أي تلف في التخزين)
function loadConfig() {
  try {
    const raw = typeof localStorage !== 'undefined' && localStorage.getItem(STORE_KEY);
    if (raw) return normalizeConfig(JSON.parse(raw));
  } catch (_) { /* تجاهل */ }
  return Object.assign({}, DEFAULT_CONFIG);
}

// أداة مجزّأة عامّة
function Seg({ value, options, onPick, ariaLabel }) {
  return (
    <div className="tb-seg" role="group" aria-label={ariaLabel}>
      {options.map(([val, label]) => (
        <button
          key={val}
          type="button"
          className={value === val ? 'on' : ''}
          aria-pressed={value === val}
          onClick={() => onPick(val)}
        >{label}</button>
      ))}
    </div>
  );
}

function TbControl({ label, code, children }) {
  return (
    <div className="tb-field">
      <span className="tb-field-label">{label}{code ? <code>{code}</code> : null}</span>
      {children}
    </div>
  );
}

export default function ThemeBuilderSection() {
  const [config, setConfig] = React.useState(loadConfig);
  const [copied, setCopied] = React.useState(null); // 'css' | 'json' | null
  const [agree, setAgree] = React.useState(true);
  const copyTimer = React.useRef(0);

  // حفظ في localStorage عند كل تغيير
  React.useEffect(() => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(config)); } catch (_) { /* تجاهل */ }
  }, [config]);
  React.useEffect(() => () => clearTimeout(copyTimer.current), []);

  const set = (key, val) => setConfig((c) => Object.assign({}, c, { [key]: val }));
  const reset = () => setConfig(Object.assign({}, DEFAULT_CONFIG));

  const built = buildThemeTokens(config);

  const copy = (kind) => {
    const text = kind === 'css' ? tokensToCss(config) : tokensToJson(config);
    try { if (navigator.clipboard) navigator.clipboard.writeText(text); } catch (_) { /* تجاهل */ }
    setCopied(kind);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(null), 1800);
  };

  const previewClass = ('tb-preview ' + built.classes.join(' ')).trim();

  return (
<section className="section" id="theme-builder" data-screen-label="Theme Builder">
<SectionHeader
  kicker={"03 — محرّك التخصيص"}
  title={"مُخصِّص السمة"}
  desc={"خصّص اللون والحوافّ والكثافة والخط والحركة، وشاهد الأثر فورًا. تُحفظ تلقائيًا وتُصدَّر رموزًا."}
/>

<div className="tbuilder">

  {/* ===== لوحة الضبط ===== */}
  <form className="tb-controls" aria-label="خيارات تخصيص السمة" onSubmit={(e) => e.preventDefault()}>

    <TbControl label="اللون الأساسي" code="--brand">
      <div className="tb-color">
        <input type="color" value={config.primary} aria-label="اللون الأساسي"
               onChange={(e) => set('primary', e.target.value)} />
        <span className="tb-hex">{config.primary}</span>
      </div>
      <div className="tb-swatches">
        {PRIMARY_SWATCHES.map((hex) => (
          <button key={hex} type="button"
                  className={'tb-swatch' + (config.primary.toLowerCase() === hex ? ' on' : '')}
                  style={css('background:' + hex)} aria-label={'اختر ' + hex}
                  onClick={() => set('primary', hex)} />
        ))}
      </div>
    </TbControl>

    <TbControl label="اللون الثانوي" code="--accent-2">
      <div className="tb-color">
        <input type="color" value={config.secondary} aria-label="اللون الثانوي"
               onChange={(e) => set('secondary', e.target.value)} />
        <span className="tb-hex">{config.secondary}</span>
      </div>
      <div className="tb-swatches">
        {SECONDARY_SWATCHES.map((hex) => (
          <button key={hex} type="button"
                  className={'tb-swatch' + (config.secondary.toLowerCase() === hex ? ' on' : '')}
                  style={css('background:' + hex)} aria-label={'اختر ' + hex}
                  onClick={() => set('secondary', hex)} />
        ))}
      </div>
    </TbControl>

    <TbControl label="الوضع"><Seg ariaLabel="الوضع" value={config.mode} options={OPTIONS.mode} onPick={(v) => set('mode', v)} /></TbControl>
    <TbControl label="الحوافّ"><Seg ariaLabel="الحوافّ" value={config.radius} options={OPTIONS.radius} onPick={(v) => set('radius', v)} /></TbControl>
    <TbControl label="الكثافة"><Seg ariaLabel="الكثافة" value={config.density} options={OPTIONS.density} onPick={(v) => set('density', v)} /></TbControl>
    <TbControl label="نمط البطاقة"><Seg ariaLabel="نمط البطاقة" value={config.card} options={OPTIONS.card} onPick={(v) => set('card', v)} /></TbControl>
    <TbControl label="نمط الزر"><Seg ariaLabel="نمط الزر" value={config.button} options={OPTIONS.button} onPick={(v) => set('button', v)} /></TbControl>
    <TbControl label="شخصية الخط"><Seg ariaLabel="شخصية الخط" value={config.font} options={OPTIONS.font} onPick={(v) => set('font', v)} /></TbControl>
    <TbControl label="مستوى الحركة"><Seg ariaLabel="مستوى الحركة" value={config.motion} options={OPTIONS.motion} onPick={(v) => set('motion', v)} /></TbControl>

    <div className="tb-actions">
      <Button type="button" variant="secondary sm" onClick={reset}>إعادة الضبط</Button>
      <Button type="button" variant="brand sm" onClick={() => copy('css')}>نسخ CSS</Button>
      <Button type="button" variant="brand sm" onClick={() => copy('json')}>نسخ JSON</Button>
      {copied ? <span className="tb-copied" role="status">✓ نُسخت {copied === 'css' ? 'متغيّرات CSS' : 'رموز JSON'}</span> : null}
    </div>
  </form>

  {/* ===== المعاينة الحيّة ===== متغيّرات CSS مطبَّقة على الحاوية فتتدفّق لكل المكوّنات */}
  <div>
    <div className="tb-preview-bar">
      <span className="cap">معاينة حيّة — كل تغيير ينعكس فورًا على المكوّنات أدناه</span>
    </div>

    <div className={previewClass} style={built.vars}>
      <div className="tb-stack">

        {/* الأزرار */}
        <div className="tb-block">
          <span className="tb-block-h">أزرار</span>
          <div className="tb-row">
            <Button variant="tb-btn">إجراء أساسي</Button>
            <Button variant="secondary">ثانوي</Button>
            <Button variant="ghost">شبحي</Button>
            <Button variant="danger">حذف</Button>
          </div>
        </div>

        {/* الشارات + اللون الثانوي */}
        <div className="tb-block">
          <span className="tb-block-h">شارات + لون ثانوي</span>
          <div className="tb-row">
            <Badge variant="brand"><span className="dot"></span>أساسي</Badge>
            <Badge variant="green">نجاح</Badge>
            <Badge variant="gold">انتظار</Badge>
            <Badge variant="red">فشل</Badge>
            <Badge variant="neutral">محايد</Badge>
            <span className="tb-badge-2"><span className="tb-dot-2"></span>ثانوي</span>
          </div>
          <div className="tb-row">
            <span className="tb-av-2">M</span>
            <div className="tb-bar2"><span></span></div>
          </div>
        </div>

        {/* الحقول + نموذج */}
        <div className="tb-block">
          <span className="tb-block-h">حقول ونموذج</span>
          <div className="tb-grid2">
            <div className="fx col gap12" style={css('display:flex')}>
              <div className="field"><label className="label">البريد الإلكتروني</label>
                <input className="input" type="email" placeholder="name@m7.sa" defaultValue="" /></div>
              <div className="field"><label className="label">ملاحظة</label>
                <textarea className="input textarea" placeholder="اكتب رسالتك…"></textarea></div>
            </div>
            <Card variant="tb-card">
              <div className="tb-card-title">نموذج اشتراك</div>
              <div className="field" style={css('margin-top:14px')}><label className="label">الاسم</label>
                <input className="input" placeholder="محمد العسمري" /></div>
              <button type="button" className={'cbx' + (agree ? ' on' : '')} aria-pressed={agree}
                      style={css('margin-top:14px')} onClick={() => setAgree((a) => !a)}>
                <span className="cbx-box"><svg viewBox="0 0 24 24"><path className="ck" d="M20 6 9 17l-5-5"></path></svg></span>
                أوافق على الشروط
              </button>
              <div className="tb-card-foot">
                <Button variant="tb-btn">اشتراك</Button>
                <Button variant="ghost">إلغاء</Button>
              </div>
            </Card>
          </div>
        </div>

        {/* البطاقات + StatCard */}
        <div className="tb-block">
          <span className="tb-block-h">بطاقات + بطاقة إحصاء</span>
          <div className="tb-grid2">
            <Card variant="tb-card">
              <div className="fx ac jb" style={css('display:flex')}>
                <span className="tb-card-title">خطّة Pro</span>
                <Badge variant="brand">مميّز</Badge>
              </div>
              <p className="tb-card-text">كل المزايا، مساحة أكبر، ودعم أولوية على مدار الساعة.</p>
              <div className="tb-card-foot">
                <span className="price numjoin">$24<span style={css('font-size:13px;color:var(--text-muted)')}>/شهر</span></span>
                <Button variant="tb-btn">ترقية</Button>
              </div>
            </Card>
            <StatCard>
              <div className="stat-label">الإيراد الشهري</div>
              <div className="stat-val numjoin">$129,480</div>
              <div className="spark">
                <span style={css('height:40%')}></span><span style={css('height:62%')}></span>
                <span style={css('height:48%')}></span><span style={css('height:80%')}></span>
                <span style={css('height:55%')}></span><span style={css('height:92%')}></span>
                <span style={css('height:70%')}></span><span style={css('height:100%')}></span>
              </div>
            </StatCard>
          </div>
        </div>

        {/* التنبيهات */}
        <div className="tb-block">
          <span className="tb-block-h">تنبيهات</span>
          <Alert variant="info">
            <span className="alert-ico">i</span>
            <div><div className="alert-title">تحديث متاح</div>
              <p className="alert-text">صدر إصدار جديد من النظام بمزايا تخصيص أوسع.</p></div>
          </Alert>
          <Alert variant="ok">
            <span className="alert-ico">✓</span>
            <div><div className="alert-title">حُفظت التغييرات</div>
              <p className="alert-text">طُبّقت سمتك المُخصّصة وحُفظت محليًا في المتصفّح.</p></div>
          </Alert>
        </div>

        {/* جدول */}
        <div className="tb-block">
          <span className="tb-block-h">جدول</span>
          <div className="tablewrap">
            <table className="tbl">
              <thead><tr><th>الأصل</th><th>الحالة</th><th style={css('text-align:left')}>القيمة</th></tr></thead>
              <tbody>
                <tr><td><span className="cellname">إيثيريوم</span></td><td><Badge variant="green">مكتمل</Badge></td><td className="tnum">2.40</td></tr>
                <tr><td><span className="cellname">USDC</span></td><td><Badge variant="gold">انتظار</Badge></td><td className="tnum">820.00</td></tr>
                <tr><td><span className="cellname">أربيتروم</span></td><td><Badge variant="brand">مُرسَل</Badge></td><td className="tnum">145.50</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* حالة فارغة */}
        <div className="tb-block">
          <span className="tb-block-h">حالة فارغة</span>
          <EmptyState>
            <span className="empty-ico">✦</span>
            <div className="empty-title">لا عناصر بعد</div>
            <p className="empty-text">ابدأ بإضافة أول عنصر وسيظهر هنا مباشرةً ضمن سمتك المُخصّصة.</p>
            <Button variant="tb-btn">إضافة عنصر</Button>
          </EmptyState>
        </div>

      </div>
    </div>
  </div>

</div>
</section>
  );
}
