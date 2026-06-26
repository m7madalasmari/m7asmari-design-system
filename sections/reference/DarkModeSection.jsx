import React from 'react';
import { css } from '../../app/lib/css.js';
import Badge from '../../components/Badge.jsx';
import Button from '../../components/Button.jsx';
import Card from '../../components/Card.jsx';
import SectionHeader from '../../docs/SectionHeader.jsx';

export default function DarkModeSection({ v }) {
  return (
<section className="section" id="darkmode" data-screen-label="Dark mode">
<SectionHeader kicker={"04 — مرجع"} title={"الوضع الداكن"} desc={"مجموعة رموز ثانية كاملة. بدّل الثيم من الزر في الشريط العلوي، أو عاين هنا."} />
<div className="dark" style={css('border-radius:var(--r-lg);padding:30px;border:1px solid #2e2e34')}>
<div className="grid cols2" style={css('align-items:start')}>
<div className="fx col gap16">
<div className="btnrow"><Button variant="brand">العلامة</Button><Button variant="secondary">ثانوي</Button><Button variant="ghost">شفاف</Button></div>
<div className="field"><label className="label">اسم المحفظة</label><input className="input" placeholder="مثال: التوفير" /></div>
<div className="btnrow"><Badge variant="brand"><span className="dot"></span>مُرسَل</Badge><Badge variant="green"><span className="dot"></span>مكتمل</Badge><Badge variant="gold"><span className="dot"></span>قيد الانتظار</Badge></div>
</div>
<Card variant="pcard"><div className="ph" style={css('background-color:#27272c')}><span className="ph-tag">معاينة داكنة</span></div><div className="pcard-body"><div className="fx ac jb"><span className="pcard-title">المحفظة الرئيسية</span><button className="switch on"></button></div><p className="pcard-text">نفس المكوّنات، رموز ألوان داكنة. التباين والوضوح محفوظان.</p></div></Card>
</div>
</div>
</section>
  );
}
