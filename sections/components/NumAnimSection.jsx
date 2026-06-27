import React from 'react';
import { css } from '../../app/lib/css.js';
import Button from '../../components/atoms/Button.jsx';
import SectionHeader from '../../docs/SectionHeader.jsx';
import ShowcasePanel from '../../docs/ShowcasePanel.jsx';

export default function NumAnimSection({ v }) {
  const { numConvRef, numMrrRef, numUsersRef, replayNums } = v;
  return (
<section className="section" id="numanim" data-screen-label="Number animation">
<SectionHeader kicker={"02 — المكوّنات"} title={"الأرقام المتحرّكة"} desc={"أرقام تعدّ تصاعديًا بتسارع تباطؤ أسّي عند ظهورها على الشاشة. اضغط «إعادة» لتشغيلها مجددًا."} />
<ShowcasePanel>
<div className="fx ac jb" style={css('margin-bottom:18px')}><span className="cap" style={css('margin:0')}>مؤشّرات حيّة</span><Button variant="secondary sm" onClick={replayNums}><i data-lucide="rotate-ccw"></i>إعادة</Button></div>
<div className="numgrid">
<div className="numcard"><div className="num-label">الإيراد الشهري المتكرّر</div><div className="num-val" ref={numMrrRef}>$0</div><div className="num-delta up"><i data-lucide="trending-up"></i><span className="numjoin">+12.4% عن الشهر الماضي</span></div></div>
<div className="numcard"><div className="num-label">المستخدمون النشطون</div><div className="num-val" ref={numUsersRef}>0</div><div className="num-delta up"><i data-lucide="trending-up"></i><span className="numjoin">+5.1% هذا الأسبوع</span></div></div>
<div className="numcard"><div className="num-label">معدّل التحويل</div><div className="num-val" ref={numConvRef}>0%</div><div className="num-delta down"><i data-lucide="trending-down"></i><span className="numjoin">−0.6% عن الأمس</span></div></div>
</div>
</ShowcasePanel>
</section>
  );
}
