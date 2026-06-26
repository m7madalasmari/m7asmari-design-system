import React from 'react';
import { css } from '../../app/lib/css.js';
import Button from '../../components/Button.jsx';
import SectionHeader from '../../docs/SectionHeader.jsx';

export default function DrawerSection({ v }) {
  const { closeDrawer, closeSheet, drawerCls, drawerHint, drawerScrimCls, openLeft, openRight, openSheet, scrimCls, sheetCls } = v;
  return (
<section className="section" id="drawer" data-screen-label="Drawer &amp; Sheet">
<SectionHeader kicker={"02 — المكوّنات"} title={"الأدراج والأوراق السفلية"} desc={"درج جانبي يدخل من اليمين، وورقة سفلية للموبايل — كلاهما فوق خلفية معتمة."} />
<div className="grid cols2">
<div><p className="subhead">درج جانبي</p><div className="framedemo"><div className="sheetwrap"><Button variant="secondary" onClick={openLeft}>افتح يسارًا</Button><Button variant="brand" onClick={openRight}>افتح يمينًا</Button></div><div className={drawerScrimCls} onClick={closeDrawer}></div><div className={drawerCls}><div className="fx ac jb"><span className="pcard-title" style={css('font-size:17px')}>القائمة</span><span className="bx" onClick={closeDrawer} style={css('opacity:.5;cursor:pointer')}>×</span></div><p className="t-sm" style={css('margin:0')}>{drawerHint}</p><div className="sideitem on"><span className="sideicon"></span>المحفظة</div><div className="sideitem"><span className="sideicon"></span>المقتنيات</div><div className="sideitem"><span className="sideicon"></span>الإعدادات</div></div></div></div>
<div><p className="subhead">ورقة سفلية</p><div className="framedemo"><div className="sheetwrap"><Button variant="secondary" onClick={openSheet}>افتح الورقة السفلية</Button></div><div className={scrimCls} onClick={closeSheet}></div><div className={sheetCls}><div className="grabber"></div><div className="sheet-title">إجراءات سريعة</div><p className="sheet-desc">اسحب المقبض أو مرّر للأسفل للإغلاق.</p><div className="sli">مشاركة</div><div className="sli">تكرار</div><div className="sli">نقل إلى مجلد</div><div className="sli">إعادة تسمية</div><div className="sli">أرشفة</div><div className="sli danger">حذف</div><div className="sheet-foot">اسحب للأعلى للتوسيع، وللأسفل للإغلاق.</div></div></div></div>
</div>
</section>
  );
}
