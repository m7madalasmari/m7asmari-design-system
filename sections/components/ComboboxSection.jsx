import React from 'react';
import { css } from '../../app/lib/css.js';
import SectionHeader from '../../docs/SectionHeader.jsx';

export default function ComboboxSection({ v }) {
  return (
<section className="section" id="combobox" data-screen-label="Combobox">
<SectionHeader kicker={"02 — المكوّنات"} title={"الإكمال التلقائي"} desc={"حقل بحث يقترح نتائج فورية مع إبراز الجزء المطابق."} />
<div className="combo">
<div className="search"><span className="mgicon"></span><input value="إيث" style={css('font-weight:600')} readOnly /></div>
<div className="menu" style={css('margin-top:8px')}><div className="menuitem sel"><span><span className="combohi">إيث</span>يريوم · ETH</span><span>✓</span></div><div className="menuitem"><span><span className="combohi">إيث</span>يريوم كلاسيك · ETC</span></div><div className="menuitem"><span>stETH · <span className="combohi">إيث</span>يريوم مرهون</span></div></div>
</div>
</section>
  );
}
