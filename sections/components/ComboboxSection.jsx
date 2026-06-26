import React from 'react';
import { css } from '../../app/lib/css.js';
import SectionHeader from '../../docs/SectionHeader.jsx';

export default function ComboboxSection() {
  return (
<section className="section" id="combobox" data-screen-label="Combobox">
<SectionHeader kicker={"02 — المكوّنات"} title={"الإكمال التلقائي"} desc={"حقل بحث يقترح نتائج فورية مع إبراز الجزء المطابق."} />
<div className="combo">
<div className="search"><span className="mgicon" aria-hidden="true"></span><input value="إيث" style={css('font-weight:600')} readOnly aria-label="بحث عن أصل" aria-expanded="true" aria-controls="combo-list" role="combobox" /></div>
<div className="menu" id="combo-list" role="listbox" aria-label="نتائج مقترحة" style={css('margin-top:8px')}><div className="menuitem sel" role="option" aria-selected="true"><span><span className="combohi">إيث</span>يريوم · ETH</span><span aria-hidden="true">✓</span></div><div className="menuitem" role="option" aria-selected="false"><span><span className="combohi">إيث</span>يريوم كلاسيك · ETC</span></div><div className="menuitem" role="option" aria-selected="false"><span>stETH · <span className="combohi">إيث</span>يريوم مرهون</span></div></div>
</div>
</section>
  );
}
