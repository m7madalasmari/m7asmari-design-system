import React from 'react';

/**
 * Radio — زر راديو مفرد على صنفي M7 (.cbx + .radio). عادةً يُدار عبر RadioGroup،
 * لكنه يعمل مستقلًّا. tabIndex يُمرَّر من المجموعة (roving tabindex).
 * <Radio checked={sel} onSelect={()=>…} label="المبتدئ" hint="مجاني" />
 */
export default function Radio({
  checked = false,
  disabled = false,
  onSelect,
  label,
  hint,
  tabIndex,
  className = '',
  ...rest
}) {
  const radCls = 'radio' + (checked ? ' on' : '') + (disabled ? ' dis' : '');
  const rowCls = 'cbx' + (disabled ? ' dis' : '') + (className ? ' ' + className : '');
  const sel = () => { if (!disabled && onSelect) onSelect(); };
  return (
    <div
      className={rowCls}
      role="radio"
      aria-checked={checked}
      {...(disabled ? { 'aria-disabled': true } : { tabIndex: tabIndex == null ? (checked ? 0 : -1) : tabIndex })}
      onClick={sel}
      {...rest}
    >
      <span className={radCls}></span>
      {label != null ? <span className="f1">{label}</span> : null}
      {hint != null ? <span className="t-sm">{hint}</span> : null}
    </div>
  );
}
