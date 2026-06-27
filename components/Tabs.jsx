import React from 'react';

/**
 * Tabs — تبويبات بثلاثة أنماط (pill · seg · und) ومؤشّر منزلق.
 *
 * <Tabs variant="pill" tabs={[{ id, label, panel? }]} defaultActive="id"
 *       ariaLabel="…" showPanel />
 *
 * a11y: role=tablist/tab/tabpanel · aria-selected · aria-controls ·
 * roving tabindex · أسهم يمين/يسار (مراعية لـ RTL) + Home/End · التحديد يتبع التركيز.
 */
export default function Tabs({ variant = 'pill', tabs = [], defaultActive, ariaLabel, showPanel = false }) {
  const [active, setActive] = React.useState(defaultActive ?? (tabs[0] && tabs[0].id));
  const idx = Math.max(0, tabs.findIndex((t) => t.id === active));
  const btnRefs = React.useRef([]);
  const indRef = React.useRef(null);

  const position = React.useCallback(() => {
    if (variant !== 'und') return;
    const el = btnRefs.current[idx], ind = indRef.current;
    if (el && ind) { ind.style.width = el.offsetWidth + 'px'; ind.style.left = el.offsetLeft + 'px'; }
  }, [variant, idx]);

  React.useEffect(() => { position(); }, [position, active]);
  React.useEffect(() => {
    if (variant !== 'und') return;
    const onResize = () => position();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [variant, position]);

  const onKeyDown = (e) => {
    const last = tabs.length - 1;
    let next = null;
    if (e.key === 'ArrowLeft') next = idx === last ? 0 : idx + 1;       // RTL: يسار = التالي
    else if (e.key === 'ArrowRight') next = idx === 0 ? last : idx - 1; // RTL: يمين = السابق
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next !== null) {
      e.preventDefault();
      setActive(tabs[next].id);
      const el = btnRefs.current[next];
      if (el) el.focus();
    }
  };

  const indStyle = variant === 'und' ? undefined : { transform: 'translateX(' + (idx * -100) + '%)' };

  return (
    <React.Fragment>
      <div className={'tablist ' + variant} role="tablist" aria-label={ariaLabel}>
        <div className="tabind" ref={variant === 'und' ? indRef : null} style={indStyle}></div>
        {tabs.map((t, i) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={'tab-' + t.id}
            aria-selected={active === t.id}
            aria-controls={showPanel ? 'tabpanel-' + t.id : undefined}
            tabIndex={active === t.id ? 0 : -1}
            className={'ttab' + (active === t.id ? ' on' : '')}
            ref={(el) => { btnRefs.current[i] = el; }}
            onClick={() => setActive(t.id)}
            onKeyDown={onKeyDown}
          >
            {t.label}
          </button>
        ))}
      </div>
      {showPanel && (
        <div className="tabpanel2" role="tabpanel" id={'tabpanel-' + active} aria-labelledby={'tab-' + active} tabIndex={0}>
          {tabs[idx] && tabs[idx].panel}
        </div>
      )}
    </React.Fragment>
  );
}
