import React from 'react';

/**
 * Breadcrumb — فتات تنقّل موحّد.
 *   variant="default" → .breadcrumb بفواصل «/».
 *   variant="dash"    → .dashcrumb بفواصل chevron (للوحة التحكّم).
 * leadingIcon: أيقونة lucide في البداية (اختياري). آخر عنصر يأخذ صنف .here.
 * <Breadcrumb items={['المحفظة','المقتنيات','…']} />
 * <Breadcrumb variant="dash" leadingIcon="home" items={['الرئيسية']} />
 */
export default function Breadcrumb({ items = [], variant = 'default', leadingIcon }) {
  const last = items.length - 1;
  const dash = variant === 'dash';
  return (
    <div className={dash ? 'dashcrumb' : 'breadcrumb'}>
      {leadingIcon ? <i data-lucide={leadingIcon}></i> : null}
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {dash
            ? <svg viewBox="0 0 24 24" style={{ width: '13px', height: '13px' }}><path d="M9 6l6 6-6 6"></path></svg>
            : (i > 0 ? <span className="crumbsep">/</span> : null)}
          <span className={i === last ? 'here' : undefined}>{it}</span>
        </React.Fragment>
      ))}
    </div>
  );
}
