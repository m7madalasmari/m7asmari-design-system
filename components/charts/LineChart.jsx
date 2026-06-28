import React from 'react';

/**
 * LineChart — مخطط خطّي بمساحة، تحجيم منتظم (بلا تشوّه)، شبكة خفيفة، نقاط، وتلميح hover.
 * data: [{ label, value }]؛ color من توكنز النظام (افتراضيًا --chart-1).
 * <LineChart data={[{label:'سبت',value:12}, …]} />
 */
export default function LineChart({ data = [], color = 'var(--chart-1)', ariaLabel = 'مخطط خطّي', className = '' }) {
  const n = data.length;
  if (n < 2) return null;
  const W = 600, H = 220, padX = 14, padTop = 18, padBottom = 26;
  const vals = data.map((d) => d.value);
  const max = Math.max(...vals), min = Math.min(...vals, 0);
  const span = max - min || 1;
  const plotH = H - padTop - padBottom;
  const baseY = padTop + plotH;
  const dx = (W - padX * 2) / (n - 1);
  const x = (i) => padX + i * dx;
  const y = (v) => padTop + (1 - (v - min) / span) * plotH;
  const pts = data.map((d, i) => [x(i), y(d.value)]);
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = line + ` L${x(n - 1).toFixed(1)} ${baseY} L${x(0).toFixed(1)} ${baseY} Z`;
  const grid = [0, 0.25, 0.5, 0.75, 1].map((t) => padTop + t * plotH);
  return (
    <div className={('linechart ' + className).trim()}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label={ariaLabel} style={{ display: 'block', height: 'auto' }}>
        {grid.map((gy, i) => (<line key={i} className="chart-grid" x1={padX} y1={gy} x2={W - padX} y2={gy} vectorEffect="non-scaling-stroke" />))}
        <path d={area} fill={color} opacity="0.10" />
        <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        {pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill="var(--surface)" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke">
            <title>{data[i].label}: {data[i].value}</title>
          </circle>
        ))}
      </svg>
      <div className="chart-xlabels">{data.map((d, i) => <span key={i}>{d.label}</span>)}</div>
    </div>
  );
}
