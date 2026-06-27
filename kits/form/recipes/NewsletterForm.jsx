import React from 'react';
import Field from '../../../components/molecules/Field.jsx';
import Input from '../../../components/atoms/Input.jsx';
import Checkbox from '../../../components/atoms/Checkbox.jsx';
import RadioGroup from '../../../components/molecules/RadioGroup.jsx';
import Button from '../../../components/atoms/Button.jsx';
import Form from '../../../components/molecules/Form.jsx';
import FormActions from '../../../components/molecules/FormActions.jsx';
import FormCard from '../FormCard.jsx';
import { useForm } from '../useForm.js';
import { required, email } from '../../../app/lib/validation.js';

const FREQ = [
  { value: 'daily', label: 'يوميًا' },
  { value: 'weekly', label: 'أسبوعيًا' },
  { value: 'monthly', label: 'شهريًا' },
];

/** اشتراك النشرة — بريد + اهتمامات (Checkbox متعددة) + التكرار (RadioGroup). */
export default function NewsletterForm() {
  const f = useForm(
    { email: '', tech: true, design: false, business: false, freq: 'weekly' },
    { email: [required(), email()] }
  );
  return (
    <FormCard title="اشترك في النشرة" description="أفضل المقالات في بريدك، دون إزعاج." done={f.done} doneText="تم اشتراكك، أهلًا بك!">
      <Form onSubmit={f.submit()} aria-label="اشتراك النشرة">
        <Field label="البريد الإلكتروني" status={f.errors.email ? 'error' : ''} message={f.errors.email}>
          <Input type="email" dir="ltr" placeholder="name@example.com" {...f.bind('email')} />
        </Field>
        <Field label="اهتماماتك">
          <div className="fx col gap12">
            <Checkbox checked={f.values.tech} onChange={(v) => f.set('tech', v)}>تقنية</Checkbox>
            <Checkbox checked={f.values.design} onChange={(v) => f.set('design', v)}>تصميم</Checkbox>
            <Checkbox checked={f.values.business} onChange={(v) => f.set('business', v)}>أعمال</Checkbox>
          </div>
        </Field>
        <Field label="عدد الرسائل">
          <RadioGroup options={FREQ} value={f.values.freq} onChange={(v) => f.set('freq', v)} ariaLabel="تكرار النشرة" />
        </Field>
        <FormActions>
          <Button type="submit" variant="brand">اشترك الآن</Button>
        </FormActions>
      </Form>
    </FormCard>
  );
}
