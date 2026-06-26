import React from 'react';
import SectionHeader from '../../docs/SectionHeader.jsx';

export default function AccordionSection({ v }) {
  const { accCls, accH, bouncy } = v;
  return (
<section className="section" id="accordion" data-screen-label="Accordion">
<SectionHeader kicker={"02 — المكوّنات"} title={"الأكورديون"} desc={"قائمة قابلة للطيّ بحركة مرنة (bouncy)، عنصر واحد مفتوح في كل مرة، وأيقونة لكل بند."} />
<div className="acc">
<div className={accCls.brief}><div className="acc-head" onClick={accH.brief}><span className="acc-ico2"><i data-lucide="file-text"></i></span><span className="acc-title2">موجز الإصدار</span><span className="acc-chev"><i data-lucide="chevron-down"></i></span></div><div className="acc-wrap"><div className="acc-inner"><div className="acc-body">اجمع ملاحظات الإطلاق والمسؤولين والمخاطر في تسليم واحد موجز قبل فتح نافذة الإصدار.</div></div></div></div>
<div className={accCls.launch}><div className="acc-head" onClick={accH.launch}><span className="acc-ico2"><i data-lucide="shield-check"></i></span><span className="acc-title2">قائمة الإطلاق</span><span className="acc-chev"><i data-lucide="chevron-down"></i></span></div><div className="acc-wrap"><div className="acc-inner"><div className="acc-body">تحقّق من النصوص والروابط والتحليلات وخطوات التراجع والموافقات النهائية دون مغادرة القائمة.</div></div></div></div>
<div className={accCls.campaign}><div className="acc-head" onClick={accH.campaign}><span className="acc-ico2"><i data-lucide="radio-tower"></i></span><span className="acc-title2">ملاحظات الحملة</span><span className="acc-chev"><i data-lucide="chevron-down"></i></span></div><div className="acc-wrap"><div className="acc-inner"><div className="acc-body">احتفظ بملاحظات كل قناة قريبة من المهمة مع إبقاء القائمة المطوية هادئة.</div></div></div></div>
<div className={accCls.calendar}><div className="acc-head" onClick={accH.calendar}><span className="acc-ico2"><i data-lucide="calendar-clock"></i></span><span className="acc-title2">تقويم الطرح</span><span className="acc-chev"><i data-lucide="chevron-down"></i></span></div><div className="acc-wrap"><div className="acc-inner"><div className="acc-body">خطّط للإعلانات وفحوص التجهيز والتذكيرات والفترات الهادئة على نفس الجدول الزمني.</div></div></div></div>
<div className={accCls.ship}><div className="acc-head" onClick={accH.ship}><span className="acc-ico2"><i data-lucide="package-check"></i></span><span className="acc-title2">إطلاق النسخة</span><span className="acc-chev"><i data-lucide="chevron-down"></i></span></div><div className="acc-wrap"><div className="acc-inner"><div className="acc-body">تتبّع النسخة الحالية وحالة النشر والموافقة النهائية قبل اعتماد اكتمال الإصدار.</div></div></div></div>
<div className={accCls.archive}><div className="acc-head" onClick={accH.archive}><span className="acc-ico2"><i data-lucide="folder-kanban"></i></span><span className="acc-title2">أرشفة الأصول</span><span className="acc-chev"><i data-lucide="chevron-down"></i></span></div><div className="acc-wrap"><div className="acc-inner"><div className="acc-body">انقل النصوص والصور والملفات المصدرية إلى مجلّد الحملة بعد انتهاء الطرح.</div></div></div></div>
</div>
</section>
  );
}
