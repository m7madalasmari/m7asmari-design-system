import React from 'react';

/**
 * BulletChart — مؤشّر «قيمة مقابل هدف» على خلفية نطاقات كيفية (ضعيف/مقبول/جيّد).
 * فكرة إحصائية: «هل بلغنا الهدف، وفي أيّ نطاق نحن؟» (أداء مقابل مرجع). توكنز فقط، RTL.
 * ranges: مقاطع متتابعة من 0 [{value,color?}]؛ value شريط القياس؛ target علامة الهدف.
 * <BulletChart label="الإيراد" value={78} target={90} ranges={[{value:50},{value:30},{value:40}]} />
 */
export default function BulletChart({ label, value = 0, target, ranges = [], max, valueColor = 'var(--text-primary)', ariaLabel, className = '' }) {
  const rangeTotal = ranges.reduce((s, r) => s + (r.value || 0), 0);
  const top = max || Math.max(rangeTotal, value, target || 0) || 1;
  const bands = ['color-mix(in srgb,var(--text-muted) 10%,var(--surface))', 'color-mix(in srgb,var(--text-muted) 18%,var(--surface))', 'color-mix(in srgb,var(--text-muted) 28%,var(--surface))', 'color-mix(in srgb,var(--text-muted) 38%,var(--surface))'];
  return (
    <div className={('bullet ' + className).trim()} role="img" aria-label={ariaLabel || ((label || 'مؤشّر') + ': ' + value + (target != null ? ' / هدف ' + target : ''))}>
      {label != null ? <div className="bullet-head"><span className="bullet-label">{label}</span><span className="bullet-val numjoin">{value}{target != null ? <span className="bullet-target-t"> / {target}</span> : null}</span></div> : null}
      <div className="bullet-track">
        {ranges.map((r, i) => (
          <span key={i} className="bullet-band" style={{ width: ((r.value || 0) / top * 100) + '%', background: r.color || bands[i % bands.length] }} />
        ))}
        <span className="bullet-measure" style={{ width: (Math.min(value, top) / top * 100) + '%', background: valueColor }} />
        {target != null ? <span className="bullet-target" style={{ insetInlineStart: (Math.min(target, top) / top * 100) + '%' }} /> : null}
      </div>
    </div>
  );
}
