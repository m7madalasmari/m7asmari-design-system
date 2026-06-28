import React from 'react';
import SectionHeader from '../../docs/SectionHeader.jsx';
import ShowcasePanel from '../../docs/ShowcasePanel.jsx';
import Icon from '../../components/atoms/Icon.jsx';

export default function Icons({ v }) {
  return (
<section className="section" id="icons" data-screen-label="Icons">
<SectionHeader kicker={"01 — الأسس"} title={"الأيقونات"} desc={"مجموعة خطّية موحّدة: شبكة 24px، سُمك حدّ 2px، نهايات وزوايا دائرية."} />
<ShowcasePanel><div className="icongrid">
<div className="iconcell"><Icon name="plus" /><span>plus</span></div>
<div className="iconcell"><Icon name="minus" /><span>minus</span></div>
<div className="iconcell"><Icon name="check" /><span>check</span></div>
<div className="iconcell"><Icon name="x" /><span>close</span></div>
<div className="iconcell"><Icon name="chevron-down" /><span>chevron</span></div>
<div className="iconcell"><Icon name="arrow-left" /><span>arrow</span></div>
<div className="iconcell"><Icon name="search" /><span>search</span></div>
<div className="iconcell"><Icon name="download" /><span>download</span></div>
<div className="iconcell"><Icon name="user" /><span>user</span></div>
<div className="iconcell"><Icon name="lock" /><span>lock</span></div>
<div className="iconcell"><Icon name="trash-2" /><span>trash</span></div>
<div className="iconcell"><Icon name="clock" /><span>clock</span></div>
</div></ShowcasePanel>
</section>
  );
}
