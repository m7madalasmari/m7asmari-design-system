import React from 'react';

/**
 * FieldMessage — رسالة أسفل الحقل على صنف M7 (.hint).
 *   status="" → تلميح محايد · status="error" → .err · status="success" → .ok.
 * تُستخدم عادةً داخل Field؛ ويمكن استخدامها مباشرة مع id لربط aria-describedby.
 * <FieldMessage status="error" id="email-msg">بريد غير صالح</FieldMessage>
 */
export default function FieldMessage({ status = '', className = '', children, ...rest }) {
  const cls = ('hint'
    + (status === 'error' ? ' err' : '')
    + (status === 'success' ? ' ok' : '')
    + (className ? ' ' + className : ''));
  return <span className={cls} {...rest}>{children}</span>;
}
