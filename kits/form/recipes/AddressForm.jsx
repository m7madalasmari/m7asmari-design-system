import React from 'react';
import Field from '../../../components/molecules/Field.jsx';
import Input from '../../../components/atoms/Input.jsx';
import Select from '../../../components/organisms/Select.jsx';
import Combobox from '../../../components/organisms/Combobox.jsx';
import Checkbox from '../../../components/atoms/Checkbox.jsx';
import Button from '../../../components/atoms/Button.jsx';
import Form from '../../../components/molecules/Form.jsx';
import FormActions from '../../../components/molecules/FormActions.jsx';
import FormCard from '../FormCard.jsx';
import { useForm } from '../useForm.js';
import { required, minLength } from '../../../app/lib/validation.js';
import { COUNTRY_OPTIONS } from '../../../app/lib/countries.js';

const CITIES = [
  { value: 'ryd', label: 'الرياض' },
  { value: 'jed', label: 'جدة' },
  { value: 'dmm', label: 'الدمام' },
  { value: 'mak', label: 'مكة المكرمة' },
];

/** العنوان / الشحن — مستلِم + دولة (Combobox بحث) + مدينة (Select) + شارع + رمز بريدي + افتراضي. */
export default function AddressForm() {
  const f = useForm(
    { recipient: '', country: '', city: '', street: '', postal: '', isDefault: false },
    {
      recipient: [required('اسم المستلِم مطلوب')],
      country: [required('اختر الدولة')],
      city: [required('اختر المدينة')],
      street: [required('العنوان مطلوب'), minLength(5, 'أدخل عنوانًا أوضح')],
    }
  );
  return (
    <FormCard title="عنوان الشحن" description="أدخل عنوان التوصيل بدقّة." done={f.done} doneText="تم حفظ العنوان.">
      <Form onSubmit={f.submit()} aria-label="عنوان الشحن">
        <Field label="اسم المستلِم" status={f.errors.recipient ? 'error' : ''} message={f.errors.recipient}>
          <Input placeholder="الاسم الكامل" {...f.bind('recipient')} />
        </Field>
        <div className="grid cols2">
          <Field label="الدولة" status={f.errors.country ? 'error' : ''} message={f.errors.country}>
            <Combobox options={COUNTRY_OPTIONS} value={f.values.country} onChange={(v) => f.set('country', v)} placeholder="ابحث عن الدولة…" ariaLabel="الدولة" />
          </Field>
          <Field label="المدينة" status={f.errors.city ? 'error' : ''} message={f.errors.city}>
            <Select options={CITIES} value={f.values.city} onChange={(v) => f.set('city', v)} placeholder="اختر المدينة" ariaLabel="المدينة" />
          </Field>
        </div>
        <Field label="العنوان التفصيلي" status={f.errors.street ? 'error' : ''} message={f.errors.street}>
          <Input placeholder="الحي، الشارع، رقم المبنى" {...f.bind('street')} />
        </Field>
        <Field label="الرمز البريدي">
          <Input dir="ltr" inputMode="numeric" placeholder="12345" {...f.bind('postal')} />
        </Field>
        <Checkbox checked={f.values.isDefault} onChange={(v) => f.set('isDefault', v)}>اجعله عنواني الافتراضي</Checkbox>
        <FormActions>
          <Button type="submit" variant="brand">حفظ العنوان</Button>
        </FormActions>
      </Form>
    </FormCard>
  );
}
