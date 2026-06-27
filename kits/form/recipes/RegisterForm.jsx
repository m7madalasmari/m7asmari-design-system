import React from 'react';
import Field from '../../../components/molecules/Field.jsx';
import Input from '../../../components/atoms/Input.jsx';
import PhoneInput from '../../../components/molecules/PhoneInput.jsx';
import PasswordInput from '../../../components/atoms/PasswordInput.jsx';
import Select from '../../../components/organisms/Select.jsx';
import Checkbox from '../../../components/atoms/Checkbox.jsx';
import Button from '../../../components/atoms/Button.jsx';
import Form from '../../../components/molecules/Form.jsx';
import FormActions from '../../../components/molecules/FormActions.jsx';
import FormCard from '../FormCard.jsx';
import { useForm } from '../useForm.js';
import { required, email, minLength, matches } from '../../../app/lib/validation.js';
import { COUNTRY_OPTIONS } from '../../../app/lib/countries.js';

/** إنشاء حساب — اسم + بريد + جوال (بمفتاح دولة) + كلمة مرور (بمقياس) + تأكيد + دولة + موافقة. */
export default function RegisterForm() {
  const f = useForm(
    { name: '', email: '', dial: '+966', phone: '', password: '', confirm: '', country: '', terms: false },
    (v) => ({
      name: [required('الاسم مطلوب')],
      email: [required(), email()],
      phone: [required('رقم الجوال مطلوب'), minLength(7, 'رقم غير مكتمل')],
      password: [required(), minLength(8, 'كلمة المرور 8 أحرف على الأقل')],
      confirm: [required('أعد إدخال كلمة المرور'), matches(() => v.password, 'كلمتا المرور غير متطابقتين')],
      country: [required('اختر الدولة')],
      terms: [required('يجب الموافقة على الشروط للمتابعة')],
    })
  );
  return (
    <FormCard title="إنشاء حساب جديد" description="أنشئ حسابك في خطوات قليلة." done={f.done} doneText="تم إنشاء حسابك بنجاح.">
      <Form onSubmit={f.submit()} aria-label="إنشاء حساب">
        <Field label="الاسم الكامل" status={f.errors.name ? 'error' : ''} message={f.errors.name}>
          <Input placeholder="مثال: نورة العتيبي" {...f.bind('name')} />
        </Field>
        <Field label="البريد الإلكتروني" status={f.errors.email ? 'error' : ''} message={f.errors.email}>
          <Input type="email" dir="ltr" placeholder="name@example.com" {...f.bind('email')} />
        </Field>
        <Field label="رقم الجوال" status={f.errors.phone ? 'error' : ''} message={f.errors.phone}>
          <PhoneInput dial={f.values.dial} onDial={(v) => f.set('dial', v)} {...f.bind('phone')} />
        </Field>
        <div className="grid cols2">
          <Field label="كلمة المرور" status={f.errors.password ? 'error' : ''} message={f.errors.password}>
            <PasswordInput meter {...f.bind('password')} />
          </Field>
          <Field label="تأكيد كلمة المرور" status={f.errors.confirm ? 'error' : ''} message={f.errors.confirm}>
            <PasswordInput {...f.bind('confirm')} />
          </Field>
        </div>
        <Field label="الدولة" status={f.errors.country ? 'error' : ''} message={f.errors.country}>
          <Select options={COUNTRY_OPTIONS} value={f.values.country} onChange={(v) => f.set('country', v)} placeholder="اختر الدولة" ariaLabel="الدولة" />
        </Field>
        <Checkbox checked={f.values.terms} onChange={(v) => f.set('terms', v)}>
          أوافق على الشروط والأحكام وسياسة الخصوصية
        </Checkbox>
        {f.errors.terms ? <span className="hint err">{f.errors.terms}</span> : null}
        <FormActions>
          <Button type="submit" variant="brand">إنشاء الحساب</Button>
          <Button type="button" variant="ghost" onClick={f.reset}>تفريغ</Button>
        </FormActions>
      </Form>
    </FormCard>
  );
}
