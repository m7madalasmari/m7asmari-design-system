// kits/dashboard/data.js — بيانات عرض محليّة للكِت (ليست في core).
// تُستهلك من الوصفات لتغذية مكوّنات M7 (StatTile, charts, DataTable, FileRow…).

export const KPIS = [
  { icon: 'trending-up', value: '124,800 ر.س', label: 'الإيراد الشهري', delta: '+12%', trend: 'up', color: 'var(--chart-1)' },
  { icon: 'user', value: '8,420', label: 'مستخدمون نشطون', delta: '+5%', trend: 'up', color: 'var(--chart-5)' },
  { icon: 'package-check', value: '1,260', label: 'طلبات مكتملة', delta: '+8%', trend: 'up', color: 'var(--chart-2)' },
  { icon: 'share-2', value: '3.8%', label: 'معدّل التحويل', delta: '+0.4%', trend: 'up', color: 'var(--chart-3)' },
];

export const REVENUE_SERIES = [
  { label: 'سبت', value: 42 }, { label: 'أحد', value: 55 }, { label: 'إثنين', value: 48 },
  { label: 'ثلاثاء', value: 67 }, { label: 'أربعاء', value: 60 }, { label: 'خميس', value: 82 }, { label: 'جمعة', value: 74 },
];

export const CHANNELS = [
  { label: 'بحث', value: 48, color: 'var(--chart-1)' },
  { label: 'مباشر', value: 32, color: 'var(--chart-2)' },
  { label: 'إحالة', value: 24, color: 'var(--chart-3)' },
  { label: 'تواصل', value: 18, color: 'var(--chart-5)' },
  { label: 'بريد', value: 12, color: 'var(--chart-4)' },
];

export const ORDER_SPLIT = [
  { label: 'مكتمل', value: 62, color: 'var(--chart-2)' },
  { label: 'قيد التنفيذ', value: 26, color: 'var(--chart-3)' },
  { label: 'متأخّر', value: 12, color: 'var(--chart-4)' },
];

export const ACTIVITY = [
  { icon: 'upload', action: 'رفع', file: 'تقرير_الربع.pdf', time: 'قبل دقيقتين' },
  { icon: 'pencil', action: 'تعديل', file: 'خطة_التسويق.docx', time: 'قبل 18 دقيقة' },
  { icon: 'share-2', action: 'مشاركة', file: 'الميزانية_2026.xlsx', time: 'قبل ساعة' },
  { icon: 'check', action: 'اعتماد', file: 'عقد_المورّد.pdf', time: 'قبل 3 ساعات' },
];

// صفوف الجدول — أرقام خام للفرز (amount/dateN) + قيم عرض.
export const TABLE_ROWS = [
  { id: 1, name: 'متجر الواحة', amount: 4820, status: 'مكتمل', date: '12 محرّم', dateN: 12 },
  { id: 2, name: 'شركة نون', amount: 12640, status: 'قيد التنفيذ', date: '11 محرّم', dateN: 11 },
  { id: 3, name: 'مؤسّسة الريّان', amount: 980, status: 'متأخّر', date: '10 محرّم', dateN: 10 },
  { id: 4, name: 'تقنية الغد', amount: 7350, status: 'مكتمل', date: '9 محرّم', dateN: 9 },
  { id: 5, name: 'دار النشر', amount: 2110, status: 'مكتمل', date: '8 محرّم', dateN: 8 },
  { id: 6, name: 'مطاعم السنبلة', amount: 5600, status: 'قيد التنفيذ', date: '7 محرّم', dateN: 7 },
  { id: 7, name: 'عيادات صحّتي', amount: 3290, status: 'متأخّر', date: '6 محرّم', dateN: 6 },
  { id: 8, name: 'أكاديمية طويق', amount: 9870, status: 'مكتمل', date: '5 محرّم', dateN: 5 },
  { id: 9, name: 'متجر الإلكترونيات', amount: 1540, status: 'قيد التنفيذ', date: '4 محرّم', dateN: 4 },
  { id: 10, name: 'مزرعة النخيل', amount: 6720, status: 'مكتمل', date: '3 محرّم', dateN: 3 },
  { id: 11, name: 'استوديو التصميم', amount: 2480, status: 'متأخّر', date: '2 محرّم', dateN: 2 },
  { id: 12, name: 'مكتبة المعرفة', amount: 8130, status: 'مكتمل', date: '1 محرّم', dateN: 1 },
];

export const STATUS_BADGE = { 'مكتمل': 'green', 'قيد التنفيذ': 'gold', 'متأخّر': 'red' };

