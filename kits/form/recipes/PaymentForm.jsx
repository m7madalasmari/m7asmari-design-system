import React from 'react';
import Field from '../../../components/molecules/Field.jsx';
import Input from '../../../components/atoms/Input.jsx';
import Select from '../../../components/organisms/Select.jsx';
import Checkbox from '../../../components/atoms/Checkbox.jsx';
import Button from '../../../components/atoms/Button.jsx';
import Form from '../../../components/molecules/Form.jsx';
import FormActions from '../../../components/molecules/FormActions.jsx';
import FormCard from '../FormCard.jsx';
import { useForm } from '../useForm.js';
import { required, minLength } from '../../../app/lib/validation.js';

const PAY_MONTHS = Array.from({ length: 12 }, (_, i) => ({ value: String(i + 1).padStart(2, '0'), label: String(i + 1).padStart(2, '0') }));
const YEARS = Array.from({ length: 8 }, (_, i) => ({ value: String(2026 + i), label: String(2026 + i) }));

/** الدفع / الفوترة — اسم البطاقة + رقمها + الشهر/السنة (Select) + CVV + حفظ البطاقة. */
export default function PaymentForm() {
  const f = useForm(
    { cardName: '', cardNumber: '', month: '', year: '', cvv: '', save: false },
    {
      cardName: [required('اسم حامل البطاقة مطلوب')],
      cardNumber: [required('رقم البطاقة مطلوب'), minLength(12, 'رقم بطاقة غير صحيح')],
      month: [required('الشهر')],
      year: [required('السنة')],
      cvv: [required('CVV'), minLength(3, 'رمز غير صحيح')],
    }
  );
  return (
    <FormCard title="بيانات الدفع" description="الدفع آمن ومشفّر بالكامل." done={f.done} doneText="تمّت العملية بنجاح.">
      <Form onSubmit={f.submit()} aria-label="بيانات الدفع">
        <Field label="الاسم على البطاقة" status={f.errors.cardName ? 'error' : ''} message={f.errors.cardName}>
          <Input placeholder="الاسم كما يظهر على البطاقة" {...f.bind('cardName')} />
        </Field>
        <Field label="رقم البطاقة" status={f.errors.cardNumber ? 'error' : ''} message={f.errors.cardNumber}>
          <Input dir="ltr" inputMode="numeric" placeholder="0000 0000 0000 0000" {...f.bind('cardNumber')} />
        </Field>
        <div className="grid cols3">
          <Field label="الشهر" status={f.errors.month ? 'error' : ''} message={f.errors.month}>
            <Select options={PAY_MONTHS} value={f.values.month} onChange={(v) => f.set('month', v)} placeholder="MM" ariaLabel="شهر الانتهاء" />
          </Field>
          <Field label="السنة" status={f.errors.year ? 'error' : ''} message={f.errors.year}>
            <Select options={YEARS} value={f.values.year} onChange={(v) => f.set('year', v)} placeholder="YYYY" ariaLabel="سنة الانتهاء" />
          </Field>
          <Field label="CVV" status={f.errors.cvv ? 'error' : ''} message={f.errors.cvv}>
            <Input dir="ltr" inputMode="numeric" placeholder="123" maxLength={4} {...f.bind('cvv')} />
          </Field>
        </div>
        <Checkbox checked={f.values.save} onChange={(v) => f.set('save', v)}>حفظ البطاقة للمشتريات القادمة</Checkbox>
        <FormActions>
          <Button type="submit" variant="brand">ادفع الآن</Button>
        </FormActions>
      </Form>
    </FormCard>
  );
}
