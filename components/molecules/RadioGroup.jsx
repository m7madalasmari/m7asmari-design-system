import React from 'react';
import Radio from '../atoms/Radio.jsx';

/**
 * RadioGroup — مجموعة راديو (role=radiogroup) مع تنقّل بالأسهم وroving tabindex.
 * في RTL: السهم لليسار/الأسفل ينتقل للتالي، اليمين/الأعلى للسابق.
 * <RadioGroup value={v} onChange={setV} ariaLabel="اختر الخطة"
 *   options={[{value:'free',label:'المبتدئ',hint:'مجاني'}, {value:'pro',label:'الاحترافي'}]} />
 */
export default function RadioGroup({
  value,
  onChange,
  options = [],
  ariaLabel,
  status, // يُبتلع (يأتي من Field)
  className = '',
}) {
  void status;
  const enabled = options.filter((o) => !o.disabled);
  const move = (dir) => {
    if (!enabled.length || !onChange) return;
    const idx = enabled.findIndex((o) => o.value === value);
    const next = enabled[(idx + dir + enabled.length) % enabled.length];
    if (next) onChange(next.value);
  };
  const onKey = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp' || e.key === 'ArrowRight') { e.preventDefault(); move(-1); }
  };
  const tabbable = options.some((o) => o.value === value && !o.disabled)
    ? value
    : (enabled[0] && enabled[0].value);

  return (
    <div
      className={'fx col gap16' + (className ? ' ' + className : '')}
      role="radiogroup"
      aria-label={ariaLabel}
      onKeyDown={onKey}
    >
      {options.map((o) => (
        <Radio
          key={o.value}
          checked={o.value === value}
          disabled={o.disabled}
          label={o.label}
          hint={o.hint}
          tabIndex={o.value === tabbable ? 0 : -1}
          onSelect={() => onChange && onChange(o.value)}
        />
      ))}
    </div>
  );
}
