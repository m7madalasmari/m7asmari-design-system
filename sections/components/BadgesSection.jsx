import React from 'react';
import { css } from '../../app/lib/css.js';
import Badge from '../../components/Badge.jsx';
import SectionHeader from '../../docs/SectionHeader.jsx';
import ShowcasePanel from '../../docs/ShowcasePanel.jsx';

export default function BadgesSection({ v }) {
  const { heroCls, heroDanger, heroLabel, heroLoading, heroSuccess, heroWarning } = v;
  return (
<section className="section" id="badges" data-screen-label="Badges">
<SectionHeader kicker={"02 — المكوّنات"} title={"الشارات"} desc={"حبوب ملوّنة فاتحة للحالة، وتعبئة صلبة للتأكيد."} />
<ShowcasePanel>
<span className="cap">متحرّكة — تدور تلقائيًا كل 1.6 ثانية</span>
<div className="fx ac" style={css('height:54px')}><div className={heroCls}>{(heroLoading) ? (<React.Fragment><span className="abspin"></span></React.Fragment>) : null}{(heroSuccess) ? (<React.Fragment><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"></path></svg></React.Fragment>) : null}{(heroWarning) ? (<React.Fragment><svg viewBox="0 0 24 24"><path d="M12 3 2 20h20L12 3zM12 10v4M12 17v.5"></path></svg></React.Fragment>) : null}{(heroDanger) ? (<React.Fragment><svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"></path></svg></React.Fragment>) : null}<span>{heroLabel}</span></div></div>
<span className="cap" style={css('margin-top:22px')}>حالات بأيقونات</span>
<div className="abgrid"><span className="abadge ab-neutral"><span className="abdot"></span>في الطابور</span><span className="abadge ab-info"><span className="abdot pulse"></span>مباشر</span><span className="abadge ab-loading"><span className="abspin"></span>فهرسة</span><span className="abadge ab-success"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"></path></svg>موثّق</span><span className="abadge ab-warning"><svg viewBox="0 0 24 24"><path d="M12 3 2 20h20L12 3zM12 10v4M12 17v.5"></path></svg>قيد الانتظار</span><span className="abadge ab-danger"><svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"></path></svg>محظور</span></div>
<span className="cap" style={css('margin-top:26px')}>فاتحة — الحالة</span>
<div className="btnrow"><Badge variant="brand"><span className="dot"></span>مُرسَل</Badge><Badge variant="gold"><span className="dot"></span>قيد الانتظار</Badge><Badge variant="green"><span className="dot"></span>مكتمل</Badge><Badge variant="red"><span className="dot"></span>فشل</Badge><Badge variant="neutral"><span className="dot"></span>مسودّة</Badge></div>
<span className="cap" style={css('margin-top:26px')}>صلبة — تأكيد</span>
<div className="btnrow"><Badge variant="solid-ink">جديد</Badge><Badge variant="solid-brand">تجريبي</Badge><Badge variant="solid-green numjoin">+12.4%</Badge><Badge variant="solid-gold">احترافي</Badge><Badge variant="solid-red numjoin">−3.1%</Badge></div>
</ShowcasePanel>
</section>
  );
}
