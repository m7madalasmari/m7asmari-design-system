import React from 'react';
import { css } from '../../app/lib/css.js';
import Button from '../../components/Button.jsx';
import Drawer from '../../components/Drawer.jsx';
import NavItem from '../../components/NavItem.jsx';
import SectionHeader from '../../docs/SectionHeader.jsx';

export default function DrawerSection() {
  const [drawer, setDrawer] = React.useState(null); // null | 'left' | 'right'
  const [sheet, setSheet] = React.useState(false);
  const drawerOpen = drawer !== null;
  const side = drawer || 'right';
  const hint = side === 'left'
    ? 'ينزلق من اليسار. اضغط Esc أو انقر خارجه للإغلاق.'
    : 'ينزلق من اليمين. اضغط Esc أو انقر خارجه للإغلاق.';
  return (
<section className="section" id="drawer" data-screen-label="Drawer &amp; Sheet">
<SectionHeader kicker={"02 — المكوّنات"} title={"الأدراج والأوراق السفلية"} desc={"درج جانبي يدخل من اليمين، وورقة سفلية للموبايل — كلاهما فوق خلفية معتمة."} />
<div className="grid cols2">
<div><p className="subhead">درج جانبي</p><div className="framedemo"><div className="sheetwrap"><Button variant="secondary" onClick={() => setDrawer('left')}>افتح يسارًا</Button><Button variant="brand" onClick={() => setDrawer('right')}>افتح يمينًا</Button></div>
<Drawer open={drawerOpen} onClose={() => setDrawer(null)} placement={side} labelledBy="drawer-demo-title">
<div className="fx ac jb"><span className="pcard-title" style={css('font-size:17px')} id="drawer-demo-title">القائمة</span><button className="bx" aria-label="إغلاق" onClick={() => setDrawer(null)} style={css('opacity:.5;cursor:pointer;border:none;background:transparent;font:inherit;font-size:18px;line-height:1;color:inherit')}>×</button></div><p className="t-sm" style={css('margin:0')}>{hint}</p><NavItem variant="rail" active label="المحفظة" /><NavItem variant="rail" label="المقتنيات" /><NavItem variant="rail" label="الإعدادات" />
</Drawer></div></div>
<div><p className="subhead">ورقة سفلية</p><div className="framedemo"><div className="sheetwrap"><Button variant="secondary" onClick={() => setSheet(true)}>افتح الورقة السفلية</Button></div>
<Drawer open={sheet} onClose={() => setSheet(false)} placement="bottom" labelledBy="sheet-demo-title">
<div className="grabber"></div><div className="sheet-title" id="sheet-demo-title">إجراءات سريعة</div><p className="sheet-desc">اسحب المقبض أو مرّر للأسفل للإغلاق.</p><div className="sli">مشاركة</div><div className="sli">تكرار</div><div className="sli">نقل إلى مجلد</div><div className="sli">إعادة تسمية</div><div className="sli">أرشفة</div><div className="sli danger">حذف</div><div className="sheet-foot">اسحب للأعلى للتوسيع، وللأسفل للإغلاق.</div>
</Drawer></div></div>
</div>
</section>
  );
}
