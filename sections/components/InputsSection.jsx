import React from 'react';
import { css } from '../../app/lib/css.js';
import TagsInput from '../../components/TagsInput.jsx';
import SectionHeader from '../../docs/SectionHeader.jsx';
import ShowcasePanel from '../../docs/ShowcasePanel.jsx';

const TAKEN = ['admin', 'satoshi', 'vitalik', 'm7asmari'];

export default function InputsSection() {
  const [ensVal, setEnsVal] = React.useState('');
  const [ensStatus, setEnsStatus] = React.useState('idle');
  const [amtVal, setAmtVal] = React.useState('');
  const [amtStatus, setAmtStatus] = React.useState('idle');

  const onEns = (e) => {
    const v = e.target.value; let st = 'idle';
    if (v) { if (v.length < 3) st = 'short'; else if (TAKEN.includes(v.toLowerCase())) st = 'taken'; else st = 'ok'; }
    setEnsVal(v); setEnsStatus(st);
  };
  const onAmt = (e) => {
    const v = e.target.value; let st = 'idle';
    if (v !== '') { const n = parseFloat(v); if (isNaN(n) || n <= 0) st = 'bad'; else if (n > 2.4) st = 'over'; else st = 'ok'; }
    setAmtVal(v); setAmtStatus(st);
  };

  const ensInputCls = 'input' + (ensStatus === 'ok' ? ' is-success' : (ensStatus === 'short' || ensStatus === 'taken') ? ' is-error' : '');
  const ensMsg = ensStatus === 'ok' ? '✓ الاسم متاح' : ensStatus === 'short' ? '3 أحرف على الأقل' : ensStatus === 'taken' ? 'هذا الاسم محجوز بالفعل' : 'متاح إذا كان 3 أحرف فأكثر وغير محجوز.';
  const ensMsgCls = 'hint' + (ensStatus === 'ok' ? ' ok' : (ensStatus === 'short' || ensStatus === 'taken') ? ' err' : '');
  const amtInputCls = 'input' + (amtStatus === 'ok' ? ' is-success' : (amtStatus === 'bad' || amtStatus === 'over') ? ' is-error' : '');
  const amtMsg = amtStatus === 'ok' ? '✓ المبلغ متاح للإرسال' : amtStatus === 'over' ? 'الرصيد غير كافٍ (2.4 ETH)' : amtStatus === 'bad' ? 'أدخل مبلغًا صحيحًا' : 'الرصيد: 2.4 ETH';
  const amtMsgCls = 'hint' + (amtStatus === 'ok' ? ' ok' : (amtStatus === 'bad' || amtStatus === 'over') ? ' err' : '');

  return (
<section className="section" id="inputs" data-screen-label="Inputs">
<SectionHeader kicker={"02 — المكوّنات"} title={"الحقول"} desc={"حقول ناعمة مع تحقّق مباشر أثناء الكتابة — جرّب حقلي ENS والمبلغ."} />
<ShowcasePanel><div className="grid cols3" style={css('gap:26px')}>
<div className="field"><label className="label">اسم المحفظة</label><input className="input" placeholder="مثال: التوفير" /><span className="hint">مرئي لك فقط.</span></div>
<div className="field"><label className="label">مركّز</label><input className="input is-focus" value="المحفظة الرئيسية" readOnly /><span className="hint">حلقة تركيز نشطة.</span></div>
<div className="field"><label className="label">معطّل</label><input className="input is-disabled" value="حقل مقفل" disabled /><span className="hint">غير قابل للتعديل.</span></div>
<div className="field"><label className="label" htmlFor="inp-ens">اسم ENS</label><input id="inp-ens" className={ensInputCls} value={ensVal} onChange={onEns} placeholder="اكتب اسمًا…" dir="ltr" aria-describedby="inp-ens-msg" /><span className="hint" id="inp-ens-msg">{ensMsg}</span></div>
<div className="field"><label className="label">عنوان المستلِم</label><input className="input is-error" value="0x71C…zz" dir="ltr" readOnly aria-invalid="true" /><span className="hint err">عنوان غير صالح.</span></div>
<div className="field"><label className="label" htmlFor="inp-amt">المبلغ</label><input id="inp-amt" className={amtInputCls} value={amtVal} onChange={onAmt} placeholder="0.00 ETH" dir="ltr" aria-describedby="inp-amt-msg" /><span className="hint" id="inp-amt-msg">{amtMsg}</span></div>
</div>
<div className="grid cols2" style={css('gap:26px;margin-top:24px')}>
<div className="field"><label className="label">حقل وسوم</label><TagsInput defaultTags={['تصميم', 'واجهات', 'عربي']} ariaLabel="حقل وسوم" /><span className="hint">اضغط Enter لإضافة وسم، × لحذفه.</span></div>
<div className="field"><label className="label" htmlFor="inp-area">منطقة نص</label><textarea id="inp-area" className="input textarea" placeholder="اكتب وصفًا…"></textarea><span className="hint">قابلة لتغيير الارتفاع.</span></div>
</div></ShowcasePanel>
</section>
  );
}
