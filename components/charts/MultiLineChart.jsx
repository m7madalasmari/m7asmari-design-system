import React from 'react';

/**
 * MultiLineChart — مخطط خطّي متعدّد السلاسل لمقارنة اتجاهات على محور زمن مشترك.
 * فكرة إحصائية: «أيّهما يتفوّق عبر الزمن؟» (مقارنة اتجاهات). توكنز فقط، تحجيم منتظم.
 * series: [{ label, color?, data:[{label,value}] }] — تُؤخذ التسميات من السلسلة الأولى.
 * <MultiLineChart series={[{label:'٢٠٢٤',data:[…]},{label:'٢٠٢٥',data:[…]}]} />
 */
export default function MultiLineChart({ series = [], height = 220, showLegend = true, ariaLabel = 'مخطط خطّي متعدّد', className = '' }) {
  const valid = series.filter((s) => s.data && s.data.length >= 2);
  if (!valid.length) return null;
  const palette = ['var(--chart-1)', 'var(--chart-5)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-7)'];
  const lines = valid.map((s, i) => ({ ...s, color: s.color || palette[i % palette.length] }));
  const n = lines[0].data.length;
  const W = 600, H = height, padX = 14, padTop = 18, padBottom = 26;
  const all = lines.flatMap((s) => s.data.map((d) => d.value));
  const max = Math.max(...all), min = Math.min(...all, 0);
  const span = max - min || 1;
  const plotH = H - padTop - padBottom;
  const dx = (W - padX * 2) / (n - 1);
  const x = (i) => padX + i * dx;
  const y = (v) => padTop + (1 - (v - min) / span) * plotH;
  const grid = [0, 0.25, 0.5, 0.75, 1].map((t) => padTop + t * plotH);
  return (
    <div className={('linechart ' + className).trim()}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label={ariaLabel} style={{ display: 'block', height: 'auto' }}>
        {grid.map((gy, i) => (<line key={i} className="chart-grid" x1={padX} y1={gy} x2={W - padX} y2={gy} vectorEffect="non-scaling-stroke" />))}
        {lines.map((s) => {
          const pts = s.data.slice(0, n).map((d, i) => [x(i), y(d.value)]);
          const path = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
          return (
            <g key={s.label}>
              <path d={path} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              {pts.map((p, i) => (
                <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill="var(--surface)" stroke={s.color} strokeWidth="2" vectorEffect="non-scaling-stroke">
                  <title>{s.label} — {s.data[i].label}: {s.data[i].value}</title>
                </circle>
              ))}
            </g>
          );
        })}
      </svg>
      <div className="chart-xlabels">{lines[0].data.map((d, i) => <span key={i}>{d.label}</span>)}</div>
      {showLegend ? (
        <div className="chart-legend">
          {lines.map((s) => <span className="chart-leg" key={s.label}><span className="chart-legdot" style={{ background: s.color }} />{s.label}</span>)}
        </div>
      ) : null}
    </div>
  );
}
