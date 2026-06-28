import React from 'react';

/**
 * BarChart — مخطط أعمدة عمودي، CSS flex (متجاوب)، بقيمة فوق كل عمود وتلميح hover. توكنز فقط.
 * data: [{ label, value, color? }]؛ color الافتراضي --chart-1.
 * <BarChart data={[{label:'يناير',value:40}, …]} />
 */
export default function BarChart({ data = [], height = 180, color = 'var(--chart-1)', showValues = true, ariaLabel = 'مخطط أعمدة', className = '' }) {
  const n = data.length;
  if (!n) return null;
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className={('chartbars ' + className).trim()} role="img" aria-label={ariaLabel} style={{ height }}>
      {data.map((d, i) => (
        <div className="chartbar-col" key={i}>
          <div className="chartbar-track">
            <div className="chartbar" style={{ height: Math.max(2, (d.value / max) * 100) + '%', background: d.color || color }} title={d.label + ': ' + d.value}>
              {showValues ? <span className="chartbar-val numjoin">{d.value}</span> : null}
            </div>
          </div>
          <span className="chartbar-lbl">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
