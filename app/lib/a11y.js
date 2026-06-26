import React from 'react';

// هل فضّل المستخدم تقليل الحركة؟ (للحركة المُدارة بـ JS: عدّ الأرقام، التمرير الناعم)
export function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// عناصر قابلة للتركيز داخل حاوية (للنوافذ والأدراج).
const FOCUSABLE = [
  'a[href]', 'button:not([disabled])', 'input:not([disabled])',
  'select:not([disabled])', 'textarea:not([disabled])', '[tabindex]:not([tabindex="-1"])',
].join(',');

export function getFocusable(container) {
  if (!container) return [];
  return Array.from(container.querySelectorAll(FOCUSABLE));
}

// حبس التركيز + إغلاق بـ Escape + إرجاع التركيز للعنصر الذي فتح الطبقة.
// يُفعَّل فقط أثناء open؛ التنظيف (عند الإغلاق) يُرجِع التركيز.
export function useFocusTrap(open, onClose, containerRef) {
  const lastFocused = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement;
    const container = containerRef.current;
    if (container) {
      const f = getFocusable(container);
      (f[0] || container).focus();
    }
    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); onClose && onClose(); return; }
      if (e.key !== 'Tab' || !container) return;
      const f = getFocusable(container);
      if (!f.length) { e.preventDefault(); return; }
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      const el = lastFocused.current;
      if (el && typeof el.focus === 'function') el.focus();
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
}

// تعطيل التفاعل/الإعلان (inert + aria-hidden) عند الإغلاق، لمنع وصول Tab لمحتوى مخفي.
export function useInertWhenClosed(open, ref) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open) { el.removeAttribute('inert'); el.removeAttribute('aria-hidden'); }
    else { el.setAttribute('inert', ''); el.setAttribute('aria-hidden', 'true'); }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
}
