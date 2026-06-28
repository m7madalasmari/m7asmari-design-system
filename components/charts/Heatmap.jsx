import React from 'react';

/**
 * Heatmap — خريطة حرارية تقويمية (مساهمات/كثافة)، SVG/CSS بلا runtime. توكنز فقط.
 * data: number[] (قيمة لكل يوم، تتدفّق أعمدة كل عمود 7 أيام؛ RTL يتدفّق يمين→يسار).
 * <Heatmap data={[0,1,3,5,2,...]} color="var(--chart-2)" />
 */
export default function Heatmap({ data = [], color = 'var(--brand)', cell = 14, gap = 4, ariaLabel = 'خريطة حرارية', className = '' }) {
  if (!data.length) return null;
  const max = Math.max(...data, 1);
  const bg = (v) => (v <= 0 ? 'var(--surface-elevated)' : `color-mix(in srgb, ${color} ${Math.round(18 + (v / max) * 82)}%, transparent)`);
  return (
    <div
      className={('heatmap ' + className).trim()}
      role="img"
      aria-label={ariaLabel}
      style={{ gridTemplateRows: `repeat(7, ${cell}px)`, gridAutoColumns: `${cell}px`, gap: gap + 'px' }}
    >
      {data.map((v, i) => <span key={i} className="heatcell" style={{ background: bg(v) }} title={String(v)}></span>)}
    </div>
  );
}
