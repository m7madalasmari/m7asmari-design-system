import React from 'react';

/**
 * CollapsibleSection — مجموعة قابلة للطيّ في الشريط الجانبي.
 * <CollapsibleSection open title="المجلّدات" titleIcon={<svg/>} actions={<div/>} onToggle={fn}>…</CollapsibleSection>
 */
export default function CollapsibleSection({ open = false, title, titleIcon, actions, onToggle, children }) {
  const onKey = (e) => { if (onToggle && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onToggle(e); } };
  return (
    <div className={'dashsecwrap dashsec' + (open ? ' open' : '')}>
      <div className="dashsec-head">
        <div className="dashsec-title" onClick={onToggle} onKeyDown={onKey} role="button" tabIndex={0} aria-expanded={open}>
          <svg className="chev" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"></path></svg>
          {titleIcon}{title}
        </div>
        {actions}
      </div>
      <div className="dashsec-body"><div className="dashsec-inner">{children}</div></div>
    </div>
  );
}
