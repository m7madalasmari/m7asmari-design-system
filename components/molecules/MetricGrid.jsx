import React from 'react';
import Sparkline from '../charts/Sparkline.jsx';

/**
 * MetricGrid — جدول مقارنة مدمج لعدّة مؤشّرات دفعةً واحدة (قيمة + تغيّر + اتجاه).
 * فكرة إحصائية: «امسح عدّة مقاييس بنظرة واحدة» (مقارنة متعدّدة). توكنز فقط، RTL.
 * rows: [{ label, value, prev?, unit?, data?:number[], color? }]
 * <MetricGrid rows={[{label:'الإيراد',value:128400,prev:112500,unit:' ر.س',data:[…]}, …]} />
 */
export default function MetricGrid({ rows = [], ariaLabel = 'جدول مؤشّرات', className = '' }) {
  if (!rows.length) return null;
  const fmt = (n) => (typeof n === 'number' ? n.toLocaleString('en-US') : n);
  return (
    <table className={('metricgrid ' + className).trim()} aria-label={ariaLabel}>
      <thead>
        <tr><th>المؤشّر</th><th className="mg-num">الحالي</th><th className="mg-num">التغيّر</th><th className="mg-trend-h">الاتجاه</th></tr>
      </thead>
      <tbody>
        {rows.map((r, i) => {
          const delta = (r.prev != null && r.prev !== 0) ? Math.round(((r.value - r.prev) / r.prev) * 100) : null;
          const up = delta != null && delta >= 0;
          return (
            <tr key={i}>
              <td className="mg-label">{r.label}</td>
              <td className="mg-num"><span className="mg-val numjoin">{fmt(r.value)}{r.unit || ''}</span></td>
              <td className="mg-num">{delta != null ? <span className={'mg-delta ' + (up ? 'up' : 'down')}>{up ? '▲' : '▼'} <span className="numjoin">{Math.abs(delta)}%</span></span> : <span className="mg-delta flat">—</span>}</td>
              <td className="mg-trend">{r.data && r.data.length >= 2 ? <Sparkline data={r.data} height={28} fill={false} color={r.color || (up ? 'var(--success)' : 'var(--chart-1)')} /> : null}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
