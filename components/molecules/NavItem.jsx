import React from 'react';
import Icon from '../atoms/Icon.jsx';

/**
 * NavItem — عنصر تنقّل موحّد.
 *   variant="rail"  → .sideitem (شريط جانبي/درج): نقطة + تسمية.
 *   variant="panel" → .dashcat (لوحة التحكم): أيقونة lucide + تسمية + عدّاد اختياري.
 * <NavItem variant="rail" active label="المحفظة" />
 * <NavItem variant="panel" icon="layout-grid" label="كل العناصر" count={48} active onClick={fn} />
 */
export default function NavItem({ variant = 'rail', label, icon, count, active = false, onClick }) {
  if (variant === 'panel') {
    return (
      <button className={'dashcat' + (active ? ' on' : '')} aria-current={active ? 'true' : undefined} onClick={onClick}>
        <Icon name={icon} />
        <span className="dashcat-label">{label}</span>
        {count != null ? <span className="dashcat-count">{count}</span> : null}
      </button>
    );
  }
  return (
    <div className={'sideitem' + (active ? ' on' : '')} onClick={onClick}>
      <span className="sideicon"></span>{label}
    </div>
  );
}