export const NAV = [
  { id: 'all', icon: 'layout-grid', label: 'كل الملفات', count: 128 },
  { id: 'recent', icon: 'clock', label: 'الأخيرة', count: 12 },
  { id: 'shared', icon: 'share-2', label: 'المشتركة', count: 24 },
  { id: 'starred', icon: 'star', label: 'المميّزة', count: 8 },
];

export const FOLDERS = [
  { label: 'المشاريع', color: 'var(--chart-1)', items: 32, size: '3.1 غ.ب', prog: 72 },
  { label: 'التصاميم', color: 'var(--chart-5)', items: 24, size: '2.4 غ.ب', prog: 55 },
  { label: 'العقود', color: 'var(--chart-3)', items: 15, size: '840 م.ب', prog: 30 },
];

export const FILES = [
  { icon: 'file-text', name: 'تقرير_الأداء.pdf', size: '2.4 م.ب', mod: 'قبل ساعتين', color: 'var(--chart-4)' },
  { icon: 'palette', name: 'هوية_العلامة.fig', size: '5.1 م.ب', mod: 'قبل 5 ساعات', color: 'var(--chart-5)' },
  { icon: 'bar-chart-2', name: 'لوحة_المبيعات.xlsx', size: '856 ك.ب', mod: 'أمس', color: 'var(--chart-2)' },
  { icon: 'file-text', name: 'محضر_الاجتماع.docx', size: '124 ك.ب', mod: 'قبل يومين', color: 'var(--chart-1)' },
];

// مقياس دائري للوحة التحليلات
export const ANALYTICS_RING = { value: 68, max: 100, label: 'نسبة تحقيق الهدف الشهري', color: 'var(--chart-1)' };

// ===== متجر / طلبات (تجارة) =====
export const STORE_KPIS = [
  { icon: 'trending-up', value: '89,400 ر.س', label: 'مبيعات اليوم', delta: '+9%', trend: 'up', color: 'var(--chart-2)' },
  { icon: 'package-check', value: '342', label: 'طلبات', delta: '+14%', trend: 'up', color: 'var(--chart-1)' },
  { icon: 'user', value: '1,180', label: 'زوّار', delta: '+6%', trend: 'up', color: 'var(--chart-5)' },
  { icon: 'share-2', value: '212 ر.س', label: 'متوسّط السلّة', delta: '+3%', trend: 'up', color: 'var(--chart-3)' },
];
export const SALES_SERIES = [
  { label: 'سبت', value: 52 }, { label: 'أحد', value: 61 }, { label: 'إثنين', value: 48 },
  { label: 'ثلاثاء', value: 73 }, { label: 'أربعاء', value: 69 }, { label: 'خميس', value: 88 }, { label: 'جمعة', value: 95 },
];
export const TOP_PRODUCTS = [
  { name: 'سمّاعات لاسلكية', value: 1240, color: 'var(--chart-1)' },
  { name: 'ساعة ذكية', value: 980, color: 'var(--chart-2)' },
  { name: 'لوحة مفاتيح ميكانيكية', value: 760, color: 'var(--chart-3)' },
  { name: 'حقيبة ظهر', value: 540, color: 'var(--chart-5)' },
  { name: 'كوب حراري', value: 410, color: 'var(--chart-4)' },
];
export const ORDERS = [
  { id: 1, customer: 'محمد الأسمري', total: 420, status: 'مكتمل', date: '12 محرّم', dateN: 12 },
  { id: 2, customer: 'فهد القحطاني', total: 1290, status: 'قيد التنفيذ', date: '12 محرّم', dateN: 12 },
  { id: 3, customer: 'سارة الزهراني', total: 230, status: 'متأخّر', date: '11 محرّم', dateN: 11 },
  { id: 4, customer: 'عبدالله العتيبي', total: 880, status: 'مكتمل', date: '11 محرّم', dateN: 11 },
  { id: 5, customer: 'ريم الدوسري', total: 540, status: 'مكتمل', date: '10 محرّم', dateN: 10 },
  { id: 6, customer: 'ماجد الشهري', total: 1750, status: 'قيد التنفيذ', date: '10 محرّم', dateN: 10 },
  { id: 7, customer: 'هند الغامدي', total: 320, status: 'مكتمل', date: '9 محرّم', dateN: 9 },
];

