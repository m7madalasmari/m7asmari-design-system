import React from 'react';
import Icon from '../atoms/Icon.jsx';

/**
 * GoalCard — مؤشّر تقدّم نحو هدف (قيمة/هدف + شريط + نسبة). محايد للمجال.
 * <GoalCard label="هدف المبيعات" value={82000} target={100000} unit=" ر.س" icon="trending-up" color="var(--chart-1)" />
 */
export default function GoalCard({ label, value = 0, target = 100, unit = '', icon, color = 'var(--brand)', className = '' }) {
  const pct = Math.max(0, Math.min(100, Math.round((value / (target || 1)) * 100)));
  const fmt = (n) => (typeof n === 'number' ? n.toLocaleString('en-US') : n);
  return (
    <div className={('goalcard ' + className).trim()}>
      <div className="goalcard-top">
        {icon != null ? <span className="goalcard-ic" style={{ color }}><Icon name={icon} size={16} /></span> : null}
        <span className="goalcard-label">{label}</span>
        <span className="goalcard-pct numjoin">{pct}%</span>
      </div>
      <div className="goalcard-val numjoin">{fmt(value)}{unit}<span className="goalcard-target"> / {fmt(target)}{unit}</span></div>
      <div className="progress"><span className="bar" style={{ width: pct + '%', background: color }}></span></div>
    </div>
  );
}
