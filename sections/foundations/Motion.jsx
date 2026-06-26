import React from 'react';
import { css } from '../../app/lib/css.js';
import SectionHeader from '../../docs/SectionHeader.jsx';
import ShowcasePanel from '../../docs/ShowcasePanel.jsx';

export default function Motion({ v }) {
  const { spring } = v;
  return (
<section className="section" id="motion" data-screen-label="Motion">
<SectionHeader kicker={"01 — الأسس"} title={"الحركة"} desc={"مدد وتسارعات قياسية لكل الانتقالات. مرّر فوق البطاقات للمعاينة."} />
<div className="grid cols2" style={css('align-items:start')}>
<div className="fx col gap16">
<div className="motiontile fast"><div className="mhead">سريع<code>120ms</code></div><div className="mtrack"><div className="mfill"></div></div></div>
<div className="motiontile"><div className="mhead">أساسي<code>180ms</code></div><div className="mtrack"><div className="mfill"></div></div></div>
<div className="motiontile slow"><div className="mhead">بطيء<code>320ms</code></div><div className="mtrack"><div className="mfill"></div></div></div>
<div className="motiontile spring"><div className="mhead">مرتدّ (spring)<code>ease-spring</code></div><div className="mtrack"><div className="mfill"></div></div></div>
</div>
<ShowcasePanel><p className="subhead">رموز الحركة</p>
<div className="mtokrow">سريع<code>--dur-fast · 120ms</code></div>
<div className="mtokrow">أساسي<code>--dur · 180ms</code></div>
<div className="mtokrow">بطيء<code>--dur-slow · 320ms</code></div>
<div className="mtokrow">قياسي<code>--ease · (.4,0,.2,1)</code></div>
<div className="mtokrow">خروج<code>--ease-out</code></div>
<div className="mtokrow" style={css('border:none')}>مرتدّ<code>--ease-spring</code></div>
</ShowcasePanel>
</div>
</section>
  );
}
