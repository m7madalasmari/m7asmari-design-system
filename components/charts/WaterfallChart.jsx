import React from 'react';

/**
 * WaterfallChart — يُظهر كيف تراكمت قيمة من بداية إلى نهاية عبر مساهمات (+/-).
 * فكرة إحصائية: «ما الذي رفع/خفض الرقم؟» (تحليل التغيّر). توكنز فقط.
 * data: [{ label, value, type? }]؛ type:'total' يرسم عمودًا كاملًا للإجمالي الجاري.
 * <WaterfallChart data={[{label:'بداية',value:120,type:'total'},{label:'مبيعات',value:40},{label:'مرتجعات',value:-15},{label:'صافي',type:'total'}]} />
 */
export default function WaterfallChart({ data = [], height = 200, ariaLabel = 'مخطط شلّالي', className = '' }) {
  if (!data.length) return null;
  let cum = 0, hi = 0, lo = 0;
  const bars = data.map((d) => {
    if (d.type === 'total') {
      hi = Math.max(hi, cum);
      return { label: d.label, bottom: 0, topv: cum, value: cum, kind: 'total' };
    }
    const prev = cum; cum += (d.value || 0);
    hi = Math.max(hi, prev, cum); lo = Math.min(lo, prev, cum);
    return { label: d.label, bottom: Math.min(prev, cum), topv: Math.max(prev, cum), value: d.value || 0, kind: (d.value || 0) >= 0 ? 'pos' : 'neg' };
  });
  const base = Math.min(0, lo);
  const range = (hi - base) || 1;
  const color = { pos: 'var(--success)', neg: 'var(--danger)', total: 'var(--brand)' };
  return (
    <div className={('chartbars wf ' + className).trim()} role="img" aria-label={ariaLabel} style={{ height }}>
      {bars.map((b, i) => (
        <div className="chartbar-col" key={i}>
          <div className="wf-track">
            <span className="wf-bar" style={{ bottom: ((b.bottom - base) / range * 100) + '%', height: Math.max(1, (b.topv - b.bottom) / range * 100) + '%', background: color[b.kind] }}
              title={b.label + ': ' + (b.kind === 'neg' ? '' : (b.kind === 'pos' ? '+' : '')) + b.value} />
          </div>
          <span className="chartbar-lbl">{b.label}</span>
        </div>
      ))}
    </div>
  );
}
