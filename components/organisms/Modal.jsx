import React from 'react';
import { useFocusTrap, useInertWhenClosed } from '../../app/lib/a11y.js';

/**
 * Modal — نافذة حوار قابلة لإعادة الاستخدام.
 *
 * <Modal open={bool} onClose={fn} labelledBy="id" describedBy="id">…</Modal>
 *
 * يوفّر: role="dialog" · aria-modal · حبس التركيز · إغلاق بـ Escape ·
 * إغلاق بالنقر على الخلفية · إرجاع التركيز للزر الذي فتحه · inert عند الإغلاق.
 * يحافظ على نفس الأصناف (mscrim/mdialog) والانتقالات البصرية.
 */
export default function Modal({ open, onClose, labelledBy, describedBy, ariaLabel, dialogClassName = 'mdialog', children }) {
  const scrimRef = React.useRef(null);
  const dialogRef = React.useRef(null);
  useFocusTrap(open, onClose, dialogRef);
  useInertWhenClosed(open, scrimRef);
  return (
    <div ref={scrimRef} className={'mscrim' + (open ? ' open' : '')} onClick={onClose}>
      <div
        ref={dialogRef}
        className={dialogClassName}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
