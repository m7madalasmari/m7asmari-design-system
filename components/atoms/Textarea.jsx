import React from 'react';

/**
 * Textarea — منطقة نصّ قابلة لتغيير الارتفاع على صنفي M7 (.input.textarea).
 *   status="error|success|disabled" مثل Input.
 * أي خصائص أخرى (value, onChange, placeholder, rows, id, aria-*…) تُمرَّر إلى <textarea>.
 * <Textarea status="error" placeholder="اكتب وصفًا…" />
 */
export default function Textarea({ status = '', className = '', ...rest }) {
  const cls = ('input textarea'
    + (status === 'error' ? ' is-error' : '')
    + (status === 'success' ? ' is-success' : '')
    + (status === 'disabled' ? ' is-disabled' : '')
    + (className ? ' ' + className : ''));
  return (
    <textarea
      className={cls}
      {...(status === 'error' ? { 'aria-invalid': true } : {})}
      {...(status === 'disabled' ? { disabled: true } : {})}
      {...rest}
    />
  );
}
