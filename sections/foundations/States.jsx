import React from 'react';
import SectionHeader from '../../docs/SectionHeader.jsx';

export default function States({ v }) {
  return (
<section className="section" id="states" data-screen-label="States">
<SectionHeader kicker={"01 — الأسس"} title={"حالات التفاعل"} desc={"كل عنصر تفاعلي يتحدّث اللغة نفسها: تغيّر خفيف في التعبئة عند المرور، ضغطة عند النقر، وحلقة تركيز زرقاء ناعمة."} />
<div className="grid cols3">
<div className="statecard"><div className="statelabel">افتراضي</div><div className="statebox">عنصر</div></div>
<div className="statecard"><div className="statelabel">مرور</div><div className="statebox b-hover">عنصر</div></div>
<div className="statecard"><div className="statelabel">نشِط / مضغوط</div><div className="statebox b-active">عنصر</div></div>
<div className="statecard"><div className="statelabel">حلقة التركيز</div><div className="statebox b-focus">عنصر</div></div>
<div className="statecard"><div className="statelabel">محدّد</div><div className="statebox b-selected">عنصر</div></div>
<div className="statecard"><div className="statelabel">معطّل</div><div className="statebox b-disabled">عنصر</div></div>
</div>
</section>
  );
}
