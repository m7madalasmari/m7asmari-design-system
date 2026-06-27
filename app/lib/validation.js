// app/lib/validation.js — قواعد تحقّق عربية نقيّة لنماذج M7 Form Kit. منطق فقط (بلا UI).
// كل قاعدة دالّة تأخذ القيمة وتعيد رسالة الخطأ (نصًّا) أو '' عند الصحّة. تُركَّب عبر validate().

export const required = (msg = 'هذا الحقل مطلوب') => (v) =>
  (v == null || (typeof v === 'string' && v.trim() === '') || v === false ? msg : '');

export const email = (msg = 'أدخل بريدًا إلكترونيًا صحيحًا') => (v) =>
  (!v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v)) ? '' : msg);

export const minLength = (n, msg) => (v) =>
  (!v || String(v).length >= n ? '' : (msg || (n + ' أحرف على الأقل')));

export const maxLength = (n, msg) => (v) =>
  (!v || String(v).length <= n ? '' : (msg || ('بحدّ أقصى ' + n + ' حرفًا')));

export const matches = (other, msg = 'القيمتان غير متطابقتين') => (v) => {
  const o = typeof other === 'function' ? other() : other;
  return v === o ? '' : msg;
};

export const saudiPhone = (msg = 'أدخل رقم جوال سعودي صحيح') => (v) =>
  (!v || /^(?:\+?966|0)?5\d{8}$/.test(String(v).replace(/[\s-]/g, '')) ? '' : msg);

// يشغّل سلسلة قواعد ويعيد أوّل رسالة خطأ (أو '' إن صحّت كلّها).
export function validate(value, rules = []) {
  for (const rule of rules) {
    const m = rule(value);
    if (m) return m;
  }
  return '';
}

// يتحقّق من كائن قيم مقابل خريطة قواعد { field: [rules] }، ويعيد { errors, valid }.
export function validateForm(values, schema) {
  const errors = {};
  for (const key of Object.keys(schema)) {
    const m = validate(values[key], schema[key]);
    if (m) errors[key] = m;
  }
  return { errors, valid: Object.keys(errors).length === 0 };
}
