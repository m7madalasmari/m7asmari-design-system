import React from 'react';
import Avatar from '../atoms/Avatar.jsx';

/**
 * AvatarGroup — أفاتارات متراكبة مع شارة +N للبقية. توكنز فقط.
 * items: [{ avatar?, name? }] · max: أقصى عدد ظاهر.
 * <AvatarGroup items={[{avatar:'…'},{name:'محمد'}]} max={4} />
 */
export default function AvatarGroup({ items = [], max = 4, size = 'sm', className = '' }) {
  const shown = items.slice(0, max);
  const extra = items.length - shown.length;
  return (
    <div className={('avgroup ' + className).trim()}>
      {shown.map((it, i) => (
        <span className="avgroup-item" key={i}>
          <Avatar variant={size}>{it.avatar != null ? <img src={it.avatar} alt="" /> : (it.name ? it.name.slice(0, 1) : '')}</Avatar>
        </span>
      ))}
      {extra > 0 ? <span className="avgroup-item avgroup-more"><Avatar variant={size}>+{extra}</Avatar></span> : null}
    </div>
  );
}
