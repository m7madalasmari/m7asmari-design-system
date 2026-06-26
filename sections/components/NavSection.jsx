import React from 'react';
import { css } from '../../app/lib/css.js';
import Button from '../../components/Button.jsx';
import Pagination from '../../components/Pagination.jsx';
import SectionHeader from '../../docs/SectionHeader.jsx';

export default function NavSection() {
  return (
<section className="section" id="nav" data-screen-label="Navigation">
<SectionHeader kicker={"02 — المكوّنات"} title={"التنقّل"} desc={"شريط علوي ثابت، وشريط جانبي، وفتات خبز تتشارك حالة التحديد الزرقاء الفاتحة."} />
<span className="cap">الشريط العلوي</span>
<div className="navdemo"><div className="brandmark"><span className="logo">M</span>M7asmari</div><div className="topnav"><span style={css('color:var(--ink)')}>المحفظة</span><span>استكشاف</span><span>النشاط</span></div><div className="fx ac gap12"><Button variant="ghost sm">تسجيل الدخول</Button><Button variant="primary sm">ابدأ الآن</Button></div></div>
<div className="grid cols2 blockgap" style={css('align-items:start')}>
<div><span className="cap">الشريط الجانبي</span><div className="sidenav"><div className="sideitem on"><span className="sideicon"></span>المحفظة</div><div className="sideitem"><span className="sideicon"></span>إرسال واستقبال</div><div className="sideitem"><span className="sideicon"></span>مبادلة</div><div className="sideitem"><span className="sideicon"></span>المقتنيات</div><div className="sideitem"><span className="sideicon"></span>الإعدادات</div></div></div>
<div><span className="cap">فتات الخبز</span><div className="navdemo" style={css('justify-content:flex-start')}><div className="breadcrumb"><span>المحفظة</span><span className="crumbsep">/</span><span>المقتنيات</span><span className="crumbsep">/</span><span className="here">Pixel M7 #204</span></div></div>
<span className="cap" style={css('margin-top:24px')}>ترقيم الصفحات</span><Pagination total={5} defaultPage={1} ariaLabel="ترقيم الصفحات" /></div>
</div>
</section>
  );
}
