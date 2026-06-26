import React from 'react';
import { css } from '../../app/lib/css.js';
import SectionHeader from '../../docs/SectionHeader.jsx';
import ShowcasePanel from '../../docs/ShowcasePanel.jsx';

export default function SearchSliderSection({ v }) {
  const { sliderDown, sliderFill, sliderKnob, sliderMove, sliderPct, sliderRef, sliderUp } = v;
  return (
<section className="section" id="searchslider" data-screen-label="Search &amp; Slider">
<SectionHeader kicker={"02 — المكوّنات"} title={"البحث والمنزلق"} desc={"حقل بحث دائري ومنزلق نطاق بمقبض واضح."} />
<div className="grid cols2" style={css('align-items:start')}>
<div><p className="subhead">حقل بحث</p><div className="search"><span className="mgicon"></span><input placeholder="ابحث عن أصل أو عنوان…" /></div></div>
<ShowcasePanel><p className="subhead">منزلق — اسحب المقبض</p><div className="fx ac jb"><span className="t-sm">الرسوم</span><span className="tnum">{sliderPct}</span></div><div className="sliderlive" ref={sliderRef} onPointerDown={sliderDown} onPointerMove={sliderMove} onPointerUp={sliderUp}><div className="slider"><span className="fill" style={css(sliderFill)}></span><span className="knob" style={css(sliderKnob)}></span></div></div><div className="fx ac jb" style={css('margin-top:14px')}><span className="t-sm">الانزلاق</span><span className="tnum">30%</span></div><div className="slider"><span className="fill" style={css('width:30%')}></span><span className="knob" style={css('right:30%')}></span></div></ShowcasePanel>
</div>
</section>
  );
}
