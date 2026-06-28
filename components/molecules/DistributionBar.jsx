import React from 'react';

/**
 * DistributionBar — شريط نِسَب 100% مقسّم إلى شرائح، مع وسيلة إيضاح بالنِّسَب.
 * فكرة إحصائية: «من ماذا يتكوّن الكل؟» (تركيب/حصص) — محايدة للمجال.
 * <DistributionBar segments={[{label:'مباشر',value:48,color:'var(--chart-1)'}, …]} />
 */
export default function DistributionBar({ segments = [], showLegend = true, ariaLabel = 'توزيع نِسَب', className = '' }) {
  const total = segments.reduce((s, x) => s + (x.value || 0), 0) || 1;
  const palette = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-5)', 'var(--chart-7)'];
  const withColor = segments.map((s, i) => ({ ...s, color: s.color || palette[i % palette.length] }));
  return (
    <div className={('distbar ' + className).trim()}>
      <div className="distbar-track" role="img" aria-label={ariaLabel}>
        {withColor.map((s, i) => (
          <span key={i} className="distbar-seg" style={{ width: (s.value / total * 100) + '%', background: s.color }} title={s.label + ': ' + Math.round(s.value / total * 100) + '%'} />
        ))}
      </div>
      {showLegend ? (
        <div className="chart-legend">
          {withColor.map((s, i) => (
            <span className="chart-leg" key={i}>
              <span className="chart-legdot" style={{ background: s.color }} />
              {s.label} <b className="numjoin" style={{ marginInlineStart: 4 }}>{Math.round(s.value / total * 100)}%</b>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
