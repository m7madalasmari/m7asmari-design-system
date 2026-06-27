import React from 'react';
import { css } from '../app/lib/css.js';
import Card from '../components/atoms/Card.jsx';

export default function FeatureSection({ v }) {
  return (
<div className="featsec">
<div className="featintro"><div className="feat-h">مزايا قويّة لمنتجك</div><p className="feat-d">اكتشف المزايا التي تجعل منصّتنا تتميّز عن غيرها — مبنية بأحدث التقنيات ومصمّمة لأقصى إنتاجية.</p><span className="arrowlink" style={css('margin-top:24px')}>احجز عرضًا<svg viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"></path></svg></span></div>
<div className="featgrid">
<Card variant="fcard"><div className="fcard-img"><span className="ph-tag">صورة 16:9</span></div><div className="fcard-body"><div className="fcard-title">تصميم عصري</div><p className="fcard-text">واجهة نظيفة وبديهية مبنية على أحدث مبادئ التصميم، مهيّأة لأفضل تجربة استخدام.</p></div></Card>
<Card variant="fcard"><div className="fcard-img" style={css('background-color:var(--brand-soft)')}><span className="ph-tag">صورة 16:9</span></div><div className="fcard-body"><div className="fcard-title">تخطيط متجاوب</div><p className="fcard-text">تصميم متجاوب بالكامل يعمل بسلاسة عبر كل الأجهزة والمقاسات — مثالي لأي منصّة.</p></div></Card>
<Card variant="fcard"><div className="fcard-img" style={css('background-color:var(--success-soft)')}><span className="ph-tag">صورة 16:9</span></div><div className="fcard-body"><div className="fcard-title">تكامل سهل</div><p className="fcard-text">عملية تكامل بسيطة مع توثيق شامل وفريق دعم مخصّص لمساعدتك في كل خطوة.</p></div></Card>
<Card variant="fcard"><div className="fcard-img" style={css('background-color:var(--warning-soft)')}><span className="ph-tag">صورة 16:9</span></div><div className="fcard-body"><div className="fcard-title">تحليلات متقدّمة</div><p className="fcard-text">أدوات تحليل قوية تساعدك على فهم مستخدميك واتخاذ قرارات مبنية على البيانات.</p></div></Card>
</div>
</div>
  );
}
