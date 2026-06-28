import React from 'react';
import Icon from '../atoms/Icon.jsx';

/**
 * ActivityItem — سطر نشاط (أيقونة + إجراء + ملف + وقت).
 * <ActivityItem icon="upload" action="رفع" file="Design.fig" time="قبل دقيقتين" />
 */
export default function ActivityItem({ icon, action, file, time }) {
  return (
    <div className="dashact">
      <Icon name={icon} />
      <div className="dashact-main"><div className="dashact-text"><span>{action}</span> <b>{file}</b></div><div className="dashact-time">{time}</div></div>
    </div>
  );
}
