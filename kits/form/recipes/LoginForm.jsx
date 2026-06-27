import React from 'react';
import Field from '../../../components/molecules/Field.jsx';
import Input from '../../../components/atoms/Input.jsx';
import PasswordInput from '../../../components/atoms/PasswordInput.jsx';
import Checkbox from '../../../components/atoms/Checkbox.jsx';
import Button from '../../../components/atoms/Button.jsx';
import Form from '../../../components/molecules/Form.jsx';
import FormActions from '../../../components/molecules/FormActions.jsx';
import FormCard from '../FormCard.jsx';
import { useForm } from '../useForm.js';
import { required, email, minLength } from '../../../app/lib/validation.js';

/** تسجيل الدخول — بريد + كلمة مرور + تذكّرني. */
export default function LoginForm() {
  const f = useForm(
    { email: '', password: '', remember: false },
    { email: [required(), email()], password: [required(), minLength(8)] }
  );
  return (
    <FormCard title="تسجيل الدخول" description="أدخل بريدك وكلمة المرور للمتابعة." done={f.done} doneText="تم تسجيل دخولك.">
      <Form onSubmit={f.submit()} aria-label="تسجيل الدخول">
        <Field label="البريد الإلكتروني" status={f.errors.email ? 'error' : ''} message={f.errors.email}>
          <Input type="email" dir="ltr" placeholder="name@example.com" {...f.bind('email')} />
        </Field>
        <Field label="كلمة المرور" status={f.errors.password ? 'error' : ''} message={f.errors.password}>
          <PasswordInput {...f.bind('password')} />
        </Field>
        <Checkbox checked={f.values.remember} onChange={(v) => f.set('remember', v)}>تذكّرني على هذا الجهاز</Checkbox>
        <FormActions>
          <Button type="submit" variant="brand">دخول</Button>
          <Button type="button" variant="ghost">نسيت كلمة المرور؟</Button>
        </FormActions>
      </Form>
    </FormCard>
  );
}
