import React from 'react';

/**
 * FolderItem — صفّ مجلّد (أيقونة ملوّنة + اسم + بيانات + إجراءات).
 * showBar: يعرض شريط التقدّم ومؤشّر التثبيت بالاسم. showStar: يعرض نجمة (قسم المثبّت).
 * <FolderItem label="العمل" color="var(--chart-1)" items={24} size="2.4 غ.ب" prog={65}
 *             pinned showBar onTogglePin={fn} />
 */
export default function FolderItem({ label, color, items, size, prog, pinned = false, onTogglePin, showStar = false, showBar = false }) {
  const boxStyle = { background: 'color-mix(in srgb, ' + color + ' 13%, transparent)', color };
  return (
    <div className="dashfolder">
      <div className="dashfolder-ic" style={boxStyle}><i data-lucide="folder"></i></div>
      <div className="dashfolder-main">
        <div className="dashfolder-name">{label}{(showBar && pinned) ? (<svg className="pinico" viewBox="0 0 24 24"><path d="M12 17v5M9 3h6l-1 7 3 2H7l3-2-1-7z"></path></svg>) : null}</div>
        <div className="dashfolder-meta">{items} عنصر • {size}</div>
        {showBar ? (<div className="dashfolder-bar"><span style={{ width: prog + '%', background: color }}></span></div>) : null}
      </div>
      {showStar ? (<i data-lucide="star" style={{ width: '14px', height: '14px', fill: 'var(--warning)', stroke: 'var(--warning)' }}></i>) : null}
      <div className="dashfolder-acts">
        <button className={pinned ? 'dashpin on' : 'dashpin'} onClick={onTogglePin} aria-label="تثبيت"><svg viewBox="0 0 24 24"><path d="M12 17v5M9 3h6l-1 7 3 2H7l3-2-1-7z"></path></svg></button>
        <button aria-label="خيارات"><svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
      </div>
    </div>
  );
}
