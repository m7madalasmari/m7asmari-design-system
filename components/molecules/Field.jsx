import React from 'react';
import FieldMessage from '../atoms/FieldMessage.jsx';

/**
 * Field — غلاف حقل موحّد (.field): تسمية + إدخال + رسالة، مع ربط الوصولية تلقائيًا.
 *
 * يولّد معرّفًا للحقل (أو يستخدم htmlFor)، ويحقن في الإدخال الابن: id, status,
 * aria-describedby (للرسالة)، aria-invalid (عند الخطأ)، aria-required (عند required).
 *
 * <Field label="البريد الإلكتروني" status="error" message="بريد غير صالح" required>
 *   <Input type="email" dir="ltr" />
 * </Field>
 */
export default function Field({
  label,
  htmlFor,
  status = '',
  message,
  required = false,
  className = '',
  children,
}) {
  const autoId = React.useId();
  const fieldId = htmlFor || autoId;
  const msgId = fieldId + '-msg';
  const cls = 'field' + (className ? ' ' + className : '');

  const child = React.isValidElement(children)
    ? React.cloneElement(children, {
        id: children.props.id || fieldId,
        status: children.props.status || status || undefined,
        'aria-describedby': [children.props['aria-describedby'], message != null ? msgId : null]
          .filter(Boolean)
          .join(' ') || undefined,
        ...(status === 'error' && children.props['aria-invalid'] == null ? { 'aria-invalid': true } : {}),
        ...(required && children.props['aria-required'] == null ? { 'aria-required': true } : {}),
      })
    : children;

  return (
    <div className={cls}>
      {label != null ? (
        <label className="label" htmlFor={fieldId}>
          {label}{required ? ' *' : ''}
        </label>
      ) : null}
      {child}
      {message != null ? (
        <FieldMessage status={status} id={msgId}>{message}</FieldMessage>
      ) : null}
    </div>
  );
}
