import React from 'react';
import Field from '../../../components/molecules/Field.jsx';
import Input from '../../../components/atoms/Input.jsx';
import Textarea from '../../../components/atoms/Textarea.jsx';
import Select from '../../../components/organisms/Select.jsx';
import DatePicker from '../../../components/organisms/DatePicker.jsx';
import FileUpload from '../../../components/molecules/FileUpload.jsx';
import Switch from '../../../components/atoms/Switch.jsx';
import Button from '../../../components/atoms/Button.jsx';
import Form from '../../../components/molecules/Form.jsx';
import FormActions from '../../../components/molecules/FormActions.jsx';
import FormCard from '../FormCard.jsx';
import { useForm } from '../useForm.js';
import { required } from '../../../app/lib/validation.js';

const LANGS = [
  { value: 'ar', label: 'العربية' },
  { value: 'en', label: 'الإنجليزية' },
  { value: 'fr', label: 'الفرنسية' },
];

/** الملف الشخصي / الإعدادات — اسم + نبذة + تاريخ ميلاد (DatePicker) + صورة (FileUpload) + لغة + إشعارات. */
export default function ProfileForm() {
  const f = useForm(
    { name: 'محمد الأسمري', bio: '', birth: null, lang: 'ar', notify: true },
    { name: [required('الاسم مطلوب')] }
  );
  return (
    <FormCard title="الملف الشخصي" description="حدّث بياناتك وتفضيلاتك." done={f.done} doneText="تم حفظ التغييرات.">
      <Form onSubmit={f.submit()} aria-label="الملف الشخصي">
        <Field label="الاسم الكامل" status={f.errors.name ? 'error' : ''} message={f.errors.name}>
          <Input {...f.bind('name')} />
        </Field>
        <Field label="نبذة تعريفية">
          <Textarea placeholder="اكتب نبذة قصيرة عنك…" {...f.bind('bio')} />
        </Field>
        <div className="grid cols2">
          <Field label="تاريخ الميلاد">
            <DatePicker value={f.values.birth} onChange={(v) => f.set('birth', v)} ariaLabel="تاريخ الميلاد" />
          </Field>
          <Field label="لغة الواجهة">
            <Select options={LANGS} value={f.values.lang} onChange={(v) => f.set('lang', v)} ariaLabel="اللغة" />
          </Field>
        </div>
        <Field label="الصورة الشخصية">
          <FileUpload accept="image/*" label="اسحب صورة هنا أو اضغط للاختيار" hint="PNG أو JPG، بحدّ أقصى 5 ميجابايت" onChange={(file) => f.set('avatar', file)} />
        </Field>
        <Switch checked={f.values.notify} onChange={(v) => f.set('notify', v)}>تفعيل إشعارات البريد الإلكتروني</Switch>
        <FormActions>
          <Button type="submit" variant="brand">حفظ التغييرات</Button>
          <Button type="button" variant="ghost" onClick={f.reset}>إلغاء</Button>
        </FormActions>
      </Form>
    </FormCard>
  );
}
