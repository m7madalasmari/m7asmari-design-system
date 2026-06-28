import React from 'react';
import Badge from '../atoms/Badge.jsx';
import Avatar from '../atoms/Avatar.jsx';

/**
 * Kanban — لوحة أعمدة ببطاقات. محايد للمجال (مهام/حالات طلبات/مراحل قبول).
 * columns: [{ id, title, color?, cards: [{ title, desc?, tag?, tagVariant?, meta?, avatar? }] }]
 * <Kanban columns={[{id:'todo', title:'قيد الانتظار', color:'var(--chart-3)', cards:[…]}]} />
 */
export default function Kanban({ columns = [], className = '' }) {
  return (
    <div className={('kanban ' + className).trim()}>
      {columns.map((col) => (
        <div className="kanban-col" key={col.id}>
          <div className="kanban-colhead">
            <span className="kanban-coldot" style={col.color ? { background: col.color } : undefined}></span>
            <span className="kanban-coltitle">{col.title}</span>
            <span className="kanban-colcount">{col.cards.length}</span>
          </div>
          <div className="kanban-cards">
            {col.cards.map((c, i) => (
              <div className="kanban-card" key={i}>
                {c.tag != null ? <Badge variant={c.tagVariant || 'neutral'}>{c.tag}</Badge> : null}
                <div className="kanban-card-title">{c.title}</div>
                {c.desc != null ? <p className="kanban-card-desc">{c.desc}</p> : null}
                {(c.meta != null || c.avatar != null) ? (
                  <div className="kanban-card-foot">
                    {c.meta != null ? <span className="kanban-card-meta">{c.meta}</span> : <span></span>}
                    {c.avatar != null ? <Avatar variant="sm"><img src={c.avatar} alt="" /></Avatar> : null}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
