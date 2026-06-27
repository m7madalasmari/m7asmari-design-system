import React from 'react';
import Field from '../../../components/molecules/Field.jsx';
import Input from '../../../components/atoms/Input.jsx';
import Textarea from '../../../components/atoms/Textarea.jsx';
import Select from '../../../components/organisms/Select.jsx';
import Button from '../../../components/atoms/Button.jsx';
import Form from '../../../components/molecules/Form.jsx';
import FormActions from '../../../components/molecules/FormActions.jsx';
import FormCard from '../FormCard.jsx';
import { useForm } from '../useForm.js';
import { required, email, minLength } from '../../../app/lib/validation.js';

const SUBJECTS = [
  { value: 'general', label: 'استفسار عام' },
  { value: 'support', label: 'الدعم الفني' },
  { value: 'sales', label: 'المبيعات' },
  { value: 'idea', label: 'اقتراح' },
];

/** تواصل معنا — اسم + بريد + موضوع (Select) + رسالة (Textarea). */
export default function ContactForm() {
  const f = useForm(
    { name: '', email: '', subject: '', message: '' },
    {
      name: [required('الاسم مطلوب')],
      email: [required(), email()],
      subject: [required('اختر موضوع الرسالة')],
      message: [required('اكتب رسالتك'), minLength(10, '10 أحرف على الأقل')],
    }
  );
  return (
    <FormCard title="تواصل معنا" description="سيردّ عليك فريقنا خلال يوم عمل واحد." done={f.done} doneText="وصلتنا رسالتك، شكرًا لتواصلك.">
      <Form onSubmit={f.submit()} aria-label="تواصل معنا">
        <div className="grid cols2">
          <Field label="الاسم" status={f.errors.name ? 'error' : ''} message={f.errors.name}>
            <Input placeholder="اسمك الكريم" {...f.bind('name')} />
          </Field>
          <Field label="البريد الإلكتروني" status={f.errors.email ? 'error' : ''} message={f.errors.email}>
            <Input type="email" dir="ltr" placeholder="name@example.com" {...f.bind('email')} />
          </Field>
        </div>
        <Field label="الموضوع" status={f.errors.subject ? 'error' : ''} message={f.errors.subject}>
          <Select options={SUBJECTS} value={f.values.subject} onChange={(v) => f.set('subject', v)} placeholder="اختر الموضوع" ariaLabel="الموضوع" />
        </Field>
        <Field label="الرسالة" status={f.errors.message ? 'error' : ''} message={f.errors.message}>
          <Textarea placeholder="اكتب تفاصيل رسالتك…" {...f.bind('message')} />
        </Field>
        <FormActions>
          <Button type="submit" variant="brand">إرسال الرسالة</Button>
        </FormActions>
      </Form>
    </FormCard>
  );
}
