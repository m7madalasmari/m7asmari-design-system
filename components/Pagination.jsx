import React from 'react';
import Button from './Button.jsx';

/**
 * Pagination — ترقيم صفحات قابل لإعادة الاستخدام.
 *
 * <Pagination total={5} defaultPage={1} onChange={(p)=>…} ariaLabel="ترقيم الصفحات" />
 *
 * a11y: <nav aria-label> · aria-current="page" للصفحة الحالية ·
 * aria-label لأزرار السابق/التالي.
 */
export default function Pagination({ total = 5, defaultPage = 1, onChange, ariaLabel = 'ترقيم الصفحات' }) {
  const [page, setPage] = React.useState(defaultPage);
  const go = (p) => {
    if (p < 1 || p > total || p === page) return;
    setPage(p);
    if (onChange) onChange(p);
  };
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <nav className="btnrow" aria-label={ariaLabel}>
      <Button variant="secondary sm" aria-label="الصفحة التالية" onClick={() => go(page + 1)}>→</Button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={p === page ? 'btn brand sm' : 'btn ghost sm'}
          aria-current={p === page ? 'page' : undefined}
          aria-label={'الصفحة ' + p}
          onClick={() => go(p)}
        >
          {p}
        </button>
      ))}
      <Button variant="secondary sm" aria-label="الصفحة السابقة" onClick={() => go(page - 1)}>←</Button>
    </nav>
  );
}
