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
  const interactive = typeof onClick === 'function';
  const onKey = (e) => { if (interactive && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onClick(e); } };
  return (
    <div
      className={'sideitem' + (active ? ' on' : '')}
      onClick={onClick}
      onKeyDown={interactive ? onKey : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-current={active ? 'true' : undefined}
    >
      <span className="sideicon"></span>{label}
    </div>
  );
}
