import React from 'react';
import Icon from '../atoms/Icon.jsx';

/**
 * NotificationMenu — زرّ جرس بعدّاد غير مقروء + قائمة إشعارات منسدلة.
 * <NotificationMenu open unread={2} items={[{title,msg,time,unread}]} onToggle={fn} />
 */
export default function NotificationMenu({ open = false, unread = 0, items = [], onToggle }) {
  return (
    <div className={'dashnotif' + (open ? ' open' : '')}>
      <button className="dashicobtn" aria-label="الإشعارات" onClick={onToggle}>
        <Icon name="bell" />
        {unread ? (<span className="dashbell-badge">{unread}</span>) : null}
      </button>
      <div className="dashnotif-pop">
        <div className="dashnotif-head"><b>الإشعارات</b><button>تعليم الكل كمقروء</button></div>
        {items.map((n, i) => (
          <div className={'dashnotif-item' + (n.unread ? ' unread' : '')} key={i}>
            <span className="dashnotif-dot"></span>
            <div><div className="dashnotif-b">{n.title}</div><div className="dashnotif-m">{n.msg}</div><div className="dashnotif-t">{n.time}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}
