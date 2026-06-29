import React from 'react';
import { css } from '../../app/lib/css.js';
import SectionHeader from '../../docs/SectionHeader.jsx';

export default function SelectSection() {
  return (
<section className="section" id="select" data-screen-label="Select &amp; Menu">
<SectionHeader kicker={"02 — المكوّنات"} title={"القوائم المنسدلة"} desc={"قائمة اختيار مفتوحة وقائمة إجراءات تتشارك نمط التحديد الزرقاء الفاتحة."} />
<div className="grid cols2" style={css('align-items:start')}>
<div><p className="subhead">قائمة اختيار</p><div className="selectbox open"><span>الشبكة: إيثيريوم</span><span className="chev" aria-hidden="true">▾</span></div><div className="menu" style={css('margin-top:8px')}><div className="menuitem sel">إيثيريوم<span aria-hidden="true">✓</span></div><div className="menuitem">أربيتروم</div><div className="menuitem">أوبتيميزم</div><div className="menuitem">بوليجون</div></div></div>
<div><p className="subhead">قائمة إجراءات</p><div className="menu" role="menu" aria-label="إجراءات" style={css('max-width:280px')}><div className="menuitem" role="menuitem" tabIndex={0}>تعديل</div><div className="menuitem" role="menuitem" tabIndex={0}>مشاركة</div><div className="menuitem" role="menuitem" tabIndex={0}>تكرار</div><div className="menusep" role="separator"></div><div className="menuitem danger" role="menuitem" tabIndex={0}>حذف</div></div></div>
</div>
</section>
  );
}
