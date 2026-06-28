import React from 'react';

/**
 * PageHeader — رأس صفحة/لوحة موحّد (عنوان + وصف + إجراءات). محايد للمجال.
 * <PageHeader title="الطلبات" subtitle="إدارة ومتابعة الطلبات" actions={<Button…/>} />
 */
export default function PageHeader({ title, subtitle, actions, className = '' }) {
  return (
    <div className={('pagehead ' + className).trim()}>
      <div className="pagehead-main">
        {title != null ? <h3 className="pagehead-title">{title}</h3> : null}
        {subtitle != null ? <p className="pagehead-sub">{subtitle}</p> : null}
      </div>
      {actions != null ? <div className="pagehead-acts">{actions}</div> : null}
    </div>
  );
}
