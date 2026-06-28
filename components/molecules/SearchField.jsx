import React from 'react';
import Icon from '../atoms/Icon.jsx';

/**
 * SearchField — حقل بحث موحّد.
 *   variant="pill" → الشكل الدائري (.search) بأيقونة قناع.
 *   variant="dash" → شكل الشريط الجانبي (.dashsearch) بأيقونة lucide + اختصار اختياري.
 * أي خصائص إضافية (placeholder, aria-label, value, readOnly, role, style, onChange…) تُمرَّر للإدخال.
 * <SearchField variant="dash" placeholder="…" aria-label="…" shortcut="⌘K" />
 */
export default function SearchField({ variant = 'pill', shortcut, ...inputProps }) {
  if (variant === 'dash') {
    return (
      <div className="dashsearch">
        <Icon name="search" />
        <input {...inputProps} />
        {shortcut ? <span className="dashkbd">{shortcut}</span> : null}
      </div>
    );
  }
  return (
    <div className="search">
      <span className="mgicon" aria-hidden="true"></span>
      <input {...inputProps} />
      {shortcut ? <span className="dashkbd">{shortcut}</span> : null}
    </div>
  );
}
