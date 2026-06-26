import React from 'react';
import { css } from '../../app/lib/css.js';
import Button from '../../components/Button.jsx';
import SectionHeader from '../../docs/SectionHeader.jsx';
import ShowcasePanel from '../../docs/ShowcasePanel.jsx';

export default function FeedbackSection({ v }) {
  const { clearToasts, posList, stackCls, toastError, toastPromise, toastSuccess, toasts } = v;
  return (
<section className="section" id="feedback" data-screen-label="Tooltip &amp; Toast">
<SectionHeader kicker={"02 — المكوّنات"} title={"التلميحات والإشعارات"} desc={"تلميح داكن بسهم، وإشعارات عائمة بثلاث نبرات."} />
<div className="grid cols2" style={css('align-items:start')}>
<ShowcasePanel><p className="subhead">تلميح</p><div className="fx wrap ac jc gap16" style={css('padding:18px 0')}><span className="tipwrap"><button className="tipbtn"><i data-lucide="heart"></i></button><span className="tip2 top">أعجبني</span></span><span className="tipwrap"><button className="tipbtn"><i data-lucide="share-2"></i></button><span className="tip2 bottom">مشاركة</span></span><span className="tipwrap"><button className="tipbtn"><i data-lucide="settings"></i></button><span className="tip2 left">الإعدادات</span></span><span className="tipwrap"><button className="tipbtn"><i data-lucide="trash-2"></i></button><span className="tip2 right">نقل للسلة</span></span></div><p className="t-cap" style={css('text-align:center;margin-top:6px')}>مرّر أو ركّز على كل زر — يظهر التلميح بتلاشٍ وإزالة ضباب.</p></ShowcasePanel>
<div><p className="subhead">إشعارات عائمة</p><p className="t-sm" style={css('margin:0 0 14px')}>إشعارات حقيقية تظهر ثابتة على الشاشة. غيّر الموضع لتفتح من تلك الحافة.</p><div className="fx wrap gap8"><Button variant="secondary sm" onClick={toastPromise}><i data-lucide="loader-circle"></i>وعد</Button><Button variant="secondary sm" onClick={toastSuccess}><i data-lucide="check"></i>نجاح</Button><Button variant="secondary sm" onClick={toastError}><i data-lucide="x"></i>خطأ</Button><Button variant="ghost sm" onClick={clearToasts}>مسح</Button></div><div className="fx wrap gap8" style={css('margin-top:12px')}>{(posList || []).map((p, $index) => (<React.Fragment key={$index}><button className={p.cls} onClick={p.fn}>{p.label}</button></React.Fragment>))}</div><div className={stackCls}>{(toasts || []).map((t, $index) => (<React.Fragment key={$index}><div className={t.cls}><span className="ti2"><span className="tspin2"></span><i data-lucide="check"></i><i data-lucide="x"></i><i data-lucide="sparkles"></i></span><div className="tt"><b>{t.title}</b><span>{t.desc}</span></div><span className="tx2" onClick={t.dismiss}>×</span></div></React.Fragment>))}</div></div>
</div>
</section>
  );
}
