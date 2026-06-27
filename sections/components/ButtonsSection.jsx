import React from 'react';
import { css } from '../../app/lib/css.js';
import Button from '../../components/atoms/Button.jsx';
import SectionHeader from '../../docs/SectionHeader.jsx';
import ShowcasePanel from '../../docs/ShowcasePanel.jsx';

export default function ButtonsSection({ v }) {
  const { errBtnCls, errLabel, errSpin, errX, okArrow, okBtnCls, okCheck, okLabel, okSpin, ripple, runErr, runOk } = v;
  return (
<section className="section" id="buttons" data-screen-label="Buttons">
<SectionHeader kicker={"02 — المكوّنات"} title={"الأزرار"} desc={"أزرار دائرية بالكامل مع أيقونات، أربعة أنواع، أربعة أحجام، وتأثير نبضة عند النقر."} />
<ShowcasePanel>
<span className="cap">الأنواع — مع أيقونات Lucide</span>
<div className="btnrow"><Button variant="primary">متابعة<i data-lucide="arrow-left"></i></Button><Button variant="secondary"><i data-lucide="download"></i>تنزيل</Button><Button variant="outline">محدّد</Button><Button variant="ghost">شفاف</Button><Button variant="brand">العلامة</Button><Button variant="danger">حذف</Button></div>
<span className="cap" style={css('margin-top:28px')}>الأحجام</span>
<div className="btnrow"><Button variant="primary sm">صغير</Button><Button variant="primary">متوسط</Button><Button variant="primary lg">كبير</Button><Button variant="secondary icon" aria-label="حذف"><i data-lucide="trash-2"></i></Button><Button variant="primary icon" aria-label="متابعة"><i data-lucide="arrow-left"></i></Button></div>
<span className="cap" style={css('margin-top:28px')}>نبضة عند النقر — جرّبها</span>
<div className="btnrow"><Button variant="primary rip" onClick={ripple}>نبضة</Button><Button variant="outline rip" onClick={ripple}>اضغط هنا</Button><Button variant="brand rip" onClick={ripple}>العلامة</Button></div>
<span className="cap" style={css('margin-top:28px')}>أزرار ذات حالات — اضغط وانتظر</span>
<div className="btnrow"><button className={okBtnCls} onClick={runOk}>{(okSpin) ? (<React.Fragment><span className="btnspin"></span></React.Fragment>) : null}{(okCheck) ? (<React.Fragment><svg className="ic" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"></path></svg></React.Fragment>) : null}<span>{okLabel}</span>{(okArrow) ? (<React.Fragment><svg className="ic" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"></path></svg></React.Fragment>) : null}</button><button className={errBtnCls} onClick={runErr}>{(errSpin) ? (<React.Fragment><span className="btnspin"></span></React.Fragment>) : null}{(errX) ? (<React.Fragment><svg className="ic" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"></path></svg></React.Fragment>) : null}<span>{errLabel}</span></button></div>
<span className="cap" style={css('margin-top:28px')}>الأساسي — كل الحالات</span>
<div className="btnmatrix">
<Button variant="primary">افتراضي</Button><Button variant="primary is-hover">مرور</Button><Button variant="primary is-active">مضغوط</Button><Button variant="primary is-disabled">معطّل</Button>
</div>
</ShowcasePanel>
</section>
  );
}