// ===== ملف شخصي / تعليم (طالب) =====
export const STUDENT = {
  name: 'محمد الأسمري',
  subtitle: 'علوم الحاسب — المستوى السادس',
  avatar: 'assets/avatar.jpg',
  meta: [{ icon: 'user', label: 'الرقم الجامعي: 4421' }, { icon: 'calendar-clock', label: 'التحقت 2023' }, { icon: 'check', label: 'منتظم' }],
};
export const STUDENT_STATS = [
  { icon: 'layout-grid', value: '6', label: 'المقرّرات', delta: 'هذا الفصل', trend: 'flat', color: 'var(--chart-1)' },
  { icon: 'trending-up', value: '4.6', label: 'المعدّل التراكمي', delta: '+0.2', trend: 'up', color: 'var(--chart-2)' },
  { icon: 'clock', value: '92%', label: 'نسبة الحضور', delta: '+4%', trend: 'up', color: 'var(--chart-3)' },
];
export const STUDENT_GOALS = [
  { label: 'إنجاز الفصل الدراسي', value: 72, target: 100, unit: '%', icon: 'check', color: 'var(--chart-1)' },
  { label: 'ساعات الدراسة (أسبوعيًا)', value: 22, target: 30, unit: ' س', icon: 'clock', color: 'var(--chart-2)' },
];
export const STUDENT_TIMELINE = [
  { title: 'سُلّم واجب «الخوارزميات»', time: 'قبل ساعة', icon: 'check', color: 'var(--success)' },
  { title: 'حضر محاضرة «قواعد البيانات»', time: 'أمس', icon: 'calendar-clock', color: 'var(--chart-1)' },
  { title: 'درجة اختبار «الشبكات»: 95', time: 'قبل 3 أيام', icon: 'trending-up', color: 'var(--chart-2)' },
  { title: 'سجّل في مقرّر «الذكاء الاصطناعي»', time: 'الأسبوع الماضي', icon: 'plus', color: 'var(--chart-5)' },
];

// ===== CRM / عملاء (مبيعات) =====
export const CRM_KPIS = [
  { icon: 'user', value: '128', label: 'عملاء نشطون', delta: '+7', trend: 'up', color: 'var(--chart-5)' },
  { icon: 'trending-up', value: '1.2 م ر.س', label: 'صفقات مفتوحة', delta: '+12%', trend: 'up', color: 'var(--chart-1)' },
  { icon: 'check', value: '34%', label: 'معدّل الإغلاق', delta: '+3%', trend: 'up', color: 'var(--chart-2)' },
];
export const CUSTOMERS = [
  { name: 'شركة نون', sub: '4 صفقات نشطة', value: '124,000 ر.س', trend: [3, 5, 4, 6, 7, 6, 8], color: 'var(--chart-1)' },
  { name: 'مؤسّسة الريّان', sub: 'صفقتان', value: '86,500 ر.س', trend: [5, 4, 6, 5, 7, 8, 7], color: 'var(--chart-2)' },
  { name: 'تقنية الغد', sub: '3 صفقات', value: '52,300 ر.س', trend: [2, 3, 3, 4, 4, 5, 6], color: 'var(--chart-3)' },
];
export const CRM_TIMELINE = [
  { title: 'مكالمة مع «شركة نون»', desc: 'اتفاق مبدئي على التجديد', time: 'قبل ساعتين', icon: 'check', color: 'var(--success)' },
  { title: 'عرض سعر لـ«تقنية الغد»', desc: 'بانتظار الردّ', time: 'أمس', icon: 'share-2', color: 'var(--chart-1)' },
  { title: 'اجتماع تعريفي جديد', desc: 'عميل محتمل من قطاع التعليم', time: 'قبل يومين', icon: 'user', color: 'var(--chart-5)' },
];
export const DEALS = [
  { id: 1, name: 'تجديد ترخيص سنوي', customer: 'شركة نون', amount: 124000, status: 'تفاوض', date: '12 محرّم', dateN: 12 },
  { id: 2, name: 'باقة المؤسّسات', customer: 'مؤسّسة الريّان', amount: 86500, status: 'فاز', date: '10 محرّم', dateN: 10 },
  { id: 3, name: 'ترقية الخطة', customer: 'تقنية الغد', amount: 52300, status: 'جديد', date: '9 محرّم', dateN: 9 },
  { id: 4, name: 'تكامل API', customer: 'دار النشر', amount: 31000, status: 'خسر', date: '7 محرّم', dateN: 7 },
];
export const DEAL_STATUS_BADGE = { 'فاز': 'green', 'تفاوض': 'gold', 'جديد': 'brand', 'خسر': 'red' };

