import React from 'react';
import Icon from '../atoms/Icon.jsx';

/**
 * Timeline — خط زمني عمودي (نقطة + موصِّل + محتوى). محايد للمجال.
 * items: [{ title, desc?, time?, icon?, color? }]
 * <Timeline items={[{title:'تم الاستلام', time:'09:12', icon:'check', color:'var(--success)'}, …]} />
 */
export default function Timeline({ items = [], className = '' }) {
  return (
    <ol className={('timeline ' + className).trim()}>
      {items.map((it, i) => (
        <li className="timeline-item" key={i}>
          <span className="timeline-dot" style={it.color ? { borderColor: it.color, background: it.icon ? it.color : 'var(--surface)' } : undefined}>
            {it.icon != null ? <Icon name={it.icon} size={11} /> : null}
          </span>
          <div className="timeline-content">
            <div className="timeline-head">
              <span className="timeline-title">{it.title}</span>
              {it.time != null ? <span className="timeline-time">{it.time}</span> : null}
            </div>
            {it.desc != null ? <p className="timeline-desc">{it.desc}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
