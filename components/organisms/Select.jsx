import React from 'react';
import { css } from '../../app/lib/css.js';

/**
 * Select — قائمة اختيار منسدلة على أصناف M7 (.selectbox + .menu)، مرتكزة عبر .fk-anchor/.fk-pop.
 * مكوّن متحكَّم. كيبورد: Enter/Space/سهم لفتح؛ أسهم/Home/End للتنقّل؛ Enter للاختيار؛ Esc للإغلاق.
 * نقرة خارج الحقل تُغلق. options: [{value, label}].
 * <Select value={v} onChange={setV} options={[{value:'sa',label:'السعودية'}]} ariaLabel="الدولة" />
 */
export default function Select({
  value,
  onChange,
  options = [],
  placeholder = 'اختر…',
  ariaLabel,
  id,
  status, // يُبتلع (يأتي من Field)
  bare = false, // بلا حدود/خلفية — للاستخدام داخل حقل آخر (مثل PhoneInput)
  className = '',
  ...rest
}) {
  void status;
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(-1);
  const rootRef = React.useRef(null);
  const selectedIdx = options.findIndex((o) => o.value === value);
  const selected = selectedIdx >= 0 ? options[selectedIdx] : null;

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const openMenu = () => { setActive(selectedIdx >= 0 ? selectedIdx : 0); setOpen(true); };
  const choose = (i) => { const o = options[i]; if (o && onChange) onChange(o.value); setOpen(false); };

  const onKey = (e) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); openMenu(); }
      return;
    }
    if (e.key === 'Escape') { e.preventDefault(); setOpen(false); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, options.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === 'Home') { e.preventDefault(); setActive(0); }
    else if (e.key === 'End') { e.preventDefault(); setActive(options.length - 1); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (active >= 0) choose(active); }
  };

  return (
    <div className="fk-anchor" ref={rootRef}>
      <div
        className={(bare ? 'fk-dial-trigger' : 'selectbox') + (open ? ' open' : '') + (className ? ' ' + className : '')}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        id={id}
        tabIndex={0}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKey}
        {...rest}
      >
        <span style={selected ? undefined : css('color:var(--text-muted)')}>
          {selected ? selected.label : placeholder}
        </span>
        <span className="chev" aria-hidden="true">▾</span>
      </div>
      {open ? (
        <div className={'fk-pop' + (bare ? ' auto' : '')}>
          <div className="menu" role="listbox" aria-label={ariaLabel}>
            {options.map((o, i) => (
              <div
                key={o.value}
                className={'menuitem' + (o.value === value ? ' sel' : '') + (i === active ? ' active' : '')}
                role="option"
                aria-selected={o.value === value}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(i)}
              >
                {o.label}
                {o.value === value ? <span aria-hidden="true">✓</span> : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
