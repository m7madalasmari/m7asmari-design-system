import React from 'react';
import Icon from '../atoms/Icon.jsx';

/**
 * CommandPalette — لوحة أوامر (⌘K): بحث + قائمة قابلة للتنقّل بالكيبورد. مكوّن مُتحكَّم.
 * commands: [{ id, label, icon?, hint?, action }] · يُتحكَّم بـopen/onClose.
 * <CommandPalette open={open} onClose={()=>setOpen(false)} commands={cmds} />
 */
export default function CommandPalette({ open, onClose, commands = [], placeholder = 'ابحث عن أمر…', ariaLabel = 'لوحة الأوامر' }) {
  const [q, setQ] = React.useState('');
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef(null);
  const list = commands.filter((c) => !q || c.label.includes(q.trim()));

  React.useEffect(() => {
    if (open) { setQ(''); setActive(0); const t = setTimeout(() => inputRef.current && inputRef.current.focus(), 30); return () => clearTimeout(t); }
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose && onClose(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, list.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
      else if (e.key === 'Enter') { const c = list[active]; if (c) { c.action && c.action(); onClose && onClose(); } }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, list, active, onClose]);

  if (!open) return null;
  return (
    <div className="cmdk-scrim" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose && onClose(); }}>
      <div className="cmdk" role="dialog" aria-modal="true" aria-label={ariaLabel}>
        <div className="cmdk-search">
          <Icon name="search" size={18} />
          <input ref={inputRef} value={q} onChange={(e) => { setQ(e.target.value); setActive(0); }} placeholder={placeholder} aria-label={placeholder} />
          <span className="cmdk-kbd">ESC</span>
        </div>
        <div className="cmdk-list" role="listbox" aria-label={ariaLabel}>
          {list.length ? list.map((c, i) => (
            <button
              key={c.id || i}
              type="button"
              className={'cmdk-item' + (i === active ? ' active' : '')}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onClick={() => { c.action && c.action(); onClose && onClose(); }}
            >
              {c.icon != null ? <Icon name={c.icon} size={16} /> : null}
              <span className="cmdk-item-label">{c.label}</span>
              {c.hint != null ? <span className="cmdk-item-hint">{c.hint}</span> : null}
            </button>
          )) : <div className="cmdk-empty">لا نتائج</div>}
        </div>
      </div>
    </div>
  );
}
