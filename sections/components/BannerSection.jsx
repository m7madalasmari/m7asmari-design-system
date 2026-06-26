import React from 'react';
import Banner from '../../components/Banner.jsx';
import Button from '../../components/Button.jsx';
import SectionHeader from '../../docs/SectionHeader.jsx';

export default function BannerSection({ v }) {
  return (
<section className="section" id="banner" data-screen-label="Notification banner">
<SectionHeader kicker={"02 — المكوّنات"} title={"بانر الإشعار"} desc={"إشعار بعرض الصفحة بإجراء وزر إغلاق — مختلف عن التنبيهات والإشعارات العائمة."} />
<div className="fx col gap12">
<Banner variant="brand"><span className="bi2">✦</span><div className="btxt"><b>إصدار جديد متاح.</b> حدّث الآن للحصول على أحدث ميزات الأمان.</div><Button variant="brand sm">تحديث</Button><span className="bx">×</span></Banner>
<Banner variant="warn"><span className="bi2">!</span><div className="btxt"><b>صيانة مجدوَلة.</b> قد تتأثّر الخدمة الجمعة 2:00 صباحًا حتى 4:00 صباحًا.</div><Button variant="secondary sm">التفاصيل</Button><span className="bx">×</span></Banner>
<Banner variant="ok"><span className="bi2">✓</span><div className="btxt"><b>تم التحقّق من حسابك.</b> أصبح بإمكانك الآن رفع حدود المعاملات.</div><span className="bx">×</span></Banner>
</div>
</section>
  );
}
