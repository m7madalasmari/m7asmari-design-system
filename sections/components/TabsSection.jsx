import React from 'react';
import Tabs from '../../components/organisms/Tabs.jsx';
import SectionHeader from '../../docs/SectionHeader.jsx';
import ShowcasePanel from '../../docs/ShowcasePanel.jsx';

const PILL = [
  { id: 'overview', label: 'نظرة عامة', panel: 'ملخّص عام لأهم المؤشّرات والأرصدة في لمحة واحدة.' },
  { id: 'activity', label: 'النشاط', panel: 'أحدث الأحداث والمعاملات على محفظتك مرتّبة زمنيًا.' },
  { id: 'settings', label: 'الإعدادات', panel: 'التفضيلات وخيارات الأمان والشبكة الافتراضية.' },
];
const SEG = [{ id: 'day', label: 'يوم' }, { id: 'week', label: 'أسبوع' }, { id: 'month', label: 'شهر' }];
const UND = [{ id: 'all', label: 'الكل' }, { id: 'open', label: 'مفتوحة' }, { id: 'closed', label: 'مغلقة' }];

export default function TabsSection() {
  return (
<section className="section" id="tabs" data-screen-label="Tabs">
<SectionHeader kicker={"02 — المكوّنات"} title={"التبويبات"} desc={"ثلاثة أنواع — حبّة، مقسّم، وخط سفلي — بمؤشّر منزلق متحرّك. كلها تفاعلية."} />
<ShowcasePanel><div className="fx col gap24">
<div className="tabsec"><span className="cap">حبّة</span><Tabs variant="pill" tabs={PILL} defaultActive="overview" ariaLabel="عرض المحفظة" showPanel /></div>
<div className="tabsec"><span className="cap">مقسّم</span><Tabs variant="seg" tabs={SEG} defaultActive="day" ariaLabel="النطاق الزمني" /></div>
<div className="tabsec"><span className="cap">خط سفلي</span><Tabs variant="und" tabs={UND} defaultActive="all" ariaLabel="تصفية الحالة" /></div>
</div></ShowcasePanel>
</section>
  );
}
