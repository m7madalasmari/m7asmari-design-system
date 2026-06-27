import React from 'react';
import { css } from '../../app/lib/css.js';
import { buildMonth } from '../../app/lib/calendar.js';

/**
 * DatePicker — منتقي تاريخ على أصناف M7 (.cal)، مرتكز عبر .fk-anchor/.fk-pop. مكوّن متحكَّم.
 * value/onChange بصيغة { year, month, day } (month من 0). تقويم ميلادي بأسماء عربية.
 * <DatePicker value={date} onChange={setDate} ariaLabel="تاريخ الميلاد" />
 */
const WD = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
const MONTHS = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

export default function DatePicker({ value, onChange, placeholder = 'اختر تاريخًا', ariaLabel, id, status, ...rest }) {
  void status;
  const today = React.useMemo(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth(), day: d.getDate() };
  }, []);
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState(() => (value ? { year: value.year, month: value.month } : { year: today.year, month: today.month }));
  const rootRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const sel = value && value.year === view.year && value.month === view.month ? value.day : -1;
  const cells = buildMonth(view.year, view.month, sel, today);
  const fmt = value ? value.day + ' ' + MONTHS[value.month] + ' ' + value.year : '';
  const prev = () => setView((v) => (v.month === 0 ? { year: v.year - 1, month: 11 } : { year: v.year, month: v.month - 1 }));
  const next = () => setView((v) => (v.month === 11 ? { year: v.year + 1, month: 0 } : { year: v.year, month: v.month + 1 }));
  const pick = (day) => { if (onChange) onChange({ year: view.year, month: view.month, day }); setOpen(false); };

  return (
    <div className="fk-anchor" ref={rootRef}>
      <div
        className={'selectbox' + (open ? ' open' : '')}
        role="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={ariaLabel}
        id={id}
        tabIndex={0}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen((o) => !o); }
          else if (e.key === 'Escape') { setOpen(false); }
        }}
        {...rest}
      >
        <span style={fmt ? undefined : css('color:var(--text-muted)')}>{fmt || placeholder}</span>
        <span className="chev" aria-hidden="true">▾</span>
      </div>
      {open ? (
        <div className="fk-pop auto">
          <div className="cal">
            <div className="cal-head">
              <button type="button" className="cal-btn" aria-label="الشهر السابق" onClick={prev}>‹</button>
              <div className="cal-title">{MONTHS[view.month]} {view.year}</div>
              <button type="button" className="cal-btn" aria-label="الشهر التالي" onClick={next}>›</button>
            </div>
            <div className="cal-grid">
              {WD.map((w) => <div className="cal-wd" key={w}>{w}</div>)}
              {cells.map((c, i) => (c.muted
                ? <div className="cal-day muted" key={i} aria-hidden="true">{c.label}</div>
                : (
                  <button
                    type="button"
                    key={i}
                    className={'cal-day' + (c.today ? ' today' : '') + (c.selected ? ' sel' : '')}
                    aria-label={c.label + ' ' + MONTHS[view.month] + ' ' + view.year}
                    aria-pressed={c.selected}
                    onClick={() => pick(c.day)}
                  >
                    {c.label}
                  </button>
                )
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
