import React from 'react';
import { useFocusTrap, useInertWhenClosed } from '../../app/lib/a11y.js';

/**
 * Drawer — درج جانبي أو ورقة سفلية قابلة لإعادة الاستخدام.
 *
 * <Drawer open onClose placement="right|left|bottom" ariaLabel="القائمة">…</Drawer>
 *
 * يوفّر: role="dialog" · aria-modal · حبس التركيز · Escape · نقر الخلفية للإغلاق ·
 * إرجاع التركيز · inert عند الإغلاق. الخلفية واللوح عنصران شقيقان (نفس البنية الأصلية).
 */
export default function Drawer({ open, onClose, placement = 'right', ariaLabel, labelledBy, children }) {
  const scrimRef = React.useRef(null);
  const panelRef = React.useRef(null);
  useFocusTrap(open, onClose, panelRef);
  useInertWhenClosed(open, panelRef);
  const panelCls = placement === 'bottom'
    ? 'sheet2' + (open ? ' open' : '')
    : 'drawer2 ' + placement + (open ? ' open' : '');
  return (
    <React.Fragment>
      <div ref={scrimRef} className={'scrim2' + (open ? ' open' : '')} onClick={onClose}></div>
      <div
        ref={panelRef}
        className={panelCls}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={labelledBy}
        tabIndex={-1}
      >
        {children}
      </div>
    </React.Fragment>
  );
}