// ===== لوحة مهام (Kanban) =====
export const KANBAN_COLUMNS = [
  { id: 'backlog', title: 'قيد الانتظار', color: 'var(--neutral-500)', cards: [
    { title: 'تصميم صفحة الدفع', tag: 'تصميم', tagVariant: 'brand', meta: 'قبل يومين', avatar: 'assets/avatar.jpg' },
    { title: 'مراجعة نصوص الواجهة', tag: 'محتوى', tagVariant: 'neutral', meta: 'قبل 3 أيام' },
  ] },
  { id: 'todo', title: 'هذا الأسبوع', color: 'var(--chart-3)', cards: [
    { title: 'ربط بوابة الدفع', desc: 'تكامل مع المزوّد', tag: 'تطوير', tagVariant: 'gold', meta: 'الأحد', avatar: 'assets/avatar.jpg' },
    { title: 'اختبار النماذج', tag: 'جودة', tagVariant: 'neutral', meta: 'الإثنين' },
  ] },
  { id: 'doing', title: 'قيد التنفيذ', color: 'var(--chart-1)', cards: [
    { title: 'لوحة التحليلات', desc: 'رسوم + مؤشّرات', tag: 'تطوير', tagVariant: 'brand', meta: 'اليوم', avatar: 'assets/avatar.jpg' },
  ] },
  { id: 'done', title: 'مكتمل', color: 'var(--chart-2)', cards: [
    { title: 'توحيد الأيقونات', tag: 'core', tagVariant: 'green', meta: 'أمس' },
    { title: 'كتالوج الـwidgets', tag: 'core', tagVariant: 'green', meta: 'اليوم', avatar: 'assets/avatar.jpg' },
  ] },
];

// — لمحة تنفيذية (Executive) — تستفيد من الطبقة التحليلية الجديدة —
export const EXEC_KPIS = [
  { icon: 'trending-up', value: '2.4M ر.س', label: 'الإيراد السنوي', delta: '+18%', trend: 'up', color: 'var(--chart-1)' },
  { icon: 'user', value: '32,140', label: 'العملاء النشطون', delta: '+9%', trend: 'up', color: 'var(--chart-5)' },
  { icon: 'package-check', value: '12,860', label: 'الصفقات المغلقة', delta: '+12%', trend: 'up', color: 'var(--chart-2)' },
  { icon: 'star', value: '94%', label: 'رضا العملاء', delta: '+3%', trend: 'up', color: 'var(--chart-3)' },
];
export const EXEC_REVENUE_MULTI = [
  { label: '٢٠٢٤', data: [{ label: 'ر١', value: 480 }, { label: 'ر٢', value: 540 }, { label: 'ر٣', value: 520 }, { label: 'ر٤', value: 610 }] },
  { label: '٢٠٢٥', data: [{ label: 'ر١', value: 560 }, { label: 'ر٢', value: 640 }, { label: 'ر٣', value: 720 }, { label: 'ر٤', value: 840 }] },
];
export const EXEC_WATERFALL = [
  { label: 'رصيد أوّلي', value: 1800, type: 'total' },
  { label: 'مبيعات جديدة', value: 920 },
  { label: 'تجديدات', value: 540 },
  { label: 'تخفيضات', value: -260 },
  { label: 'إلغاءات', value: -180 },
  { label: 'الصافي', type: 'total' },
];
export const EXEC_TARGETS = [
  { label: 'الإيراد (مليون)', value: 2.4, target: 2.6, max: 3, ranges: [{ value: 1.5 }, { value: 0.8 }, { value: 0.7 }], color: 'var(--chart-1)' },
  { label: 'هامش الربح %', value: 32, target: 30, max: 50, ranges: [{ value: 20 }, { value: 15 }, { value: 15 }], color: 'var(--chart-2)' },
  { label: 'كلفة الاكتساب', value: 280, target: 250, max: 500, ranges: [{ value: 250 }, { value: 125 }, { value: 125 }], color: 'var(--chart-3)' },
];
export const EXEC_METRICS = [
  { label: 'الإيراد الشهري', value: 240000, prev: 212000, unit: ' ر.س', data: [20, 24, 22, 30, 28, 34] },
  { label: 'متوسّط قيمة الصفقة', value: 18600, prev: 16800, unit: ' ر.س', data: [12, 13, 12, 15, 16, 17] },
  { label: 'دورة البيع (يوم)', value: 34, prev: 41, data: [44, 42, 40, 38, 36, 34] },
  { label: 'معدّل الاحتفاظ', value: 92, prev: 88, unit: '%', data: [85, 86, 87, 88, 90, 92] },
];
export const EXEC_SEGMENTS = [
  { label: 'مؤسّسات', value: 46 },
  { label: 'شركات متوسّطة', value: 30 },
  { label: 'أفراد', value: 16 },
  { label: 'حكومي', value: 8 },
];
