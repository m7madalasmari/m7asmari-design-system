import React from 'react';

/**
 * Checkbox — مربع اختيار على صنفي M7 (.cbx + .cbx-box). عنصر مخصّص role=checkbox
 * مع تفعيل بـ Enter/Space. indeterminate يعرض شرطة (aria-checked="mixed").
 * <Checkbox checked={ok} onChange={(next)=>setOk(next)} disabled>أوافق على الشروط</Checkbox>
 */
export default function Checkbox({
  checked = false,
  indeterminate = false,
  disabled = false,
  onChange,
  status, // يُبتلع (يأتي من Field) — لا حالة تباين بصرية للمربع
  className = '',
  children,
  ...rest
}) {
  void status;
  const on = checked || indeterminate;
  const cls = 'cbx' + (on ? ' on' : '') + (disabled ? ' dis' : '') + (className ? ' ' + className : '');
  const toggle = () => { if (!disabled && onChange) onChange(!checked); };
  const onKey = (e) => { if ((e.key === 'Enter' || e.key === ' ') && !disabled) { e.preventDefault(); toggle(); } };
  return (
    <div
      className={cls}
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : checked}
      {...(disabled ? { 'aria-disabled': true } : { tabIndex: 0 })}
      onClick={toggle}
      onKeyDown={onKey}
      {...rest}
    >
      <span className="cbx-box">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          {indeterminate
            ? <path className="dash" d="M6 12h12"></path>
            : <path className="ck" d="M5 13l4 4L19 7"></path>}
        </svg>
      </span>
      {children != null ? <span>{children}</span> : null}
    </div>
  );
}
