import React from 'react';
import Alert from '../../components/atoms/Alert.jsx';
import SectionHeader from '../../docs/SectionHeader.jsx';

export default function AlertsSection({ v }) {
  return (
<section className="section" id="alerts" data-screen-label="Alerts">
<SectionHeader kicker={"02 — المكوّنات"} title={"التنبيهات والرسائل"} desc={"أربع نبرات دلالية، لكلٍّ منها سطح ملوّن وحدّ مطابق وأيقونة دائرية."} />
<div className="grid cols2">
<Alert variant="ok"><span className="alert-ico">✓</span><div><div className="alert-title">تم تأكيد المعاملة</div><p className="alert-text">اكتمل تحويلك البالغ 0.5 ETH بنجاح.</p></div></Alert>
<Alert variant="info"><span className="alert-ico">i</span><div><div className="alert-title">تحديث الشبكة</div><p className="alert-text">رسوم الغاز منخفضة حاليًا — وقت مناسب للمبادلة.</p></div></Alert>
<Alert variant="warn"><span className="alert-ico">!</span><div><div className="alert-title">انسخ محفظتك احتياطيًا</div><p className="alert-text">احفظ عبارة الاسترداد قبل إرسال مبالغ كبيرة.</p></div></Alert>
<Alert variant="err"><span className="alert-ico">×</span><div><div className="alert-title">فشلت المعاملة</div><p className="alert-text">الرصيد غير كافٍ لتغطية رسوم الشبكة. حاول مجددًا.</p></div></Alert>
</div>
</section>
  );
}
