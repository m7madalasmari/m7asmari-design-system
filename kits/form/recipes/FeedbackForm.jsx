import React from 'react';
import Field from '../../../components/molecules/Field.jsx';
import Textarea from '../../../components/atoms/Textarea.jsx';
import Select from '../../../components/organisms/Select.jsx';
import RadioGroup from '../../../components/molecules/RadioGroup.jsx';
import Switch from '../../../components/atoms/Switch.jsx';
import Button from '../../../components/atoms/Button.jsx';
import Form from '../../../components/molecules/Form.jsx';
import FormActions from '../../../components/molecules/FormActions.jsx';
import FormCard from '../FormCard.jsx';
import { useForm } from '../useForm.js';
import { required } from '../../../app/lib/validation.js';

const RATINGS = [
  { value: '5', label: 'ممتاز' },
  { value: '4', label: 'جيد جدًا' },
  { value: '3', label: 'جيد' },
  { value: '2', label: 'مقبول' },
  { value: '1', label: 'ضعيف' },
];
const AREAS = [
  { value: 'ux', label: 'سهولة الاستخدام' },
  { value: 'speed', label: 'السرعة والأداء' },
  { value: 'support', label: 'الدعم' },
  { value: 'price', label: 'السعر' },
];

/** ملاحظات وتقييم — تقييم (RadioGroup) + مجال (Select) + تعليق (Textarea) + موافقة تواصل (Switch). */
export default function FeedbackForm() {
  const f = useForm(
    { rating: '', area: '', comment: '', contactOk: true },
    { rating: [required('اختر تقييمك')] }
  );
  return (
    <FormCard title="شاركنا رأيك" description="رأيك يساعدنا على التحسّن." done={f.done} doneText="شكرًا، سجّلنا تقييمك.">
      <Form onSubmit={f.submit()} aria-label="ملاحظات وتقييم">
        <Field label="ما تقييمك العام؟" status={f.errors.rating ? 'error' : ''} message={f.errors.rating}>
          <RadioGroup options={RATINGS} value={f.values.rating} onChange={(v) => f.set('rating', v)} ariaLabel="التقييم العام" />
        </Field>
        <Field label="أكثر مجال يهمّك">
          <Select options={AREAS} value={f.values.area} onChange={(v) => f.set('area', v)} placeholder="اختر مجالًا" ariaLabel="المجال" />
        </Field>
        <Field label="تعليق إضافي">
          <Textarea placeholder="اكتب ملاحظاتك (اختياري)…" {...f.bind('comment')} />
        </Field>
        <Switch checked={f.values.contactOk} onChange={(v) => f.set('contactOk', v)}>يمكن لفريقنا التواصل معي بخصوص ملاحظتي</Switch>
        <FormActions>
          <Button type="submit" variant="brand">إرسال التقييم</Button>
        </FormActions>
      </Form>
    </FormCard>
  );
}
