import React from 'react';
import Avatar from '../atoms/Avatar.jsx';
import Icon from '../atoms/Icon.jsx';

/**
 * ProfileHeader — رأس كيان (أفاتار + اسم + وصف + وسوم + إجراءات). محايد للمجال:
 * ملف طالب/مريض/عميل/موظّف. meta: [{ icon?, label }]
 * <ProfileHeader name="محمد الأسمري" subtitle="طالبة — المستوى السادس" avatar="…" meta={[{icon:'mail',label:'n@x.com'}]} actions={<Button…/>} />
 */
export default function ProfileHeader({ name, subtitle, avatar, meta = [], actions, className = '' }) {
  return (
    <div className={('profilehead ' + className).trim()}>
      <Avatar variant="lg">{avatar != null ? <img src={avatar} alt="" /> : (name ? name.slice(0, 1) : '')}</Avatar>
      <div className="profilehead-main">
        {name != null ? <div className="profilehead-name">{name}</div> : null}
        {subtitle != null ? <div className="profilehead-sub">{subtitle}</div> : null}
        {meta.length ? (
          <div className="profilehead-meta">
            {meta.map((m, i) => (
              <span className="profilehead-chip" key={i}>{m.icon != null ? <Icon name={m.icon} size={14} /> : null}{m.label}</span>
            ))}
          </div>
        ) : null}
      </div>
      {actions != null ? <div className="profilehead-acts">{actions}</div> : null}
    </div>
  );
}
