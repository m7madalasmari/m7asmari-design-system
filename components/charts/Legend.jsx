import React from 'react';

/**
 * Legend — وسيلة إيضاح موحّدة للرسوم (نقطة لون + تسمية + قيمة اختيارية).
 * items: [{ label, value?, color }] · column: عمودي بدل أفقي.
 * <Legend items={[{label:'مكتمل', value:'62%', color:'var(--chart-2)'}]} />
 */
export default function Legend({ items = [], column = false, className = '' }) {
  return (
    <div className={('chart-legend ' + className).trim()} style={column ? { flexDirection: 'column', gap: '10px' } : undefined}>
      {items.map((it, i) => (
        <span className="chart-leg" key={i}>
          <span className="chart-legdot" style={{ background: it.color }}></span>
          {it.label}
          {it.value != null ? <b style={{ marginInlineStart: '4px' }}>{it.value}</b> : null}
        </span>
      ))}
    </div>
  );
}
