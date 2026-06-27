// بناء خلايا شهر التقويم — دالة نقيّة قابلة للاختبار.
// تُرجع 7×n خلية: أيام الشهر السابق/التالي مُعتَّمة (muted)، وأيام الشهر مع علامات
// اليوم الحالي (today) والمحدّد (selected). today = { year, month, day } أو null.
export function buildMonth(year, month, selected, today = null) {
  const first = new Date(year, month, 1).getDay();
  const dim = new Date(year, month + 1, 0).getDate();
  const pdim = new Date(year, month, 0).getDate();
  const cells = [];
  for (let i = first - 1; i >= 0; i--) cells.push({ label: pdim - i, muted: true });
  for (let d = 1; d <= dim; d++) {
    const isToday = !!today && today.year === year && today.month === month && today.day === d;
    cells.push({ label: d, day: d, muted: false, today: isToday, selected: d === selected });
  }
  let t = 1;
  while (cells.length % 7 !== 0) cells.push({ label: t++, muted: true });
  return cells;
}
