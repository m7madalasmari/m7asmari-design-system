import React from 'react';

/**
 * Form — غلاف <form> ينظّم الحقول عموديًا بمسافات متّسقة (.fx.col.gap16)، يمنع الإرسال
 * الافتراضي ويستدعي onSubmit. للصفوف ثنائية العمود استخدم <div className="grid cols2"> داخله.
 * <Form onSubmit={handle} aria-label="نموذج تسجيل الدخول">…</Form>
 */
export default function Form({ onSubmit, className = '', children, ...rest }) {
  const submit = (e) => { e.preventDefault(); if (onSubmit) onSubmit(e); };
  return (
    <form className={'fx col gap16' + (className ? ' ' + className : '')} onSubmit={submit} noValidate {...rest}>
      {children}
    </form>
  );
}
