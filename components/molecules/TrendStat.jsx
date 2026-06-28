import React from 'react';
import Sparkline from '../charts/Sparkline.jsx';

/**
 * TrendStat — مؤشّر رقمي يدمج خطّ الاتجاه داخل البطاقة (قيمة + تغيّر + Sparkline).
 * فكرة إحصائية: «الرقم + كيف وصل إليه» في مساحة واحدة — محايدة للمجال.
 * <TrendStat label="الزيارات" value="8,420" delta="+6%" trend="up" data={[3,5,4,8,6,9]} color="var(--chart-5)" />
 */
export default function TrendStat({ label, value, delta, trend = 'up', data = [], color = 'var(--chart-1)', className = '' }) {
  return (
    <div className={('trendstat ' + className).trim()}>
      <div className="trendstat-top">
        <div>
          <div className="trendstat-val">{value}</div>
          <div className="trendstat-label">{label}</div>
        </div>
        {delta != null ? <span className={'trendstat-delta ' + trend}>{delta}</span> : null}
      </div>
      <Sparkline data={data} color={color} ariaLabel={(label || '') + ' — اتجاه'} />
    </div>
  );
}
