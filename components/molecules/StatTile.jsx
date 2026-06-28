import React from 'react';
import Icon from '../atoms/Icon.jsx';

/**
 * StatTile — بطاقة مؤشّر (أيقونة + قيمة + تسمية + تغيّر + اتجاه).
 * <StatTile icon="folder" value="48" label="الملفات" delta="+12%" trend="up" color="var(--chart-1)" />
 */
export default function StatTile({ icon, value, label, delta, trend = 'flat', color = 'var(--brand)' }) {
  const iconStyle = { background: 'color-mix(in srgb, ' + color + ' 13%, transparent)', color };
  const deltaCls = trend === 'up' ? 'dashstat-d up' : 'dashstat-d flat';
  return (
    <div className="dashstat">
      <div className="dashstat-top">
        <div className="dashstat-ic" style={iconStyle}><Icon name={icon} /></div>
        <svg className={'dashstat-trend ' + trend} viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8M21 7v6M21 7h-6"></path></svg>
      </div>
      <div className="dashstat-v">{value}</div>
      <div className="dashstat-l">{label}</div>
      <div className={deltaCls}><Icon name="trending-up" /><span className="numjoin">{delta}</span></div>
    </div>
  );
}
