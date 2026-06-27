import React from 'react';
import Avatar from './Avatar.jsx';

/**
 * UserMenu — تذييل ملف المستخدم (أفاتار + اسم + بريد + إجراءات).
 * <UserMenu name="…" mail="…" avatar="assets/avatar.jpg" onToggleTheme={fn} onSettings={fn} />
 */
export default function UserMenu({ name, mail, avatar, onToggleTheme, onSettings }) {
  return (
    <div className="dashuser">
      <Avatar variant=""><img src={avatar} alt="" /></Avatar>
      <div className="dashuser-main"><div className="dashuser-name">{name}</div><div className="dashuser-mail">{mail}</div></div>
      <div className="dashuser-acts">
        <button onClick={onToggleTheme} aria-label="تبديل السمة"><i data-lucide="moon"></i></button>
        <button onClick={onSettings} aria-label="الإعدادات"><i data-lucide="settings"></i></button>
      </div>
    </div>
  );
}
