import React from 'react';
import { css } from '../../app/lib/css.js';
import SectionHeader from '../../docs/SectionHeader.jsx';
import ShowcasePanel from '../../docs/ShowcasePanel.jsx';

export default function InputsSection({ v }) {
  const { addTag, amtInputCls, amtMsg, amtMsgCls, amtVal, ensInputCls, ensMsg, ensMsgCls, ensVal, onAmt, onEns, tagList } = v;
  return (
<section className="section" id="inputs" data-screen-label="Inputs">
<SectionHeader kicker={"02 — المكوّنات"} title={"الحقول"} desc={"حقول ناعمة مع تحقّق مباشر أثناء الكتابة — جرّب حقلي ENS والمبلغ."} />
<ShowcasePanel><div className="grid cols3" style={css('gap:26px')}>
<div className="field"><label className="label">اسم المحفظة</label><input className="input" placeholder="مثال: التوفير" /><span className="hint">مرئي لك فقط.</span></div>
<div className="field"><label className="label">مركّز</label><input className="input is-focus" value="المحفظة الرئيسية" readOnly /><span className="hint">حلقة تركيز نشطة.</span></div>
<div className="field"><label className="label">معطّل</label><input className="input is-disabled" value="حقل مقفل" disabled /><span className="hint">غير قابل للتعديل.</span></div>
<div className="field"><label className="label">اسم ENS</label><input className={ensInputCls} value={ensVal} onChange={onEns} placeholder="اكتب اسمًا…" dir="ltr" /><span className={ensMsgCls}>{ensMsg}</span></div>
<div className="field"><label className="label">عنوان المستلِم</label><input className="input is-error" value="0x71C…zz" dir="ltr" readOnly /><span className="hint err">عنوان غير صالح.</span></div>
<div className="field"><label className="label">المبلغ</label><input className={amtInputCls} value={amtVal} onChange={onAmt} placeholder="0.00 ETH" dir="ltr" /><span className={amtMsgCls}>{amtMsg}</span></div>
</div>
<div className="grid cols2" style={css('gap:26px;margin-top:24px')}>
<div className="field"><label className="label">حقل وسوم</label><div className="tagsbox">{(tagList || []).map((t, $index) => (<React.Fragment key={$index}><span className="tagchip">{t.label}<button onClick={t.remove}>×</button></span></React.Fragment>))}<input className="taginput" onKeyDown={addTag} placeholder="أضف وسماً ثم Enter…" /></div><span className="hint">اضغط Enter لإضافة وسم، × لحذفه.</span></div>
<div className="field"><label className="label">منطقة نص</label><textarea className="input textarea" placeholder="اكتب وصفًا…"></textarea><span className="hint">قابلة لتغيير الارتفاع.</span></div>
</div></ShowcasePanel>
</section>
  );
}
