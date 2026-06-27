import React from 'react';
import Field from '../../../components/molecules/Field.jsx';
import Combobox from '../../../components/organisms/Combobox.jsx';
import Select from '../../../components/organisms/Select.jsx';
import Slider from '../../../components/organisms/Slider.jsx';
import Checkbox from '../../../components/atoms/Checkbox.jsx';
import Button from '../../../components/atoms/Button.jsx';
import Form from '../../../components/molecules/Form.jsx';
import FormActions from '../../../components/molecules/FormActions.jsx';
import FormCard from '../FormCard.jsx';
import { useForm } from '../useForm.js';

const PRODUCT_CATEGORIES = [
  { value: 'all', label: 'كل التصنيفات' },
  { value: 'phones', label: 'هواتف' },
  { value: 'laptops', label: 'حواسيب محمولة' },
  { value: 'audio', label: 'صوتيات' },
  { value: 'cameras', label: 'كاميرات' },
];
const SORTS = [
  { value: 'relevance', label: 'الأكثر صلة' },
  { value: 'price-asc', label: 'السعر: من الأقل' },
  { value: 'price-desc', label: 'السعر: من الأعلى' },
  { value: 'newest', label: 'الأحدث' },
];

/** بحث وفلترة — تصنيف (Combobox) + ترتيب (Select) + سقف السعر (Slider) + توفّر (Checkbox). */
export default function SearchFilterForm() {
  const f = useForm(
    { category: 'all', sort: 'relevance', maxPrice: 2000, inStock: true, offers: false },
    {}
  );
  return (
    <FormCard title="بحث وفلترة" description="ضيّق النتائج حسب تفضيلاتك." done={f.done} doneText="تم تطبيق الفلاتر.">
      <Form onSubmit={f.submit()} aria-label="بحث وفلترة">
        <Field label="التصنيف">
          <Combobox options={PRODUCT_CATEGORIES} value={f.values.category} onChange={(v) => f.set('category', v)} placeholder="ابحث في التصنيفات…" ariaLabel="التصنيف" />
        </Field>
        <Field label="ترتيب حسب">
          <Select options={SORTS} value={f.values.sort} onChange={(v) => f.set('sort', v)} ariaLabel="الترتيب" />
        </Field>
        <Field label={'السعر حتى ' + f.values.maxPrice + ' ر.س'}>
          <Slider value={f.values.maxPrice} min={0} max={5000} step={100} onChange={(v) => f.set('maxPrice', v)} ariaLabel="الحدّ الأقصى للسعر" />
        </Field>
        <Field label="خيارات">
          <div className="fx col gap12">
            <Checkbox checked={f.values.inStock} onChange={(v) => f.set('inStock', v)}>المتوفّر فقط</Checkbox>
            <Checkbox checked={f.values.offers} onChange={(v) => f.set('offers', v)}>عليه عرض</Checkbox>
          </div>
        </Field>
        <FormActions>
          <Button type="submit" variant="brand">تطبيق الفلاتر</Button>
          <Button type="button" variant="ghost" onClick={f.reset}>إعادة تعيين</Button>
        </FormActions>
      </Form>
    </FormCard>
  );
}
