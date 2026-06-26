import React from 'react';
import { css } from '../../app/lib/css.js';
import SectionHeader from '../../docs/SectionHeader.jsx';
import ShowcasePanel from '../../docs/ShowcasePanel.jsx';

export default function StepperSection({ v }) {
  return (
<section className="section" id="stepper" data-screen-label="Stepper &amp; Divider">
<SectionHeader kicker={"02 — المكوّنات"} title={"الخطوات والفواصل"} desc={"مؤشّر خطوات متعدّد المراحل، وفواصل عادية ونصية."} />
<ShowcasePanel><p className="subhead">مؤشّر خطوات</p><div className="stepper"><div className="step done"><span className="step-dot">✓</span><span className="step-label">الحساب</span></div><span className="step-line done"></span><div className="step active"><span className="step-dot">2</span><span className="step-label">التحقّق</span></div><span className="step-line"></span><div className="step"><span className="step-dot">3</span><span className="step-label">تم</span></div></div>
<p className="subhead" style={css('margin:30px 0 16px')}>فواصل</p><div className="divider"></div><div className="divider-tx" style={css('margin-top:18px')}>أو</div></ShowcasePanel>
</section>
  );
}
