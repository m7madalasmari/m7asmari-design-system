import React from 'react';
import Field from '../../../components/molecules/Field.jsx';
import Input from '../../../components/atoms/Input.jsx';
import Button from '../../../components/atoms/Button.jsx';
import Form from '../../../components/molecules/Form.jsx';
import FormActions from '../../../components/molecules/FormActions.jsx';
import FormCard from '../FormCard.jsx';
import { useForm } from '../useForm.js';
import { required, email } from '../../../app/lib/validation.js';

/** استعادة كلمة المرور — بريد فقط، ثم تأكيد الإرسال. */
export default function ForgotPasswordForm() {
  const f = useForm({ email: '' }, { email: [required(), email()] });
  return (
    <FormCard
      title="استعادة كلمة المرور"
      description="أدخل بريدك وسنرسل لك رابط إعادة التعيين."
      done={f.done}
      doneText="أرسلنا رابط الاستعادة إلى بريدك. تحقّق من صندوق الوارد."
    >
      <Form onSubmit={f.submit()} aria-label="استعادة كلمة المرور">
        <Field label="البريد الإلكتروني" status={f.errors.email ? 'error' : ''} message={f.errors.email}>
          <Input type="email" dir="ltr" placeholder="name@example.com" {...f.bind('email')} />
        </Field>
        <FormActions>
          <Button type="submit" variant="brand">إرسال الرابط</Button>
          <Button type="button" variant="ghost">العودة لتسجيل الدخول</Button>
        </FormActions>
      </Form>
    </FormCard>
  );
}
