import React from 'react';
import SearchField from './SearchField.jsx';
import Select from '../organisms/Select.jsx';

/**
 * FilterBar — شريط بحث + فلاتر منسدلة موحّد. محايد للمجال (جداول/قوائم أي قطاع).
 * filters: [{ value, onChange, options, ariaLabel, placeholder }]
 * <FilterBar query={q} onQuery={setQ} filters={[{value:status,onChange:setStatus,options,…}]} actions={…} />
 */
export default function FilterBar({ query, onQuery, searchPlaceholder = 'بحث…', filters = [], actions, className = '' }) {
  return (
    <div className={('filterbar ' + className).trim()}>
      {onQuery != null ? (
        <div className="filterbar-search">
          <SearchField variant="dash" value={query} onChange={(e) => onQuery(e.target.value)} placeholder={searchPlaceholder} aria-label={searchPlaceholder} />
        </div>
      ) : null}
      {filters.map((f, i) => (
        <div className="filterbar-sel" key={i}>
          <Select value={f.value} onChange={f.onChange} options={f.options} ariaLabel={f.ariaLabel} placeholder={f.placeholder} />
        </div>
      ))}
      {actions != null ? <div className="filterbar-acts">{actions}</div> : null}
    </div>
  );
}
