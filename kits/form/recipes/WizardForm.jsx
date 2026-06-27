import React from 'react';
import Stepper from '../../../components/molecules/Stepper.jsx';
import Field from '../../../components/molecules/Field.jsx';
import Input from '../../../components/atoms/Input.jsx';
import Select from '../../../components/organisms/Select.jsx';
import Button from '../../../components/atoms/Button.jsx';
import FormActions from '../../../components/molecules/FormActions.jsx';
import FormCard from '../FormCard.jsx';
import { validateForm, required, email, saudiPhone } from '../../../app/lib/validation.js';

const STEPS = ['بيانات الحساب', 'معلومات التواصل', 'المراجعة'];
const WIZ_COUNTRIES = [
  { value: 'sa', label: 'السعودية' },
  { value: 'ae', label: 'الإمارات' },
  { value: 'eg', label: 'مصر' },
];

/** نموذج متعدّد الخطوات — Stepper + تحقّق لكل خطوة + مراجعة قبل التأكيد. */
export default function WizardForm() {
  const [step, setStep] = React.useState(0);
  const [values, setValues] = React.useState({ name: '', email: '', country: '', phone: '' });
  const [errors, setErrors] = React.useState({});
  const [done, setDone] = React.useState(false);

  const set = (k, v) => setValues((s) => ({ ...s, [k]: v }));
  const bind = (k) => ({ value: values[k], onChange: (e) => set(k, e && e.target ? e.target.value : e), status: errors[k] ? 'error' : '' });

  const schemas = [
    { name: [required('الاسم مطلوب')], email: [required(), email()] },
    { country: [required('اختر الدولة')], phone: [required('الجوال مطلوب'), saudiPhone()] },
    {},
  ];
  const next = () => {
    const { errors: errs, valid } = validateForm(values, schemas[step]);
    setErrors(errs);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const countryLabel = (WIZ_COUNTRIES.find((c) => c.value === values.country) || {}).label || '—';

  return (
    <FormCard title="إنشاء حساب — خطوات" description="أكمل البيانات على ثلاث خطوات." done={done} doneText="اكتمل التسجيل بنجاح.">
      <div className="fx col gap24">
        <Stepper steps={STEPS} current={step} />

        {step === 0 ? (
          <div className="fx col gap16">
            <Field label="الاسم الكامل" status={errors.name ? 'error' : ''} message={errors.name}>
              <Input placeholder="الاسم" {...bind('name')} />
            </Field>
            <Field label="البريد الإلكتروني" status={errors.email ? 'error' : ''} message={errors.email}>
              <Input type="email" dir="ltr" placeholder="name@example.com" {...bind('email')} />
            </Field>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="fx col gap16">
            <Field label="الدولة" status={errors.country ? 'error' : ''} message={errors.country}>
              <Select options={WIZ_COUNTRIES} value={values.country} onChange={(v) => set('country', v)} placeholder="اختر الدولة" ariaLabel="الدولة" />
            </Field>
            <Field label="رقم الجوال" status={errors.phone ? 'error' : ''} message={errors.phone}>
              <Input dir="ltr" inputMode="tel" placeholder="05XXXXXXXX" {...bind('phone')} />
            </Field>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="fx col gap8">
            <p className="t-sm">راجِع بياناتك قبل التأكيد:</p>
            <div className="fx jb"><span className="t-sm">الاسم</span><b>{values.name || '—'}</b></div>
            <div className="fx jb"><span className="t-sm">البريد</span><b dir="ltr">{values.email || '—'}</b></div>
            <div className="fx jb"><span className="t-sm">الدولة</span><b>{countryLabel}</b></div>
            <div className="fx jb"><span className="t-sm">الجوال</span><b dir="ltr">{values.phone || '—'}</b></div>
          </div>
        ) : null}

        <FormActions align="between">
          <Button type="button" variant="ghost" onClick={back} {...(step === 0 ? { disabled: true } : {})}>السابق</Button>
          {step < STEPS.length - 1
            ? <Button type="button" variant="brand" onClick={next}>التالي</Button>
            : <Button type="button" variant="brand" onClick={() => setDone(true)}>تأكيد وإنهاء</Button>}
        </FormActions>
      </div>
    </FormCard>
  );
}
