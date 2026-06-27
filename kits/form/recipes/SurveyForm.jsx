import React from 'react';
import Field from '../../../components/molecules/Field.jsx';
import Textarea from '../../../components/atoms/Textarea.jsx';
import Select from '../../../components/organisms/Select.jsx';
import RadioGroup from '../../../components/molecules/RadioGroup.jsx';
import Slider from '../../../components/organisms/Slider.jsx';
import Button from '../../../components/atoms/Button.jsx';
import Form from '../../../components/molecules/Form.jsx';
import FormActions from '../../../components/molecules/FormActions.jsx';
import FormCard from '../FormCard.jsx';
import { useForm } from '../useForm.js';
import { required } from '../../../app/lib/validation.js';

const ROLES = [
  { value: 'dev', label: 'مطوّر' },
  { value: 'design', label: 'مصمّم' },
  { value: 'pm', label: 'مدير منتج' },
  { value: 'other', label: 'أخرى' },
];
const USAGE = [
  { value: 'daily', label: 'يوميًا' },
  { value: 'weekly', label: 'أسبوعيًا' },
  { value: 'rarely', label: 'نادرًا' },
];

/** استبيان — دور (Select) + تكرار الاستخدام (RadioGroup) + ترشيح (Slider 0–10) + اقتراحات (Textarea). */
export default function SurveyForm() {
  const f = useForm(
    { role: '', usage: '', nps: 7, suggest: '' },
    { role: [required('اختر دورك')], usage: [required('اختر تكرار الاستخدام')] }
  );
  return (
    <FormCard title="استبيان سريع" description="دقيقة واحدة تساعدنا كثيرًا." done={f.done} doneText="شكرًا لمشاركتك في الاستبيان.">
      <Form onSubmit={f.submit()} aria-label="استبيان">
        <Field label="ما دورك؟" status={f.errors.role ? 'error' : ''} message={f.errors.role}>
          <Select options={ROLES} value={f.values.role} onChange={(v) => f.set('role', v)} placeholder="اختر دورك" ariaLabel="الدور" />
        </Field>
        <Field label="كم تستخدم المنتج؟" status={f.errors.usage ? 'error' : ''} message={f.errors.usage}>
          <RadioGroup options={USAGE} value={f.values.usage} onChange={(v) => f.set('usage', v)} ariaLabel="تكرار الاستخدام" />
        </Field>
        <Field label={'كم تُرشّح المنتج لصديق؟ (' + f.values.nps + '/10)'}>
          <Slider value={f.values.nps} min={0} max={10} step={1} onChange={(v) => f.set('nps', v)} ariaLabel="درجة الترشيح من 0 إلى 10" />
        </Field>
        <Field label="اقتراحات للتحسين">
          <Textarea placeholder="شاركنا أفكارك (اختياري)…" {...f.bind('suggest')} />
        </Field>
        <FormActions>
          <Button type="submit" variant="brand">إرسال الاستبيان</Button>
        </FormActions>
      </Form>
    </FormCard>
  );
}
