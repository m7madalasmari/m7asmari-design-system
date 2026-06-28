import React from 'react';
import DonutChart from '../charts/DonutChart.jsx';

/**
 * RingStat — مقياس نسبة دائري لمقياس واحد (يلفّ DonutChart). محايد للمجال.
 * <RingStat value={68} max={100} label="نسبة الإشغال" color="var(--chart-1)" />
 */
export default function RingStat({ value = 0, max = 100, label, color = 'var(--brand)', size = 130, suffix = '%', className = '' }) {
  const pct = Math.max(0, Math.min(100, Math.round((value / (max || 1)) * 100)));
  // قطعة ملوّنة بنسبة pct + بقيّة شفّافة (تُظهر حلقة الخلفية في DonutChart)
  const segments = [
    { label: label || '', value: pct, color },
    { label: '', value: 100 - pct, color: 'transparent' },
  ];
  return (
    <div className={('ringstat ' + className).trim()}>
      <DonutChart size={size} thickness={14} gap={0} segments={segments} centerLabel={pct + suffix} ariaLabel={label || 'مقياس'} />
      {label != null ? <div className="ringstat-label">{label}</div> : null}
    </div>
  );
}
