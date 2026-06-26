import React from 'react';
import { css } from '../../app/lib/css.js';
import SectionHeader from '../../docs/SectionHeader.jsx';
import ShowcasePanel from '../../docs/ShowcasePanel.jsx';

export default function TabsSection({ v }) {
  const { pillIndStyle, pillTabs, pillText, segIndStyle, segTabs, undIndRef, undTabs } = v;
  return (
<section className="section" id="tabs" data-screen-label="Tabs">
<SectionHeader kicker={"02 — المكوّنات"} title={"التبويبات"} desc={"ثلاثة أنواع — حبّة، مقسّم، وخط سفلي — بمؤشّر منزلق متحرّك. كلها تفاعلية."} />
<ShowcasePanel><div className="fx col gap24">
<div className="tabsec"><span className="cap">حبّة</span><div className="tablist pill"><div className="tabind" style={css(pillIndStyle)}></div>{(pillTabs || []).map((tb, $index) => (<React.Fragment key={$index}><button className={tb.cls} onClick={tb.fn}>{tb.label}</button></React.Fragment>))}</div><div className="tabpanel2">{pillText}</div></div>
<div className="tabsec"><span className="cap">مقسّم</span><div className="tablist seg"><div className="tabind" style={css(segIndStyle)}></div>{(segTabs || []).map((tb, $index) => (<React.Fragment key={$index}><button className={tb.cls} onClick={tb.fn}>{tb.label}</button></React.Fragment>))}</div></div>
<div className="tabsec"><span className="cap">خط سفلي</span><div className="tablist und"><div className="tabind" ref={undIndRef}></div>{(undTabs || []).map((tb, $index) => (<React.Fragment key={$index}><button className={tb.cls} ref={tb.ref} onClick={tb.fn}>{tb.label}</button></React.Fragment>))}</div></div>
</div></ShowcasePanel>
</section>
  );
}
