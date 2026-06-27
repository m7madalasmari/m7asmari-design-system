import React from 'react';

/**
 * Input — حقل إدخال نصّي موحّد على صنف M7 (.input).
 *   status="error|success|disabled" → is-error / is-success / is-disabled.
 *   لجزر LTR (بريد/أرقام/روابط) مرّر dir="ltr".
 * أي خصائص أخرى (type, value, onChange, placeholder, id, aria-*…) تُمرَّر إلى <input>.
 * <Input type="email" dir="ltr" status="error" placeholder="name@example.com" />
 */
export default function Input({ status = '', className = '', ...rest }) {
  const cls = ('input'
    + (status === 'error' ? ' is-error' : '')
    + (status === 'success' ? ' is-success' : '')
    + (status === 'disabled' ? ' is-disabled' : '')
    + (className ? ' ' + className : ''));
  return (
    <input
      className={cls}
      {...(status === 'error' ? { 'aria-invalid': true } : {})}
      {...(status === 'disabled' ? { disabled: true } : {})}
      {...rest}
    />
  );
}
