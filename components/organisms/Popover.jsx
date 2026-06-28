import React from 'react';

/**
 * Popover — طبقة منبثقة مرتكزة على عنصر (قائمة سياق/خيارات) بنمط disclosure متاح:
 * المُطلِق عنصر قابل للتركيز (يجب أن يكون <button>) يُستنسخ ليحمل aria-haspopup/aria-expanded
 * ويبدّل الفتح؛ يُغلق بالنقر خارجها أو بـEsc مع إعادة التركيز إلى المُطلِق، وعند الفتح
 * يُنقل التركيز لأول عنصر داخل اللوحة. children قد تكون دالة تتلقّى {close}. توكنز فقط.
 * <Popover trigger={<button…/>}>{({close})=>(<a onClick={close}>خيار</a>)}</Popover>
 */
export default function Popover({ trigger, children, placement = 'bottom', ariaLabel = 'قائمة', className = '' }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const popRef = React.useRef(null);
  const popId = React.useId();

  const close = React.useCallback(() => {
    setOpen(false);
    const t = ref.current && ref.current.querySelector('.popover-trigger button, .popover-trigger [role="button"], .popover-trigger a');
    if (t) t.focus();
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onEsc = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onEsc);
    // انقل التركيز لأول عنصر تفاعلي داخل اللوحة عند الفتح
    const first = popRef.current && popRef.current.querySelector('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])');
    if (first) first.focus();
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onEsc); };
  }, [open, close]);

  // استنسخ المُطلِق ليحمل دلالات الـdisclosure دون إنشاء زرّ داخل زرّ.
  const triggerEl = React.cloneElement(trigger, {
    onClick: (e) => { if (trigger.props.onClick) trigger.props.onClick(e); setOpen((o) => !o); },
    'aria-haspopup': 'true',
    'aria-expanded': open,
    'aria-controls': open ? popId : undefined,
  });

  return (
    <span className={('popover ' + className).trim()} ref={ref}>
      <span className="popover-trigger">{triggerEl}</span>
      {open ? (
        <div id={popId} ref={popRef} className={'popover-pop ' + placement} aria-label={ariaLabel}>
          {typeof children === 'function' ? children({ close }) : children}
        </div>
      ) : null}
    </span>
  );
}
