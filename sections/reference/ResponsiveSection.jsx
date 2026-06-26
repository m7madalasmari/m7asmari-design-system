import React from 'react';
import { css } from '../../app/lib/css.js';
import SectionHeader from '../../docs/SectionHeader.jsx';
import ShowcasePanel from '../../docs/ShowcasePanel.jsx';

export default function ResponsiveSection({ v }) {
  return (
<section className="section" id="responsive" data-screen-label="Responsive">
<SectionHeader kicker={"04 — مرجع"} title={"التجاوب"} desc={"نقاط توقّف موحّدة وطباعة مرنة. الشبكات تتدرّج من الشاشة الكبيرة إلى عمود واحد، والشريط العلوي يتكيّف."} />
<ShowcasePanel><div className="fx wrap gap16">
<div className="bpchip"><b>شاشة صغيرة</b><code>&lt; 480px · أزرار أيقونات</code></div>
<div className="bpchip"><b>موبايل</b><code>480 – 760px · عمود واحد</code></div>
<div className="bpchip"><b>لوحي</b><code>760 – 1024px · عمودان</code></div>
<div className="bpchip"><b>سطح المكتب</b><code>&gt; 1024px · 1120px max</code></div>
</div><p className="t-sm" style={css('margin-top:18px')}>العناوين الكبيرة تتدرّج بسلاسة عبر <code className="mono">clamp()</code> بدل القفز عند نقطة توقّف واحدة. صغّر نافذة المتصفّح لرؤية الشبكات تتحوّل تدريجيًا إلى عمود واحد، والشريط العلوي يتقلّص حتى أزرار أيقونات فقط.</p></ShowcasePanel>
</section>
  );
}
