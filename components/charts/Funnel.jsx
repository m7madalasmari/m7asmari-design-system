import React from 'react';

/**
 * Funnel — قمع تحويل: صفوف متمركزة متناقصة العرض. CSS/توكنز فقط.
 * stages: [{ label, value, color? }] (مرتّبة تنازليًا عادةً).
 * <Funnel stages={[{label:'زيارات',value:1000},{label:'سلّة',value:420},…]} />
 */
export default function Funnel({ stages = [], ariaLabel = 'قمع تحويل', className = '' }) {
  if (!stages.length) return null;
  const max = Math.max(...stages.map((s) => s.value), 1);
  const top = stages[0].value || 1;
  return (
    <div className={('funnel ' + className).trim()} role="img" aria-label={ariaLabel}>
      {stages.map((s, i) => {
        const w = Math.max(10, (s.value / max) * 100);
        const pct = Math.round((s.value / top) * 100);
        return (
          <div className="funnel-row" key={i}>
            <div className="funnel-bar" style={{ width: w + '%', background: s.color || 'var(--chart-1)' }}>
              <span className="funnel-val numjoin">{s.value.toLocaleString('en-US')}</span>
            </div>
            <div className="funnel-meta">
              <span className="funnel-label">{s.label}</span>
              <span className="funnel-pct numjoin">{pct}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
