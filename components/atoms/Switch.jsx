import React from 'react';

/**
 * Switch — مفتاح تبديل على صنفي M7 (.cbx + .switch). عنصر role=switch مع تفعيل
 * بـ Enter/Space. الزرّ الداخلي زخرفي (aria-hidden) والحالة على الحاوية.
 * <Switch checked={on} onChange={(next)=>setOn(next)}>تفعيل الإشعارات</Switch>
 */
export default function Switch({
  checked = false,
  disabled = false,
  onChange,
  status, // يُبتلع (يأتي من Field)
  className = '',
  children,
  ...rest
}) {
  void status;
  const cls = 'cbx' + (disabled ? ' dis' : '') + (className ? ' ' + className : '');
  const swCls = 'switch' + (checked ? ' on' : '') + (disabled ? ' dis' : '');
  const toggle = () => { if (!disabled && onChange) onChange(!checked); };
  const onKey = (e) => { if ((e.key === 'Enter' || e.key === ' ') && !disabled) { e.preventDefault(); toggle(); } };
  return (
    <div
      className={cls}
      role="switch"
      aria-checked={checked}
      {...(disabled ? { 'aria-disabled': true } : { tabIndex: 0 })}
      onClick={toggle}
      onKeyDown={onKey}
      {...rest}
    >
      <button className={swCls} tabIndex={-1} aria-hidden="true" type="button"></button>
      {children != null ? <span>{children}</span> : null}
    </div>
  );
}
