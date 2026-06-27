import React from 'react';

/**
 * FormActions — صفّ أزرار النموذج على صنف M7 (.btnrow). محاذاة للبداية افتراضيًا (RTL)؛
 * align="center" أو align="between". <FormActions><Button type="submit">حفظ</Button>…</FormActions>
 */
export default function FormActions({ align = '', className = '', children }) {
  const a = align === 'center' ? ' jc' : align === 'between' ? ' jb' : '';
  return <div className={'btnrow' + a + (className ? ' ' + className : '')}>{children}</div>;
}
