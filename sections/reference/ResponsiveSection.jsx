import React from 'react';
import { css } from '../../app/lib/css.js';
import SectionHeader from '../../docs/SectionHeader.jsx';
import ShowcasePanel from '../../docs/ShowcasePanel.jsx';

export default function ResponsiveSection({ v }) {
  return (
<section className="section" id="responsive" data-screen-label="Responsive">
<SectionHeader kicker={"04 — مرجع"} title={"التجاوب"} desc={"نقاط توقّف موحّدة. الشبكات تنهار إلى عمود واحد، والأشرطة تتكيّف على الموبايل."} />
<ShowcasePanel><div className="fx wrap gap16">
<div className="bpchip"><b>موبايل</b><code>&lt; 760px · عمود واحد</code></div>
<div className="bpchip"><b>لوحي</b><code>760 – 1024px</code></div>
<div className="bpchip"><b>سطح المكتب</b><code>&gt; 1024px · 1120px max</code></div>
</div><p className="t-sm" style={css('margin-top:18px')}>صغّر نافذة المتصفّح لأقل من 760 بكسل لرؤية الشبكات تتحوّل إلى عمود واحد وإخفاء روابط الشريط العلوي.</p></ShowcasePanel>
</section>
  );
}
