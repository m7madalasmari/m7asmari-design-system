import React from 'react';
import Accordion from '../../components/Accordion.jsx';
import SectionHeader from '../../docs/SectionHeader.jsx';

const ITEMS = [
  { id: 'brief', icon: 'file-text', title: 'موجز الإصدار', body: 'اجمع ملاحظات الإطلاق والمسؤولين والمخاطر في تسليم واحد موجز قبل فتح نافذة الإصدار.' },
  { id: 'launch', icon: 'shield-check', title: 'قائمة الإطلاق', body: 'تحقّق من النصوص والروابط والتحليلات وخطوات التراجع والموافقات النهائية دون مغادرة القائمة.' },
  { id: 'campaign', icon: 'radio-tower', title: 'ملاحظات الحملة', body: 'احتفظ بملاحظات كل قناة قريبة من المهمة مع إبقاء القائمة المطوية هادئة.' },
  { id: 'calendar', icon: 'calendar-clock', title: 'تقويم الطرح', body: 'خطّط للإعلانات وفحوص التجهيز والتذكيرات والفترات الهادئة على نفس الجدول الزمني.' },
  { id: 'ship', icon: 'package-check', title: 'إطلاق النسخة', body: 'تتبّع النسخة الحالية وحالة النشر والموافقة النهائية قبل اعتماد اكتمال الإصدار.' },
  { id: 'archive', icon: 'folder-kanban', title: 'أرشفة الأصول', body: 'انقل النصوص والصور والملفات المصدرية إلى مجلّد الحملة بعد انتهاء الطرح.' },
];

export default function AccordionSection() {
  return (
<section className="section" id="accordion" data-screen-label="Accordion">
<SectionHeader kicker={"02 — المكوّنات"} title={"الأكورديون"} desc={"قائمة قابلة للطيّ بحركة مرنة (bouncy)، عنصر واحد مفتوح في كل مرة، وأيقونة لكل بند."} />
<Accordion items={ITEMS} defaultOpen="calendar" />
</section>
  );
}
