import React from 'react';
import SectionHeader from '../../docs/SectionHeader.jsx';
import ShowcasePanel from '../../docs/ShowcasePanel.jsx';

export default function ControlsSection({ v }) {
  const { cbTermsCls, cbUpdatesCls, pickPro, pickStarter, pickTeam, rProCls, rStarterCls, rTeamCls, swNotifCls, toggleNotif, toggleTerms, toggleUpdates } = v;
  return (
<section className="section" id="controls" data-screen-label="Selection controls">
<SectionHeader kicker={"02 — المكوّنات"} title={"عناصر الاختيار"} desc={"مفاتيح التبديل ومربعات الاختيار وأزرار الراديو، مع كل حالاتها."} />
<div className="grid cols3">
<ShowcasePanel><p className="subhead">مفتاح تبديل</p><div className="fx col gap16"><div className="cbx" onClick={toggleNotif}><button className={swNotifCls}></button><span>تفعيل الإشعارات</span></div><div className="cbx"><button className="switch"></button><span>متوقّف</span></div><div className="cbx dis"><button className="switch on dis"></button><span>معطّل</span></div></div></ShowcasePanel>
<ShowcasePanel><p className="subhead">مربع اختيار</p><div className="fx col gap16"><div className={cbTermsCls} onClick={toggleTerms}><span className="cbx-box"><svg viewBox="0 0 24 24"><path className="ck" d="M5 13l4 4L19 7"></path></svg></span><span>أوافق على الشروط والأحكام</span></div><div className={cbUpdatesCls} onClick={toggleUpdates}><span className="cbx-box"><svg viewBox="0 0 24 24"><path className="ck" d="M5 13l4 4L19 7"></path></svg></span><span>راسلني بتحديثات المنتج</span></div><div className="cbx on"><span className="cbx-box"><svg viewBox="0 0 24 24"><path className="dash" d="M6 12h12"></path></svg></span><span>تحديد الكل (جزئي)</span></div><div className="cbx on dis"><span className="cbx-box"><svg viewBox="0 0 24 24"><path className="ck" d="M5 13l4 4L19 7"></path></svg></span><span>معطّل</span></div></div></ShowcasePanel>
<ShowcasePanel><p className="subhead">زر راديو</p><div className="fx col gap16"><div className="cbx" onClick={pickStarter}><span className={rStarterCls}></span><span className="f1">المبتدئ</span><span className="t-sm">مجاني</span></div><div className="cbx" onClick={pickPro}><span className={rProCls}></span><span className="f1">الاحترافي</span><span className="t-sm numjoin">12$ / شهر</span></div><div className="cbx" onClick={pickTeam}><span className={rTeamCls}></span><span className="f1">الفريق</span><span className="t-sm numjoin">29$ / شهر</span></div><div className="cbx dis"><span className="radio dis"></span><span className="f1">الخطة القديمة</span></div></div></ShowcasePanel>
</div>
</section>
  );
}
