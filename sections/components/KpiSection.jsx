import React from 'react';
import { css } from '../../app/lib/css.js';
import Badge from '../../components/atoms/Badge.jsx';
import SectionHeader from '../../docs/SectionHeader.jsx';
import StatCard from '../../components/atoms/StatCard.jsx';

export default function KpiSection({ v }) {
  return (
<section className="section" id="kpi" data-screen-label="KPI cards">
<SectionHeader kicker={"02 — المكوّنات"} title={"بطاقات الإحصاء"} desc={"قيمة كبيرة، وتسمية، وشارة تغيّر، ورسم بياني مصغّر."} />
<div className="grid cols4">
<StatCard variant=""><div className="stat-label">الرصيد الكلي</div><div className="stat-val">$48,250</div><div className="fx ac gap8" style={css('margin-top:10px')}><Badge variant="green numjoin">+8.4%</Badge><span className="t-sm">هذا الشهر</span></div><div className="spark"><span style={css('height:40%')}></span><span style={css('height:55%')}></span><span style={css('height:35%')}></span><span style={css('height:70%')}></span><span style={css('height:60%')}></span><span style={css('height:85%')}></span><span style={css('height:100%')}></span></div></StatCard>
<StatCard variant=""><div className="stat-label">المعاملات</div><div className="stat-val">1,284</div><div className="fx ac gap8" style={css('margin-top:10px')}><Badge variant="green numjoin">+2.1%</Badge><span className="t-sm">هذا الشهر</span></div><div className="spark"><span style={css('height:50%')}></span><span style={css('height:45%')}></span><span style={css('height:65%')}></span><span style={css('height:55%')}></span><span style={css('height:75%')}></span><span style={css('height:70%')}></span><span style={css('height:90%')}></span></div></StatCard>
<StatCard variant=""><div className="stat-label">العملات النشطة</div><div className="stat-val">36</div><div className="fx ac gap8" style={css('margin-top:10px')}><Badge variant="neutral numjoin">0%</Badge><span className="t-sm">مستقر</span></div><div className="spark"><span style={css('height:60%')}></span><span style={css('height:62%')}></span><span style={css('height:58%')}></span><span style={css('height:61%')}></span><span style={css('height:59%')}></span><span style={css('height:60%')}></span><span style={css('height:60%')}></span></div></StatCard>
<StatCard variant=""><div className="stat-label">العائد السنوي</div><div className="stat-val">4.1%</div><div className="fx ac gap8" style={css('margin-top:10px')}><Badge variant="red numjoin">−0.3%</Badge><span className="t-sm">هذا الشهر</span></div><div className="spark"><span style={css('height:80%')}></span><span style={css('height:72%')}></span><span style={css('height:78%')}></span><span style={css('height:65%')}></span><span style={css('height:60%')}></span><span style={css('height:55%')}></span><span style={css('height:50%')}></span></div></StatCard>
</div>
</section>
  );
}
