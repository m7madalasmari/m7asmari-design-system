import React from 'react';

/**
 * Sparkline — خط اتجاه مصغّر من قيم رقمية، SVG نقيّ بلا اعتماد runtime.
 * اللون من توكنز النظام (افتراضيًا --brand)؛ يتمدّد بعرض الحاوية.
 * <Sparkline data={[3,5,4,8,6,9]} color="var(--chart-1)" />
 */
export default function Sparkline({
  data = [],
  height = 36,
  color = 'var(--brand)',
  fill = true,
  ariaLabel = 'مخطط اتجاه مصغّر',
  className = '',
  ...rest
}) {
  const n = data.length;
  if (n < 2) return null;
  const W = 120, H = height;
  const max = Math.max(...data), min = Math.min(...data);
  const span = max - min || 1;
  const dx = W / (n - 1);
  const pts = data.map((v, i) => [i * dx, H - ((v - min) / span) * (H - 4) - 2]);
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = line + ` L${W} ${H} L0 ${H} Z`;
  return (
    <svg
      className={('spark2 ' + className).trim()}
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height={H}
      preserveAspectRatio="none"
      role="img"
      aria-label={ariaLabel}
      {...rest}
    >
      {fill ? <path d={area} fill={color} opacity="0.12" /> : null}
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
