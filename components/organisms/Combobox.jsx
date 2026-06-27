import React from 'react';

/**
 * Combobox — حقل بحث/إكمال تلقائي على أصناف M7 (.search + .menu + .combohi)، مرتكز عبر .fk-anchor/.fk-pop.
 * يفلتر الخيارات بالنصّ ويميّز المطابقة. كيبورد: أسهم/Enter/Esc.
 * <Combobox value={v} onChange={setV} options={[{value:'sa',label:'السعودية'}]} ariaLabel="الدولة" />
 */
export default function Combobox({
  value,
  onChange,
  options = [],
  placeholder = 'ابحث…',
  ariaLabel,
  id,
  status, // يُبتلع (يأتي من Field)
  ...rest
}) {
  void status;
  const [query, setQuery] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const rootRef = React.useRef(null);

  const selected = options.find((o) => o.value === value);
  const display = open ? query : (selected ? selected.label : '');
  const q = query.trim();
  const filtered = q ? options.filter((o) => o.label.includes(q)) : options;

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const choose = (o) => { if (o && onChange) onChange(o.value); setQuery(''); setOpen(false); };

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setActive((a) => Math.min(a + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); if (open && filtered[active]) choose(filtered[active]); }
    else if (e.key === 'Escape') { setOpen(false); }
  };

  const highlight = (label) => {
    if (!q) return label;
    const idx = label.indexOf(q);
    if (idx < 0) return label;
    return (<>{label.slice(0, idx)}<span className="combohi">{label.slice(idx, idx + q.length)}</span>{label.slice(idx + q.length)}</>);
  };

  return (
    <div className="fk-anchor" ref={rootRef}>
      <div className="search">
        <span className="mgicon" aria-hidden="true"></span>
        <input
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-label={ariaLabel}
          value={display}
          placeholder={placeholder}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); setActive(0); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          {...rest}
        />
      </div>
      {open && filtered.length ? (
        <div className="fk-pop">
          <div className="menu" role="listbox" aria-label={ariaLabel}>
            {filtered.map((o, i) => (
              <div
                key={o.value}
                className={'menuitem' + (o.value === value ? ' sel' : '') + (i === active ? ' active' : '')}
                role="option"
                aria-selected={o.value === value}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(o)}
              >
                {highlight(o.label)}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
