import React from 'react';
import Button from '../../components/atoms/Button.jsx';
import SectionHeader from '../../docs/SectionHeader.jsx';

export default function SwipeSection({ v }) {
  const { resetSwipe, swCount, swLast, swMove, swRows, swUp } = v;
  return (
<section className="section" id="swipe" data-screen-label="Swipeable list">
<SectionHeader kicker={"02 — المكوّنات"} title={"قائمة قابلة للسحب"} desc={"اسحب أي صفّ يميناً للكشف عن (تم/تثبيت) أو يساراً عن (لاحقًا/حذف). السحب الكامل يطلق الإجراء مباشرة."} />
<div className="swcard"><div className="swhead"><div><div className="swhead-t">طابور الأولوية</div><div className="swhead-s">{swLast}</div></div><Button variant="ghost sm" onClick={resetSwipe}><svg className="ic" viewBox="0 0 24 24"><path d="M4 12a8 8 0 108-8 8 8 0 00-6 2.7M4 4v4h4"></path></svg>إعادة</Button></div>
<div className="swlist">{(swRows || []).map((r, $index) => (<React.Fragment key={$index}><div className={r.rowCls}><div className="swactions left"><button className="swact success" onClick={r.actDone}><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"></path></svg>تم</button><button className="swact primary" onClick={r.actPin}><svg viewBox="0 0 24 24"><path d="M12 17v5M9 3h6l-1 7 3 2H7l3-2-1-7z"></path></svg>تثبيت</button></div><div className="swactions right"><button className="swact warning" onClick={r.actLater}><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><path d="M12 8v4l3 2"></path></svg>لاحقًا</button><button className="swact danger" onClick={r.actTrash}><svg viewBox="0 0 24 24"><path d="M5 7h14M9 7V5h6v2M7 7l1 13h8l1-13"></path></svg>حذف</button></div><div className="swfg" ref={r.ref} onPointerDown={r.down} onPointerMove={swMove} onPointerUp={swUp}><span className="swlead">{(r.isFile) ? (<React.Fragment><svg viewBox="0 0 24 24"><path d="M14 3v5h5M14 3H6v18h12V8M9 13h6M9 17h4"></path></svg></React.Fragment>) : null}{(r.isMail) ? (<React.Fragment><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M4 7l8 6 8-6"></path></svg></React.Fragment>) : null}{(r.isUser) ? (<React.Fragment><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"></circle><path d="M5 20c0-4 3.5-6 7-6s7 2 7 6"></path></svg></React.Fragment>) : null}{(r.isFlag) ? (<React.Fragment><svg viewBox="0 0 24 24"><path d="M5 21V4h13l-3 5 3 5H5"></path></svg></React.Fragment>) : null}</span><div className="swbody"><div className="swtitle">{r.title}</div><div className="swdesc">{r.desc}</div></div><span className="swmeta">{r.meta}</span></div></div></React.Fragment>))}</div>
<div className="swfoot"><span>{swCount}</span><span>اليوم</span></div>
<div className="swhint">↔ اسحب الصفّ يميناً أو يساراً</div></div>
</section>
  );
}
