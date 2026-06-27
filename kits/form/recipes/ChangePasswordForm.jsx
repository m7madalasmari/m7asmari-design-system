import React from 'react';
import Field from '../../../components/molecules/Field.jsx';
import PasswordInput from '../../../components/atoms/PasswordInput.jsx';
import Button from '../../../components/atoms/Button.jsx';
import Form from '../../../components/molecules/Form.jsx';
import FormActions from '../../../components/molecules/FormActions.jsx';
import FormCard from '../FormCard.jsx';
import { useForm } from '../useForm.js';
import { required, minLength, matches } from '../../../app/lib/validation.js';

/** تغيير كلمة المرور — الحالية + الجديدة (بمقياس) + التأكيد. */
export default function ChangePasswordForm() {
  const f = useForm(
    { current: '', next: '', confirm: '' },
    (v) => ({
      current: [required('أدخل كلمة المرور الحالية')],
      next: [required('أدخل كلمة المرور الجديدة'), minLength(8, '8 أحرف على الأقل')],
      confirm: [required('أعد إدخال كلمة المرور'), matches(() => v.next, 'كلمتا المرور غير متطابقتين')],
    })
  );
  return (
    <FormCard title="تغيير كلمة المرور" description="اختر كلمة مرور قويّة لم تستخدمها من قبل." done={f.done} doneText="تم تغيير كلمة المرور.">
      <Form onSubmit={f.submit()} aria-label="تغيير كلمة المرور">
        <Field label="كلمة المرور الحالية" status={f.errors.current ? 'error' : ''} message={f.errors.current}>
          <PasswordInput {...f.bind('current')} />
        </Field>
        <Field label="كلمة المرور الجديدة" status={f.errors.next ? 'error' : ''} message={f.errors.next}>
          <PasswordInput meter {...f.bind('next')} />
        </Field>
        <Field label="تأكيد كلمة المرور الجديدة" status={f.errors.confirm ? 'error' : ''} message={f.errors.confirm}>
          <PasswordInput {...f.bind('confirm')} />
        </Field>
        <FormActions>
          <Button type="submit" variant="brand">حفظ كلمة المرور</Button>
        </FormActions>
      </Form>
    </FormCard>
  );
}
