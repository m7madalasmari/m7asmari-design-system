import React from 'react';
import Icon from '../atoms/Icon.jsx';

/**
 * CompareSlider — مقارنة «قبل/بعد» بمقبض قابل للسحب (مؤشّر/لمس/كيبورد). توكنز فقط.
 * before/after: عقدتان (صورتان أو أي محتوى يملأ الإطار). start: 0–100.
 * <CompareSlider before={<img…/>} after={<img…/>} beforeLabel="قبل" afterLabel="بعد" />
 */
export default function CompareSlider({ before, after, beforeLabel, afterLabel, start = 50, ariaLabel = 'مقارنة قبل وبعد', className = '' }) {
  const [pos, setPos] = React.useState(start);
  const ref = React.useRef(null);
  // ملاحظة (RTL): الإحداثيات هنا فيزيائية متعمَّدة وغير معكوسة.
  // مقارنة «قبل/بعد» هي تحكّم مكاني بالصورة (مثل أدوات تشغيل الوسائط في قائمة
  // do-not-mirror بالـskill) لا اتجاه قراءة — فلا تُحوَّل إلى منطقية/RTL.
  // pos% فيزيائي من اليسار، (clientX - r.left) من حافة العنصر اليسرى، وclipPath
  // يقصّ من اليمين الفيزيائي — متّسقة جميعًا مع نظام إحداثيات فيزيائي واحد.
  const move = (clientX) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    let p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };
  const onDown = (e) => {
    move(e.clientX);
    const mv = (ev) => move(ev.clientX);
    const up = () => { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); };
    window.addEventListener('pointermove', mv);
    window.addEventListener('pointerup', up);
  };
  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); setPos((p) => Math.min(100, p + 2)); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); setPos((p) => Math.max(0, p - 2)); }
  };
  return (
    <div className={('compare ' + className).trim()} ref={ref} role="group" aria-label={ariaLabel}>
      <div className="compare-after">{after}{afterLabel != null ? <span className="compare-tag compare-tag-after">{afterLabel}</span> : null}</div>
      <div className="compare-before" style={{ clipPath: `inset(0 ${(100 - pos).toFixed(1)}% 0 0)` }}>
        {before}{beforeLabel != null ? <span className="compare-tag compare-tag-before">{beforeLabel}</span> : null}
      </div>
      <div
        className="compare-handle"
        style={{ left: pos + '%' }}
        role="slider"
        aria-label={ariaLabel}
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onPointerDown={onDown}
        onKeyDown={onKey}
      >
        <span className="compare-grip"><Icon name="chevron-right" size={13} /><Icon name="chevron-left" size={13} /></span>
      </div>
    </div>
  );
}
