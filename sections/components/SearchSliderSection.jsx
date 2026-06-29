import React from 'react';
import { css } from '../../app/lib/css.js';
import Slider from '../../components/organisms/Slider.jsx';
import SearchField from '../../components/molecules/SearchField.jsx';
import SectionHeader from '../../docs/SectionHeader.jsx';
import ShowcasePanel from '../../docs/ShowcasePanel.jsx';

export default function SearchSliderSection() {
  const [fee, setFee] = React.useState(65);
  return (
<section className="section" id="searchslider" data-screen-label="Search &amp; Slider">
<SectionHeader kicker={"02 — المكوّنات"} title={"البحث والمنزلق"} desc={"حقل بحث دائري ومنزلق نطاق بمقبض واضح."} />
<div className="grid cols2" style={css('align-items:start')}>
<div><p className="subhead">حقل بحث</p><SearchField variant="pill" placeholder="ابحث عن أصل أو عنوان…" aria-label="بحث عن أصل أو عنوان" /></div>
<ShowcasePanel><p className="subhead">منزلق — اسحب المقبض</p><div className="fx ac jb"><span className="t-sm">الرسوم</span><span className="tnum">{fee + '%'}</span></div>
<Slider value={fee} onChange={setFee} ariaLabel="الرسوم" />
<div className="fx ac jb" style={css('margin-top:14px')}><span className="t-sm">الانزلاق</span><span className="tnum">30%</span></div><div className="slider"><span className="fill" style={css('width:30%')}></span><span className="knob" style={css('inset-inline-end:30%')}></span></div></ShowcasePanel>
</div>
</section>
  );
}
