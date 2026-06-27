import React from 'react';

/**
 * SidebarItem — عنصر تنقّل في الشريط الجانبي (أيقونة + تسمية + عدّاد).
 * <SidebarItem icon="layout-grid" label="كل العناصر" count={48} active onClick={fn} />
 */
export default function SidebarItem({ icon, label, count, active = false, onClick }) {
  return (
    <button className={'dashcat' + (active ? ' on' : '')} aria-current={active ? 'true' : undefined} onClick={onClick}>
      <i data-lucide={icon}></i>
      <span className="dashcat-label">{label}</span>
      <span className="dashcat-count">{count}</span>
    </button>
  );
}
