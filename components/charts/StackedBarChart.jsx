import React from 'react';

/**
 * StackedBarChart — أعمدة متراكمة: كل عمود مقسّم إلى شرائح حسب السلاسل.
 * فكرة إحصائية: «تركيب القيمة عبر الفئات» (مثلًا الإيراد حسب القناة لكل شهر).
 * series: [{ key, label, color? }]؛ data: [{ label, [key]:value, … }]. توكنز فقط.
 * <StackedBarChart series={[{key:'web',label:'الويب'},…]} data={[{label:'يناير',web:20,app:14},…]} />
 */
export default function StackedBarChart({ data = [], series = [], height = 200, showLegend = true, ariaLabel = 'أعمدة متراكمة', className = '' }) {
  if (!data.length || !series.length) return null;
  const palette = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-5)', 'var(--chart-7)'];
  const keys = series.map((s, i) => ({ ...s, color: s.color || palette[i % palette.length] }));
  const totals = data.map((d) => keys.reduce((s, k) => s + (d[k.key] || 0), 0));
  const max = Math.max(...totals, 1);
  return (
    <div className={('chartstack ' + className).trim()}>
      <div className="chartbars" role="img" aria-label={ariaLabel} style={{ height }}>
        {data.map((d, i) => (
          <div className="chartbar-col" key={i}>
            <div className="chartbar-track">
              <div className="stackbar" style={{ height: Math.max(2, (totals[i] / max) * 100) + '%' }} title={d.label + ': ' + totals[i]}>
                {keys.map((k) => (d[k.key] ? (
                  <span key={k.key} className="stackbar-seg" style={{ height: ((d[k.key] || 0) / (totals[i] || 1) * 100) + '%', background: k.color }} title={k.label + ': ' + d[k.key]} />
                ) : null))}
              </div>
            </div>
            <span className="chartbar-lbl">{d.label}</span>
          </div>
        ))}
      </div>
      {showLegend ? (
        <div className="chart-legend">
          {keys.map((k) => <span className="chart-leg" key={k.key}><span className="chart-legdot" style={{ background: k.color }} />{k.label}</span>)}
        </div>
      ) : null}
    </div>
  );
}
