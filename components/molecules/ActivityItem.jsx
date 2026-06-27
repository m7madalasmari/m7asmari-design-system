import React from 'react';

/**
 * ActivityItem — سطر نشاط (أيقونة + إجراء + ملف + وقت).
 * <ActivityItem icon="upload" action="رفع" file="Design.fig" time="قبل دقيقتين" />
 */
export default function ActivityItem({ icon, action, file, time }) {
  return (
    <div className="dashact">
      <i data-lucide={icon}></i>
      <div className="dashact-main"><div className="dashact-text"><span>{action}</span> <b>{file}</b></div><div className="dashact-time">{time}</div></div>
    </div>
  );
}
