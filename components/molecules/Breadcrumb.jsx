import React from 'react';
import Icon from '../atoms/Icon.jsx';

/**
 * Breadcrumb — فتات تنقّل موحّد.
 *   variant="default" → .breadcrumb بفواصل «/».
 *   variant="dash"    → .dashcrumb بفواصل chevron (للوحة التحكّم).
 * leadingIcon: أيقونة lucide في البداية (اختياري). آخر عنصر يأخذ صنف .here.
 * كل عنصر نصّ، أو { label, href } لجعله رابطًا قابلًا للنقر (للرجوع للطبقة الأعلى).
 * العنصر الأخير (الصفحة الحالية) يبقى نصًّا دائمًا حتى لو مُرّر له href.
 * <Breadcrumb items={['المحفظة','المقتنيات','…']} />
 * <Breadcrumb items={[{ label: 'الرئيسية', href: '/' }, 'المجموعات', 'مجموعة اللوحات']} />
 */
export default function Breadcrumb({ items = [], variant = 'default', leadingIcon }) {
  const last = items.length - 1;
  const dash = variant === 'dash';
  return (
    <div className={dash ? 'dashcrumb' : 'breadcrumb'}>
      {leadingIcon ? <Icon name={leadingIcon} /> : null}
      {items.map((it, i) => {
        const label = typeof it === 'string' ? it : it.label;
        const href = typeof it === 'object' && it ? it.href : undefined;
        const here = i === last;
        return (
          <React.Fragment key={i}>
            {dash
              ? <Icon name="chevron-left" size={13} />
              : (i > 0 ? <span className="crumbsep">/</span> : null)}
            {href && !here
              ? <a href={href} style={{ color: 'inherit', textDecoration: 'none' }}>{label}</a>
              : <span className={here ? 'here' : undefined}>{label}</span>}
          </React.Fragment>
        );
      })}
    </div>
  );
}
