import React from 'react';

const PALETTE = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)', 'var(--chart-6)'];

/**
 * DonutChart — حلقة نسب SVG (stroke-dasharray)، بفتحة مركزية لقيمة، توكنز فقط.
 * segments: [{ label, value, color? }]؛ الألوان الافتراضية من --chart-1..6.
 * <DonutChart segments={[{label:'مكتمل',value:62}, …]} centerLabel="62%" centerSub="إنجاز" />
 */
export default function DonutChart({
  segments = [],
  size = 150,
  thickness = 18,
  gap = 2,
  centerLabel,
  centerSub,
  ariaLabel = 'مخطط حلقي',
  className = '',
}) {
  if (!segments.length) return null;
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = (size - thickness) / 2;
  const C = 2 * Math.PI * r;
  const gapLen = (gap / 360) * C;
  let offset = 0;
  return (
    <div className={('donut ' + className).trim()} style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} role="img" aria-label={ariaLabel}>
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-elevated)" strokeWidth={thickness} />
          {segments.map((s, i) => {
            const len = (s.value / total) * C;
            const draw = Math.max(0, len - gapLen);
            const seg = (
              <circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={s.color || PALETTE[i % PALETTE.length]}
                strokeWidth={thickness}
                strokeDasharray={`${draw.toFixed(2)} ${(C - draw).toFixed(2)}`}
                strokeDashoffset={(-offset).toFixed(2)}
                strokeLinecap="butt"
              />
            );
            offset += len;
            return seg;
          })}
        </g>
      </svg>
      {centerLabel != null ? (
        <div className="donut-center">
          <b>{centerLabel}</b>
          {centerSub != null ? <span>{centerSub}</span> : null}
        </div>
      ) : null}
    </div>
  );
}
