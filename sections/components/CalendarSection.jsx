import React from 'react';
import SectionHeader from '../../docs/SectionHeader.jsx';

export default function CalendarSection({ v }) {
  const { calDays, calNext, calPrev, calTitle } = v;
  return (
<section className="section" id="calendar" data-screen-label="Calendar">
<SectionHeader kicker={"02 — المكوّنات"} title={"التقويم ومنتقي التاريخ"} desc={"شبكة شهرية مع تمييز اليوم الحالي والتاريخ المحدّد، تتدفّق من اليمين."} />
<div className="cal">
<div className="cal-head"><div className="cal-nav"><div className="cal-btn" onClick={calNext}>›</div><div className="cal-btn" onClick={calPrev}>‹</div></div><div className="cal-title">{calTitle}</div></div>
<div className="cal-grid">
<div className="cal-wd">أحد</div><div className="cal-wd">إثن</div><div className="cal-wd">ثلا</div><div className="cal-wd">أرب</div><div className="cal-wd">خمي</div><div className="cal-wd">جمع</div><div className="cal-wd">سبت</div>
{(calDays || []).map((d, $index) => (<React.Fragment key={$index}><div className={d.cls} onClick={d.fn}>{d.label}</div></React.Fragment>))}
</div>
</div>
</section>
  );
}
