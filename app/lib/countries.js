// app/lib/countries.js — قائمة دول قابلة لإعادة الاستخدام (اسم عربي + مفتاح دولي + علم + رمز ISO).
// تُستهلك في PhoneInput (مفاتيح الدول) وفي اختيار الدولة بالوصفات — مصدر واحد منظّم.

export const COUNTRIES = [
  { code: 'SA', name: 'السعودية', dial: '+966', flag: '🇸🇦' },
  { code: 'AE', name: 'الإمارات', dial: '+971', flag: '🇦🇪' },
  { code: 'KW', name: 'الكويت', dial: '+965', flag: '🇰🇼' },
  { code: 'QA', name: 'قطر', dial: '+974', flag: '🇶🇦' },
  { code: 'BH', name: 'البحرين', dial: '+973', flag: '🇧🇭' },
  { code: 'OM', name: 'عُمان', dial: '+968', flag: '🇴🇲' },
  { code: 'EG', name: 'مصر', dial: '+20', flag: '🇪🇬' },
  { code: 'JO', name: 'الأردن', dial: '+962', flag: '🇯🇴' },
  { code: 'LB', name: 'لبنان', dial: '+961', flag: '🇱🇧' },
  { code: 'IQ', name: 'العراق', dial: '+964', flag: '🇮🇶' },
  { code: 'MA', name: 'المغرب', dial: '+212', flag: '🇲🇦' },
  { code: 'YE', name: 'اليمن', dial: '+967', flag: '🇾🇪' },
];

// خيارات مُنتقي مفتاح الدولة (علم + مفتاح) — مدمجة LTR.
export const DIAL_OPTIONS = COUNTRIES.map((c) => ({ value: c.dial, label: c.flag + ' ' + c.dial }));

// خيارات اختيار الدولة بالاسم (للـSelect/Combobox).
export const COUNTRY_OPTIONS = COUNTRIES.map((c) => ({ value: c.code, label: c.name }));
