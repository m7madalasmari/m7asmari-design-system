import React from 'react';
import Avatar from '../atoms/Avatar.jsx';
import Icon from '../atoms/Icon.jsx';

/**
 * ContactCard — بطاقة كيان متمركزة (أفاتار + اسم + دور + بيانات + إجراءات). محايد للمجال.
 * meta: [{ icon?, label }]
 * <ContactCard name="محمد الأسمري" role="مديرة المنتج" avatar="…" meta={[{icon:'mail',label:'n@x.com'}]} actions={…} />
 */
export default function ContactCard({ name, role, avatar, meta = [], actions, className = '' }) {
  return (
    <div className={('contactcard ' + className).trim()}>
      <Avatar variant="lg">{avatar != null ? <img src={avatar} alt="" /> : (name ? name.slice(0, 1) : '')}</Avatar>
      {name != null ? <div className="contactcard-name">{name}</div> : null}
      {role != null ? <div className="contactcard-role">{role}</div> : null}
      {meta.length ? (
        <div className="contactcard-meta">
          {meta.map((m, i) => <span className="contactcard-metarow" key={i}>{m.icon != null ? <Icon name={m.icon} size={14} /> : null}{m.label}</span>)}
        </div>
      ) : null}
      {actions != null ? <div className="contactcard-acts">{actions}</div> : null}
    </div>
  );
}
