import React from 'react';
import { css } from '../../app/lib/css.js';
import DashboardShell from '../../patterns/DashboardShell.jsx';
import FeatureSection from '../../patterns/FeatureSection.jsx';
import SectionHeader from '../../docs/SectionHeader.jsx';

export default function PatternsSection({ v }) {
  return (
<section className="section" id="patterns" data-screen-label="Patterns">
<SectionHeader kicker={"03 — الأنماط"} title={"قسم المزايا"} desc={"تركيب صفحة هبوط حقيقي من أوّليّات النظام: طباعة + رابط متحرّك + شبكة بطاقات."} />
<FeatureSection v={v} />
<p className="subhead" style={css('margin-top:44px')}>هيكل لوحة تحكّم — شريط جانبي + رأس + محتوى</p>
<DashboardShell v={v} />
</section>
  );
}
