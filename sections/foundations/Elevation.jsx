import React from 'react';
import { css } from '../../app/lib/css.js';
import SectionHeader from '../../docs/SectionHeader.jsx';
import ShowcasePanel from '../../docs/ShowcasePanel.jsx';

export default function Elevation({ v }) {
  return (
<section className="section" id="elevation" data-screen-label="Elevation &amp; Z-index">
<SectionHeader kicker={"01 — الأسس"} title={"الطبقات والارتفاع"} desc={"سلّم z-index موحّد يمنع تضارب الطبقات، وثلاثة مستويات ظلّ للارتفاع."} />
<div className="grid cols2" style={css('align-items:start')}>
<ShowcasePanel><p className="subhead">سلّم z-index</p>
<div className="zrow"><span className="zname">المحتوى الأساسي</span><span className="zval">1</span></div>
<div className="zrow"><span className="zname">القوائم المنسدلة</span><span className="zval">1000</span></div>
<div className="zrow"><span className="zname">الأشرطة الثابتة</span><span className="zval">1100</span></div>
<div className="zrow"><span className="zname">الأدراج</span><span className="zval">1200</span></div>
<div className="zrow"><span className="zname">النوافذ المنبثقة</span><span className="zval">1300</span></div>
<div className="zrow"><span className="zname">الإشعارات العائمة</span><span className="zval">1400</span></div>
<div className="zrow" style={css('border:none')}><span className="zname">التلميحات</span><span className="zval">1500</span></div>
</ShowcasePanel>
<ShowcasePanel><p className="subhead">مستويات الارتفاع</p><div className="grid cols3" style={css('gap:14px')}><div className="shadowdemo" data-copy="var(--shadow-sm)" style={css('box-shadow:var(--shadow-sm)')}>sm</div><div className="shadowdemo" data-copy="var(--shadow-md)" style={css('box-shadow:var(--shadow-md)')}>md</div><div className="shadowdemo" data-copy="var(--shadow-lg)" style={css('box-shadow:var(--shadow-lg)')}>lg</div></div><p className="t-sm" style={css('margin-top:18px')}>الظلال ترتفع مع الطبقة: البطاقات تستخدم sm، والقوائم md، والنوافذ والأدراج lg.</p></ShowcasePanel>
</div>
</section>
  );
}
