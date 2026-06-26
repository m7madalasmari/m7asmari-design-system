import React from 'react';
import SectionHeader from '../../docs/SectionHeader.jsx';
import ShowcasePanel from '../../docs/ShowcasePanel.jsx';

export default function Icons({ v }) {
  return (
<section className="section" id="icons" data-screen-label="Icons">
<SectionHeader kicker={"01 — الأسس"} title={"الأيقونات"} desc={"مجموعة خطّية موحّدة: شبكة 24px، سُمك حدّ 2px، نهايات وزوايا دائرية."} />
<ShowcasePanel><div className="icongrid">
<div className="iconcell"><i data-lucide="plus"></i><span>plus</span></div>
<div className="iconcell"><i data-lucide="minus"></i><span>minus</span></div>
<div className="iconcell"><i data-lucide="check"></i><span>check</span></div>
<div className="iconcell"><i data-lucide="x"></i><span>close</span></div>
<div className="iconcell"><i data-lucide="chevron-down"></i><span>chevron</span></div>
<div className="iconcell"><i data-lucide="arrow-left"></i><span>arrow</span></div>
<div className="iconcell"><i data-lucide="search"></i><span>search</span></div>
<div className="iconcell"><i data-lucide="download"></i><span>download</span></div>
<div className="iconcell"><i data-lucide="user"></i><span>user</span></div>
<div className="iconcell"><i data-lucide="lock"></i><span>lock</span></div>
<div className="iconcell"><i data-lucide="trash-2"></i><span>trash</span></div>
<div className="iconcell"><i data-lucide="clock"></i><span>clock</span></div>
</div></ShowcasePanel>
</section>
  );
}
