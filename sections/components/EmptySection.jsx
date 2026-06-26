import React from 'react';
import { css } from '../../app/lib/css.js';
import Button from '../../components/Button.jsx';
import EmptyState from '../../components/EmptyState.jsx';
import SectionHeader from '../../docs/SectionHeader.jsx';

export default function EmptySection({ v }) {
  return (
<section className="section" id="empty" data-screen-label="Empty states">
<SectionHeader kicker={"02 — المكوّنات"} title={"الحالات الفارغة"} desc={"ودودة ومطمئِنة، ومقترنة دائمًا بإجراء تالٍ واضح."} />
<div className="grid cols2">
<EmptyState variant=""><span className="empty-ico">✦</span><div className="empty-title">لا مقتنيات بعد</div><p className="empty-text">عندما تقتني أو تستقبل عملة NFT، ستظهر هنا مباشرةً في محفظتك.</p><Button variant="brand">استكشف السوق</Button></EmptyState>
<EmptyState variant=""><span className="empty-ico" style={css('background:var(--surface-2);color:var(--ink-3)')}>↑</span><div className="empty-title">نشاطك خالٍ</div><p className="empty-text">لا توجد معاملات لعرضها. نفّذ أول تحويل لتبدأ الحركة.</p><Button variant="secondary">إرسال عملات</Button></EmptyState>
</div>
</section>
  );
}
