import React from 'react';
import { css } from './lib/css.js';
import Button from '../components/atoms/Button.jsx';
import Badge from '../components/atoms/Badge.jsx';
import EmptyState from '../components/atoms/EmptyState.jsx';
import SectionHeader from '../docs/SectionHeader.jsx';

/**
 * RequestsPage — صفحة عربية RTL مستقلة لخدمة رقمية تدير طلبات المستخدمين
 * (Vite MPA · entry: app/requests.jsx). صفحة واحدة: Hero مختصر + ثلاث مزايا +
 * نموذج طلب بسيط + حالة فارغة + دعوة للإجراء. تعيد استخدام مكوّنات M7 وأصنافه
 * (hero/field/input/hint/empty/btn/badge) دون اختراع هوية بصرية جديدة.
 */

const FEATURES = [
  {
    title: 'تقديم في دقيقة',
    text: 'نموذج واضح بحقول قليلة — أرسل طلبك دون حسابات معقّدة أو خطوات زائدة.',
    icon: (<><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4 20-7z" /></>),
  },
  {
    title: 'تتبّع لحظيّ للحالة',
    text: 'تابِع طلبك من الاستلام حتى الإغلاق، بحالات ملوّنة سهلة القراءة.',
    icon: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
  },
  {
    title: 'ردّ موثوق',
    text: 'فريق مختصّ يراجع كل طلب ويردّ عليه خلال يوم عمل واحد كحدٍّ أقصى.',
    icon: (<><path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3z" /><path d="m9 12 2 2 4-4" /></>),
  },
];

const TYPES = ['استفسار', 'طلب خدمة', 'شكوى', 'اقتراح'];

const PRIORITIES = [
  { label: 'عادية', badge: 'neutral' },
  { label: 'مهمّة', badge: 'gold' },
  { label: 'عاجلة', badge: 'red' },
];

const priorityBadge = (label) => (PRIORITIES.find((p) => p.label === label) || PRIORITIES[0]).badge;

export default function RequestsPage() {
  const [type, setType] = React.useState(TYPES[0]);
  const [title, setTitle] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [priority, setPriority] = React.useState(PRIORITIES[0].label);
  const [touched, setTouched] = React.useState(false);
  const [requests, setRequests] = React.useState([]);

  const idRef = React.useRef(0);
  const titleRef = React.useRef(null);

  const titleInvalid = touched && !title.trim();

  const focusForm = () => {
    const el = titleRef.current;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus({ preventScroll: true });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) { setTouched(true); titleRef.current && titleRef.current.focus(); return; }
    idRef.current += 1;
    const req = { id: idRef.current, type, title: title.trim(), desc: desc.trim(), priority, status: 'جديد' };
    setRequests((prev) => [req, ...prev]);
    setType(TYPES[0]); setTitle(''); setDesc(''); setPriority(PRIORITIES[0].label); setTouched(false);
  };

  const titleCls = 'input' + (titleInvalid ? ' is-error' : '');

  return (
    <div className="ds reqsvc" dir="rtl" lang="ar">
      <header className="topbar">
        <div className="topbar-in">
          <a className="brandmark" href="/" style={css('color:inherit;text-decoration:none')}>
            <span className="logo">M</span>منصّة الطلبات
          </a>
          <div className="topnav">
            <span className="badge brand"><span className="dot"></span>خدمة رقمية</span>
            <a className="themetoggle" href="/" aria-label="العودة إلى نظام التصميم">
              <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M12 5l7 7-7 7"></path></svg>
              <span className="tb-lbl">نظام M7</span>
            </a>
          </div>
        </div>
      </header>

      <main className="page">
        {/* ===== Hero مختصر ===== */}
        <section className="hero" data-screen-label="Hero">
          <span className="eyebrow">منصّة الطلبات الرقمية</span>
          <h1 className="h1">قدّم طلبك، وتابِع حالته في مكان واحد</h1>
          <p className="lead">
            خدمة بسيطة لإدارة طلبات المستخدمين — استفسار أو طلب خدمة أو شكوى — مع تتبّع
            واضح للحالة وردٍّ موثوق من فريق مختصّ.
          </p>
          <div className="btnrow">
            <Button variant="brand lg" onClick={focusForm}>قدّم طلبًا جديدًا</Button>
            <a className="btn outline lg" href="#features">تعرّف على الخدمة</a>
          </div>
        </section>

        {/* ===== ثلاث مزايا ===== */}
        <section className="section" id="features" data-screen-label="Features">
          <SectionHeader
            kicker="لماذا منصّة الطلبات"
            title="كل ما تحتاجه لطلب واحد ناجح"
            desc="ثلاث ركائز تجعل تقديم الطلب ومتابعته تجربة هادئة وواضحة."
          />
          <div className="grid cols3">
            {FEATURES.map((f) => (
              <div className="feat-card" key={f.title}>
                <span className="feat-ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24">{f.icon}</svg>
                </span>
                <div className="fcard-title">{f.title}</div>
                <p className="fcard-text">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== نموذج الطلب + الحالة ===== */}
        <section className="section" id="new-request" data-screen-label="Request form">
          <SectionHeader
            kicker="تقديم طلب"
            title="نموذج طلب جديد"
            desc="املأ الحقول التالية، وسيظهر طلبك فورًا في قائمة المتابعة بجانبه."
          />
          <div className="req-cols">
            {/* النموذج */}
            <div className="req-card">
              <div className="req-card-title">تفاصيل الطلب</div>
              <p className="req-card-sub">الحقول المعلّمة بـ<span style={css('color:var(--danger-ink)')}> * </span>مطلوبة.</p>
              <form className="req-form" onSubmit={onSubmit} noValidate>
                <div className="grid cols2">
                  <div className="field">
                    <label className="label" htmlFor="req-type">نوع الطلب</label>
                    <select id="req-type" className="input" value={type} onChange={(e) => setType(e.target.value)}>
                      {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor="req-priority">الأولوية</label>
                    <select id="req-priority" className="input" value={priority} onChange={(e) => setPriority(e.target.value)}>
                      {PRIORITIES.map((p) => <option key={p.label} value={p.label}>{p.label}</option>)}
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor="req-title">عنوان الطلب *</label>
                  <input
                    id="req-title"
                    ref={titleRef}
                    className={titleCls}
                    value={title}
                    onChange={(e) => { setTitle(e.target.value); if (touched) setTouched(false); }}
                    placeholder="لخّص طلبك في جملة قصيرة"
                    aria-required="true"
                    aria-invalid={titleInvalid || undefined}
                    aria-describedby="req-title-msg"
                  />
                  <span className={'hint' + (titleInvalid ? ' err' : '')} id="req-title-msg">
                    {titleInvalid ? 'العنوان مطلوب لإرسال الطلب.' : 'عنوان واضح يسرّع المراجعة.'}
                  </span>
                </div>
                <div className="field">
                  <label className="label" htmlFor="req-desc">وصف مختصر</label>
                  <textarea
                    id="req-desc"
                    className="input textarea"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="اشرح طلبك بمزيد من التفصيل (اختياري)"
                  ></textarea>
                  <span className="hint">كلّما اتّضح الوصف، أسرع الردّ.</span>
                </div>
                <div className="btnrow">
                  <Button type="submit" variant="brand">إرسال الطلب</Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => { setType(TYPES[0]); setTitle(''); setDesc(''); setPriority(PRIORITIES[0].label); setTouched(false); }}
                  >
                    تفريغ الحقول
                  </Button>
                </div>
              </form>
            </div>

            {/* الحالة: فارغة أو قائمة الطلبات */}
            <div className="req-card" aria-live="polite">
              <div className="req-card-title">
                طلباتك{requests.length ? <span style={css('color:var(--text-muted);font-weight:700')}> ({requests.length})</span> : null}
              </div>
              <p className="req-card-sub">تظهر هنا الطلبات التي أرسلتها في هذه الجلسة.</p>

              {requests.length === 0 ? (
                <EmptyState style={css('margin-top:20px;padding:40px 24px')}>
                  <span className="empty-ico">＋</span>
                  <div className="empty-title">لا طلبات بعد</div>
                  <p className="empty-text">لم تُرسل أي طلب حتى الآن. ابدأ بطلبك الأول وستجده هنا فورًا مع حالته.</p>
                  <Button variant="brand" onClick={focusForm}>ابدأ أول طلب</Button>
                </EmptyState>
              ) : (
                <div className="req-list">
                  {requests.map((r) => (
                    <article className="req-item" key={r.id}>
                      <div className="req-item-head">
                        <span className="req-item-title">{r.title}</span>
                        <Badge variant="brand"><span className="dot"></span>{r.status}</Badge>
                      </div>
                      {r.desc ? <p className="req-item-desc">{r.desc}</p> : null}
                      <div className="req-item-meta">
                        <Badge variant="neutral">{r.type}</Badge>
                        <Badge variant={priorityBadge(r.priority)}>{r.priority}</Badge>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ===== دعوة للإجراء (CTA) ===== */}
        <section className="req-cta" data-screen-label="CTA">
          <div className="req-cta-title">جاهز لتقديم طلبك؟</div>
          <p className="req-cta-text">يستغرق الأمر أقل من دقيقة. أرسل طلبك الآن وتابِع حالته أولًا بأول.</p>
          <div className="btnrow">
            <Button variant="brand lg" onClick={focusForm}>قدّم طلبًا الآن</Button>
          </div>
        </section>
      </main>
    </div>
  );
}
