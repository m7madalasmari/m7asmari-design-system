import React from 'react';

/**
 * Gauge — مقياس نصف-دائري (قوس علوي) لمقياس واحد، SVG نقيّ. توكنز فقط.
 * <Gauge value={72} max={100} label="الأداء" color="var(--chart-1)" />
 */
export default function Gauge({ value = 0, max = 100, label, color = 'var(--brand)', size = 200, suffix = '%', ariaLabel = 'مقياس', className = '' }) {
  const pct = Math.max(0, Math.min(1, value / (max || 1)));
  const sw = 16;
  const r = size / 2 - sw;
  const cx = size / 2, cy = size / 2;
  const rad = (1 - pct) * Math.PI;
  const ex = (cx + r * Math.cos(rad)).toFixed(2);
  const ey = (cy - r * Math.sin(rad)).toFixed(2);
  const bgPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
  const valPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${ex} ${ey}`;
  return (
    <div className={('gauge ' + className).trim()}>
      <svg viewBox={`0 0 ${size} ${cy + 6}`} width="100%" style={{ maxWidth: size, height: 'auto', display: 'block' }} role="img" aria-label={ariaLabel}>
        <path d={bgPath} fill="none" stroke="var(--surface-elevated)" strokeWidth={sw} strokeLinecap="round" />
        <path d={valPath} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      </svg>
      <div className="gauge-val numjoin">{Math.round(pct * 100)}{suffix}</div>
      {label != null ? <div className="gauge-label">{label}</div> : null}
    </div>
  );
}
