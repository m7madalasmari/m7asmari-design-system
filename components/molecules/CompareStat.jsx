import React from 'react';

/**
 * CompareStat — مؤشّر مقارنة بين الفترة الحالية والسابقة:
 * قيمة كبيرة + نسبة التغيّر + شريطان (الحالي/السابق) للمقارنة البصرية المباشرة.
 * فكرة إحصائية: «كم تغيّرنا عن آخر مرّة؟» — محايدة للمجال.
 * <CompareStat label="الإيراد" value={128400} prev={112000} unit=" ر.س" color="var(--chart-1)" />
 */
export default function CompareStat({ label, value = 0, prev = 0, unit = '', color = 'var(--chart-1)', className = '' }) {
  const delta = prev ? Math.round(((value - prev) / prev) * 100) : 0;
  const up = delta >= 0;
  const max = Math.max(value, prev, 1);
  const fmt = (n) => n.toLocaleString('en-US');
  return (
    <div className={('comparestat ' + className).trim()}>
      <div className="comparestat-label">{label}</div>
      <div className="comparestat-row">
        <span className="comparestat-val">{fmt(value)}<span className="numjoin">{unit}</span></span>
        {prev ? <span className={'comparestat-delta ' + (up ? 'up' : 'down')}>{up ? '▲' : '▼'} <span className="numjoin">{Math.abs(delta)}%</span></span> : null}
      </div>
      <div className="comparestat-bars">
        <div className="comparestat-bar"><span style={{ width: (value / max * 100) + '%', background: color }} /></div>
        <div className="comparestat-bar prev"><span style={{ width: (prev / max * 100) + '%' }} /></div>
      </div>
      <div className="comparestat-legend"><span>الحالي</span><span>السابق</span></div>
    </div>
  );
}
