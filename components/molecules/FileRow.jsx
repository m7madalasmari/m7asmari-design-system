import React from 'react';
import Icon from '../atoms/Icon.jsx';

/**
 * FileRow — صفّ ملف (أيقونة ملوّنة + اسم + بيانات + زرّ خيارات).
 * <FileRow icon="file-text" name="…" size="2.4 م.ب" mod="قبل ساعتين" color="var(--chart-4)" onMore={fn} />
 */
export default function FileRow({ icon, name, size, mod, color = 'var(--text-muted)', onMore }) {
  const iconStyle = { background: 'color-mix(in srgb, ' + color + ' 13%, transparent)', color };
  return (
    <div className="dashfile">
      <div className="dashfile-ic" style={iconStyle}><Icon name={icon} /></div>
      <div className="dashfile-main"><div className="dashfile-name">{name}</div><div className="dashfile-meta">{size} • عُدّل {mod}</div></div>
      <button className="dashfile-more" aria-label="خيارات الملف" onClick={onMore}><svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
    </div>
  );
}
