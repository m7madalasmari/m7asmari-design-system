import React from 'react';
import SectionHeader from '../../docs/SectionHeader.jsx';

export default function CalendarSection({ v }) {
  const { calDays, calMonthLabel, calNext, calPrev, calTitle } = v;
  return (
<section className="section" id="calendar" data-screen-label="Calendar">
<SectionHeader kicker={"02 — المكوّنات"} title={"التقويم ومنتقي التاريخ"} desc={"شبكة شهرية مع تمييز اليوم الحالي والتاريخ المحدّد، تتدفّق من اليمين."} />
<div className="cal">
<div className="cal-head"><div className="cal-nav"><button type="button" className="cal-btn" aria-label="الشهر التالي" onClick={calNext}>›</button><button type="button" className="cal-btn" aria-label="الشهر السابق" onClick={calPrev}>‹</button></div><div className="cal-title" aria-live="polite">{calTitle}</div></div>
<div className="cal-grid" role="group" aria-label={calTitle}>
<div className="cal-wd" aria-hidden="true">أحد</div><div className="cal-wd" aria-hidden="true">إثن</div><div className="cal-wd" aria-hidden="true">ثلا</div><div className="cal-wd" aria-hidden="true">أرب</div><div className="cal-wd" aria-hidden="true">خمي</div><div className="cal-wd" aria-hidden="true">جمع</div><div className="cal-wd" aria-hidden="true">سبت</div>
{(calDays || []).map((d, $index) => (
  <React.Fragment key={$index}>{d.muted
    ? (<div className={d.cls} aria-hidden="true">{d.label}</div>)
    : (<button type="button" className={d.cls} aria-label={d.label + ' ' + calMonthLabel} aria-current={d.today ? 'date' : undefined} aria-pressed={d.selected} onClick={d.fn}>{d.label}</button>)
  }</React.Fragment>
))}
</div>
</div>
</section>
  );
}
