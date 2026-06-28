import React from 'react';
import { css } from '../../app/lib/css.js';
import Card from '../../components/atoms/Card.jsx';

/**
 * DashboardCard — غلاف بطاقة قسم/رسم في اللوحة (عنوان + إجراء اختياري + محتوى).
 * طبقة كِت رفيعة فوق Card الأساسي — بلا توكنز/أصناف خاصّة.
 * <DashboardCard title="الإيراد" action={<Button…/>}>{chart}</DashboardCard>
 */
export default function DashboardCard({ title, action, children, className = '' }) {
  return (
    <Card variant="panel" className={('panel-pad ' + className).trim()}>
      {(title != null || action != null) ? (
        <div className="fx ac jb" style={css('margin-bottom:16px')}>
          {title != null ? <span className="subhead" style={css('margin:0')}>{title}</span> : <span></span>}
          {action != null ? action : null}
        </div>
      ) : null}
      {children}
    </Card>
  );
}
