import React from 'react';

/**
 * FormSection — قسم داخل النموذج: عنوان (.subhead) + وصف اختياري + حقول مكدّسة.
 * مجموعة دلالية (role=group) موسومة بالعنوان. <FormSection title="بيانات الحساب">…</FormSection>
 */
export default function FormSection({ title, description, className = '', children }) {
  const titleId = React.useId();
  return (
    <section
      className={'fx col gap16' + (className ? ' ' + className : '')}
      {...(title ? { 'aria-labelledby': titleId } : {})}
    >
      {title ? <p className="subhead" id={titleId}>{title}</p> : null}
      {description ? <p className="t-sm">{description}</p> : null}
      {children}
    </section>
  );
}
