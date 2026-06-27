import React from 'react';

/**
 * Slider — منزلق نطاق (RTL) بسحب المؤشّر ولوحة المفاتيح.
 *
 * <Slider value={65} onChange={(v)=>…} min={0} max={100} step={1} ariaLabel="الرسوم" />
 *
 * a11y: role="slider" + aria-valuemin/max/now على المقبض (tabIndex 0) ·
 * أسهم (مراعية لـ RTL) + Home/End. السحب عبر Pointer Events.
 */
export default function Slider({ value, onChange, min = 0, max = 100, step = 1, ariaLabel = 'منزلق' }) {
  const trackRef = React.useRef(null);
  const dragging = React.useRef(false);

  const clamp = (v) => Math.max(min, Math.min(max, v));
  const set = (v) => { const c = clamp(Math.round(v)); if (c !== value && onChange) onChange(c); };

  const fromEvent = (e) => {
    const t = trackRef.current; if (!t) return value;
    const r = t.getBoundingClientRect();
    const pct = (r.right - e.clientX) / r.width * 100; // RTL: التعبئة من اليمين
    return min + (pct / 100) * (max - min);
  };

  const onPointerDown = (e) => {
    dragging.current = true;
    set(fromEvent(e));
    if (e.currentTarget.setPointerCapture && e.pointerId != null) {
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
    }
  };
  const onPointerMove = (e) => { if (dragging.current) set(fromEvent(e)); };
  const onPointerUp = () => { dragging.current = false; };

  const onKeyDown = (e) => {
    let v = null;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') v = value + step;   // RTL: يسار = زيادة
    else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') v = value - step;
    else if (e.key === 'Home') v = min;
    else if (e.key === 'End') v = max;
    else if (e.key === 'PageUp') v = value + step * 10;
    else if (e.key === 'PageDown') v = value - step * 10;
    if (v !== null) { e.preventDefault(); set(v); }
  };

  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div
      className="sliderlive"
      ref={trackRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div className="slider">
        <span className="fill" style={{ width: pct + '%' }}></span>
        <span
          className="knob"
          style={{ right: pct + '%' }}
          role="slider"
          tabIndex={0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-label={ariaLabel}
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
        ></span>
      </div>
    </div>
  );
}
