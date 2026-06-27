import React from 'react';
import { validateForm } from '../../app/lib/validation.js';

/**
 * useForm — حالة نموذج صغيرة لطبقة الـKit (ليست core): قيم + أخطاء + تحقّق عند الإرسال.
 * schema: خريطة { field: [rules] } أو دالّة (values) ترجع الخريطة (للقواعد المعتمِدة على قيم أخرى).
 *   bind(k) → { value, onChange, status } جاهزة لـ Input/Textarea/PasswordInput.
 *   set(k, v) لتحديث الحقول غير النصّية (Checkbox/Select/DatePicker…).
 *   submit(cb) معالج إرسال يتحقّق ثم يستدعي cb(values) ويضبط done.
 */
export function useForm(initial, schema) {
  const [values, setValues] = React.useState(initial);
  const [errors, setErrors] = React.useState({});
  const [done, setDone] = React.useState(false);

  const set = (k, v) => setValues((s) => ({ ...s, [k]: v }));
  const bind = (k) => ({
    value: values[k],
    onChange: (e) => set(k, e && e.target ? e.target.value : e),
    status: errors[k] ? 'error' : '',
  });
  const submit = (cb) => (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const sch = typeof schema === 'function' ? schema(values) : (schema || {});
    const { errors: errs, valid } = validateForm(values, sch);
    setErrors(errs);
    if (valid) { setDone(true); if (cb) cb(values); }
  };
  const reset = () => { setValues(initial); setErrors({}); setDone(false); };

  return { values, errors, done, set, bind, submit, reset };
}
