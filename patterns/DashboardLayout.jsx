import React from 'react';

/**
 * DashboardLayout — إطار لوحة تحكّم قابل لإعادة الاستخدام بفتحات (slots):
 * sidebar (اختياري) + header (اختياري) + children (المحتوى). يبني على أصناف M7
 * العامّة (.dashframe/.dashside/.dashmain/.dashtop/.dashbody) بلا توكنز/CSS خاصّة.
 * مرّر className="auto" لارتفاع مرن بدل ارتفاع الإطار الثابت.
 *
 * <DashboardLayout sidebar={<Nav/>} header={<Toolbar/>}>{main}</DashboardLayout>
 */
export default function DashboardLayout({ sidebar, header, children, className = '', bodyClassName = '' }) {
  return (
    <div className={('dashframe ' + className).trim()}>
      {sidebar != null ? <aside className="dashside">{sidebar}</aside> : null}
      <div className="dashmain">
        {header != null ? <div className="dashtop">{header}</div> : null}
        <div className={('dashbody ' + bodyClassName).trim()}>{children}</div>
      </div>
    </div>
  );
}
