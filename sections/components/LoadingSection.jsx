import React from 'react';
import { css } from '../../app/lib/css.js';
import SectionHeader from '../../docs/SectionHeader.jsx';
import ShowcasePanel from '../../docs/ShowcasePanel.jsx';

export default function LoadingSection({ v }) {
  return (
<section className="section" id="loading" data-screen-label="Loading">
<SectionHeader kicker={"02 — المكوّنات"} title={"حالات التحميل"} desc={"أشرطة تقدّم، ومؤشّر دوّار، وهياكل تحميل وامضة."} />
<div className="grid cols2" style={css('align-items:start')}>
<ShowcasePanel><p className="subhead">شريط تقدّم ومؤشّر</p><div className="fx col gap16"><div className="progress"><span className="bar" style={css('width:72%')}></span></div><div className="progress green"><span className="bar" style={css('width:40%')}></span></div><div className="spinner"></div></div></ShowcasePanel>
<ShowcasePanel><p className="subhead">هيكل تحميل</p><div className="fx ac gap12" style={css('margin-bottom:16px')}><span className="skel" style={css('width:44px;height:44px;border-radius:50%;flex:none')}></span><div className="fx col gap8 f1"><span className="skel" style={css('width:55%;height:13px')}></span><span className="skel" style={css('width:32%;height:11px')}></span></div></div><span className="skel" style={css('display:block;width:100%;height:11px;margin-bottom:9px')}></span><span className="skel" style={css('display:block;width:78%;height:11px')}></span></ShowcasePanel>
</div>
</section>
  );
}
