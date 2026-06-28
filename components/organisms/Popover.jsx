import React from 'react';

/**
 * Popover — طبقة منبثقة مرتكزة على عنصر (قائمة سياق/خيارات). إغلاق بالنقر خارجها أو Esc.
 * children قد تكون دالة تتلقّى {close}. توكنز فقط.
 * <Popover trigger={<Button…/>}>{({close})=>(<button onClick={close}>خيار</button>)}</Popover>
 */
export default function Popover({ trigger, children, placement = 'bottom', ariaLabel = 'قائمة', className = '' }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onEsc = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onEsc);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onEsc); };
  }, [open]);
  return (
    <span className={('popover ' + className).trim()} ref={ref}>
      <span className="popover-trigger" onClick={() => setOpen((o) => !o)}>{trigger}</span>
      {open ? (
        <div className={'popover-pop ' + placement} role="dialog" aria-label={ariaLabel}>
          {typeof children === 'function' ? children({ close: () => setOpen(false) }) : children}
        </div>
      ) : null}
    </span>
  );
}
