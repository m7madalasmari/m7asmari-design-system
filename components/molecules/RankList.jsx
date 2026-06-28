import React from 'react';
import Avatar from '../atoms/Avatar.jsx';

/**
 * RankList — قائمة مرتّبة (متصدّرون): رتبة + اسم + قيمة + شريط نسبي. محايد للمجال.
 * items: [{ name, value, sub?, avatar?, color? }] (تُعرض بالترتيب المُمرَّر)
 * <RankList items={[{name:'لوحة المفاتيح', value:1240, color:'var(--chart-1)'}, …]} />
 */
export default function RankList({ items = [], showBar = true, className = '' }) {
  const max = Math.max(...items.map((i) => (typeof i.value === 'number' ? i.value : 0)), 1);
  const fmt = (v) => (typeof v === 'number' ? v.toLocaleString('en-US') : v);
  return (
    <ol className={('ranklist ' + className).trim()}>
      {items.map((it, i) => (
        <li className="rank-row" key={i}>
          <span className="rank-num">{i + 1}</span>
          {it.avatar != null ? <Avatar variant="sm"><img src={it.avatar} alt="" /></Avatar> : null}
          <div className="rank-main">
            <div className="rank-head">
              <span className="rank-name">{it.name}</span>
              <span className="rank-val numjoin">{fmt(it.value)}</span>
            </div>
            {showBar ? (
              <div className="rank-bar"><span style={{ width: (typeof it.value === 'number' ? (it.value / max) * 100 : 0) + '%', background: it.color || 'var(--brand)' }}></span></div>
            ) : (it.sub != null ? <span className="rank-sub">{it.sub}</span> : null)}
          </div>
        </li>
      ))}
    </ol>
  );
}
