import React from 'react';
import SectionHeader from '../../docs/SectionHeader.jsx';

export default function GuidelinesSection({ v }) {
  return (
<section className="section" id="guidelines" data-screen-label="Guidelines">
<SectionHeader kicker={"04 — مرجع"} title={"دليل الاستخدام"} desc={"مبادئ موجزة للحفاظ على اتّساق النظام، ومقتطف كود للبدء."} />
<div className="guide">
<div className="dodont do"><div className="dd-head do"><i data-lucide="check"></i>افعل</div><div className="dd-li"><span className="dd-mk do">✓</span>استخدم زرًّا أساسيًا واحدًا في كل شاشة.</div><div className="dd-li"><span className="dd-mk do">✓</span>اعتمد رموز المسافات (مضاعفات 4) لكل الفراغات.</div><div className="dd-li"><span className="dd-mk do">✓</span>استخدم الألوان الدلالية لمعناها فقط.</div><div className="dd-li"><span className="dd-mk do">✓</span>حافظ على ارتفاع لمس لا يقلّ عن 44 بكسل.</div></div>
<div className="dodont dont"><div className="dd-head dont"><i data-lucide="x"></i>لا تفعل</div><div className="dd-li"><span className="dd-mk dont">×</span>لا تكدّس عدة أزرار أساسية متجاورة.</div><div className="dd-li"><span className="dd-mk dont">×</span>لا تخترع ألوانًا أو زوايا خارج الرموز.</div><div className="dd-li"><span className="dd-mk dont">×</span>لا تستخدم الأحمر لغير الأخطاء والحذف.</div><div className="dd-li"><span className="dd-mk dont">×</span>لا تضف مسافات بين حروف النص العربي.</div></div>
</div>
<div className="code"><span className="c2">&lt;!-- زر أساسي --&gt;</span>
&lt;<span className="c1">button</span> <span className="c3">class</span>=<span className="c2">"btn primary"</span>&gt;حفظ&lt;/<span className="c1">button</span>&gt;

<span className="c2">&lt;!-- بطاقة --&gt;</span>
&lt;<span className="c1">div</span> <span className="c3">class</span>=<span className="c2">"pcard"</span>&gt;
  &lt;<span className="c1">div</span> <span className="c3">class</span>=<span className="c2">"pcard-body"</span>&gt;…&lt;/<span className="c1">div</span>&gt;
&lt;/<span className="c1">div</span>&gt;</div>
</section>
  );
}
