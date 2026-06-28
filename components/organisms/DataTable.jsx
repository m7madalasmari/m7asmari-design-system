import React from 'react';
import Pagination from '../molecules/Pagination.jsx';
import { sortRows, nextSortDir, ariaSortFor } from '../../app/lib/sort.js';

/**
 * DataTable — جدول قابل للفرز + ترقيم اختياري، على أصناف M7 (.tablewrap/.tbl/.sortable).
 * يعيد استخدام منطق app/lib/sort.js ومكوّن Pagination. مكوّن مُدار داخليًا.
 *
 * columns: [{ key, label, align?: 'center', sortable?: bool, num?: bool, render?: (row)=>node }]
 * rows: [{...}] (يفضَّل وجود id) · pageSize?: number
 *
 * <DataTable columns={cols} rows={rows} pageSize={6} ariaLabel="المعاملات" />
 */
export default function DataTable({ columns = [], rows = [], pageSize, ariaLabel = 'جدول بيانات', className = '' }) {
  const [sortKey, setSortKey] = React.useState(null);
  const [sortDir, setSortDir] = React.useState(1);
  const [page, setPage] = React.useState(1);

  const sorted = sortKey ? sortRows(rows, sortKey, sortDir) : rows;
  const totalPages = pageSize ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1;
  const view = pageSize ? sorted.slice((page - 1) * pageSize, page * pageSize) : sorted;

  const onSort = (key) => {
    setSortDir((d) => nextSortDir(sortKey, d, key));
    setSortKey(key);
    setPage(1);
  };

  const cellAlign = (c) => (c.align === 'center' ? { textAlign: 'center' } : undefined);

  return (
    <div className={('fx col gap16 ' + className).trim()}>
      <div className="tablewrap">
        <table className="tbl" aria-label={ariaLabel}>
          <thead>
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={c.sortable ? 'sortable' : undefined}
                  aria-sort={c.sortable ? ariaSortFor(sortKey, sortDir, c.key) : undefined}
                  style={cellAlign(c)}
                >
                  {c.sortable
                    ? <button type="button" className="th-sort" onClick={() => onSort(c.key)}>{c.label}</button>
                    : c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {view.map((r, ri) => (
              <tr key={r.id != null ? r.id : ri}>
                {columns.map((c) => (
                  <td key={c.key} className={c.num ? 'tnum' : undefined} style={cellAlign(c)}>
                    {c.render ? c.render(r) : r[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pageSize && totalPages > 1 ? (
        // key يُعيد ضبط Pagination إلى الصفحة 1 عند تغيّر الفرز/عدد الصفحات (تفادي عدم التزامن)
        <Pagination key={String(sortKey) + '|' + sortDir + '|' + totalPages} total={totalPages} defaultPage={1} onChange={setPage} />
      ) : null}
    </div>
  );
}
