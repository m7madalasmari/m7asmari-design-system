// منطق فرز الجداول — دالة نقيّة قابلة للاختبار.
// dir: 1 تصاعدي، -1 تنازلي. الأرقام تُقارن عدديًا، والنصوص بترتيب عربي.
export function sortRows(rows, key, dir = 1) {
  if (!key) return rows.slice();
  return rows.slice().sort((a, b) => {
    const av = a[key], bv = b[key];
    const cmp = (typeof av === 'number' && typeof bv === 'number')
      ? av - bv
      : String(av).localeCompare(String(bv), 'ar');
    return cmp * dir;
  });
}

// عند النقر على عمود: نفس العمود يعكس الاتجاه، وعمود جديد يبدأ تصاعديًا.
export function nextSortDir(curKey, curDir, key) {
  return curKey === key ? -curDir : 1;
}

// قيمة aria-sort للعمود حسب حالة الفرز الحالية.
export function ariaSortFor(curKey, curDir, key) {
  if (curKey !== key) return 'none';
  return curDir > 0 ? 'ascending' : 'descending';
}
