import React from 'react';
import { css } from '../lib/css.js';
import Icon from '../../components/atoms/Icon.jsx';
import Popover from '../../components/organisms/Popover.jsx';

/**
 * KitsMenu — قائمة «المجموعات» المنسدلة في الهيدر الموحّد، تتيح التنقّل الجانبي بين الـKits.
 * تعيد استخدام Popover + الصنف .cmdk-item القائمَين (بلا CSS جديد). أي Kit جديد = سطر هنا فقط.
 * active: 'form'|'dashboard'|… لإبراز المجموعة الحالية.
 */
const KITS = [
  { id: 'form', label: 'مجموعة النماذج', href: '/formkit.html', icon: 'file-text' },
  { id: 'dashboard', label: 'مجموعة اللوحات', href: '/dashboardkit.html', icon: 'layout-grid' },
];

export default function KitsMenu({ active }) {
  const on = active === 'form' || active === 'dashboard';
  return (
    <Popover
      ariaLabel="المجموعات"
      trigger={
        <button type="button" style={css('display:inline-flex;align-items:center;gap:6px;cursor:pointer;background:none;border:none;font:inherit;padding:0;color:' + (on ? 'var(--text-primary)' : 'inherit'))}>
          المجموعات<Icon name="chevron-down" size={15} />
        </button>
      }
    >
      {({ close }) => (
        <div className="fx col" style={css('gap:2px')}>
          {KITS.map((k) => (
            <a
              key={k.id}
              className={'cmdk-item' + (active === k.id ? ' active' : '')}
              href={k.href}
              onClick={close}
              aria-current={active === k.id ? 'page' : undefined}
              style={css('text-decoration:none')}
            >
              <Icon name={k.icon} size={16} />
              <span className="cmdk-item-label">{k.label}</span>
            </a>
          ))}
        </div>
      )}
    </Popover>
  );
}
