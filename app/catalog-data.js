// كتالوج widgets النواة (Core) — فهرس قابل للقراءة آليًا، محايد للمجال.
// مرجع وحيد للتمييز: ما هنا = ودجت Core يُعاد استخدامه في أي Kit؛ أما الوصفات (Recipes)
// فهي تركيبات خاصّة بمجال داخل kits/<domain>/recipes ولا تُدرَج هنا.
// كل عنصر: { name, label, cat, layer, desc, demo } — demo = صفحة فيها عرض حيّ.

export const CATS = [
  { id: 'stat', title: 'إحصاء ومؤشّرات' },
  { id: 'chart', title: 'رسوم بيانية' },
  { id: 'data', title: 'عرض بيانات' },
  { id: 'entity', title: 'كيانات وتواصل' },
  { id: 'layout', title: 'تخطيط وتنقّل' },
  { id: 'overlay', title: 'تفاعل وتراكب' },
];

export const LAYER_LABELS = { atom: 'ذرّة', molecule: 'جزيء', organism: 'كائن', chart: 'رسم', pattern: 'نمط' };

const LAB = '/lab.html';
const DASH = '/dashboardkit.html';

export const WIDGETS = [
  // إحصاء
  { name: 'StatTile', label: 'بطاقة مؤشّر', cat: 'stat', layer: 'molecule', desc: 'قيمة + تسمية + دلتا واتجاه.', demo: LAB },
  { name: 'CompareStat', label: 'مقارنة بفترة', cat: 'stat', layer: 'molecule', desc: 'القيمة الحالية مقابل السابقة مع نسبة التغيّر.', demo: LAB },
  { name: 'TrendStat', label: 'رقم باتجاه مدمج', cat: 'stat', layer: 'molecule', desc: 'مؤشّر مع خطّ اتجاه مصغّر.', demo: LAB },
  { name: 'GoalCard', label: 'تقدّم نحو هدف', cat: 'stat', layer: 'molecule', desc: 'قيمة مقابل هدف مع شريط تقدّم.', demo: LAB },
  { name: 'RingStat', label: 'نسبة دائرية', cat: 'stat', layer: 'molecule', desc: 'مقياس واحد في حلقة دائرية.', demo: LAB },
  { name: 'DistributionBar', label: 'توزيع نِسَب', cat: 'stat', layer: 'molecule', desc: 'تركيب 100% عبر فئات.', demo: LAB },
  { name: 'MetricGrid', label: 'جدول مؤشّرات', cat: 'stat', layer: 'molecule', desc: 'مقارنة عدّة مؤشّرات في شبكة.', demo: LAB },
  { name: 'BulletChart', label: 'مؤشّر هدف', cat: 'stat', layer: 'chart', desc: 'قيمة مقابل هدف ضمن نطاقات.', demo: LAB },
  // رسوم
  { name: 'Sparkline', label: 'رسم مصغّر', cat: 'chart', layer: 'chart', desc: 'خطّ اتجاه سطري مضغوط.', demo: DASH },
  { name: 'LineChart', label: 'خطّ', cat: 'chart', layer: 'chart', desc: 'سلسلة زمنية بنقاط وتلميح.', demo: DASH },
  { name: 'MultiLineChart', label: 'خطّ متعدّد السلاسل', cat: 'chart', layer: 'chart', desc: 'مقارنة عدّة سلاسل.', demo: LAB },
  { name: 'BarChart', label: 'أعمدة', cat: 'chart', layer: 'chart', desc: 'أعمدة عمودية مع قيم.', demo: DASH },
  { name: 'StackedBarChart', label: 'أعمدة متراكمة', cat: 'chart', layer: 'chart', desc: 'تركيب عبر الفئات.', demo: LAB },
  { name: 'DonutChart', label: 'دائري مجوّف', cat: 'chart', layer: 'chart', desc: 'حصص مع تسمية مركزية.', demo: DASH },
  { name: 'WaterfallChart', label: 'شلّالي', cat: 'chart', layer: 'chart', desc: 'تفكيك مساهمات التغيّر.', demo: LAB },
  { name: 'Heatmap', label: 'خريطة حرارية', cat: 'chart', layer: 'chart', desc: 'كثافة عبر شبكة/زمن.', demo: LAB },
  { name: 'Gauge', label: 'مقياس نصف دائري', cat: 'chart', layer: 'chart', desc: 'قيمة واحدة على قوس.', demo: LAB },
  { name: 'Funnel', label: 'قمع تحويل', cat: 'chart', layer: 'chart', desc: 'مراحل متناقصة.', demo: LAB },
  { name: 'Legend', label: 'مفتاح ألوان', cat: 'chart', layer: 'chart', desc: 'دليل ألوان السلاسل.', demo: DASH },
  // بيانات
  { name: 'DataTable', label: 'جدول بيانات', cat: 'data', layer: 'organism', desc: 'فرز وترقيم صفحات.', demo: DASH },
  { name: 'Pagination', label: 'ترقيم صفحات', cat: 'data', layer: 'molecule', desc: 'تنقّل بين صفحات النتائج.', demo: DASH },
  { name: 'RankList', label: 'قائمة مرتّبة', cat: 'data', layer: 'molecule', desc: 'عناصر بقيمة وترتيب.', demo: DASH },
  { name: 'Timeline', label: 'خطّ زمني', cat: 'data', layer: 'molecule', desc: 'أحداث متسلسلة بزمن وأيقونة.', demo: DASH },
  { name: 'ActivityItem', label: 'عنصر نشاط', cat: 'data', layer: 'molecule', desc: 'إجراء + ملف + وقت.', demo: DASH },
  { name: 'FileRow', label: 'صفّ ملف', cat: 'data', layer: 'molecule', desc: 'اسم وحجم ووقت ونوع.', demo: DASH },
  { name: 'FolderItem', label: 'عنصر مجلّد', cat: 'data', layer: 'molecule', desc: 'مجلّد بعدّاد وحجم وتثبيت.', demo: DASH },
  // كيانات وتواصل
  { name: 'ProfileHeader', label: 'ترويسة كيان', cat: 'entity', layer: 'molecule', desc: 'اسم وصورة وبيانات وإجراءات.', demo: DASH },
  { name: 'ContactCard', label: 'بطاقة جهة اتصال', cat: 'entity', layer: 'molecule', desc: 'هوية + بيانات + إجراءات.', demo: LAB },
  { name: 'AvatarGroup', label: 'مجموعة أفاتارات', cat: 'entity', layer: 'molecule', desc: 'أفاتارات متراكبة بعدّاد فائض.', demo: LAB },
  { name: 'ChatThread', label: 'محادثة (RTL)', cat: 'entity', layer: 'molecule', desc: 'فقاعات رسائل باتجاهين.', demo: LAB },
  { name: 'UserMenu', label: 'قائمة مستخدم', cat: 'entity', layer: 'molecule', desc: 'صورة واسم وإعدادات وسمة.', demo: DASH },
  { name: 'Avatar', label: 'أفاتار', cat: 'entity', layer: 'atom', desc: 'صورة أو حرف بديل.', demo: LAB },
  // تخطيط وتنقّل
  { name: 'DashboardLayout', label: 'هيكل لوحة', cat: 'layout', layer: 'pattern', desc: 'شريط جانبي + ترويسة + جسم.', demo: DASH },
  { name: 'PageHeader', label: 'ترويسة صفحة', cat: 'layout', layer: 'molecule', desc: 'عنوان + وصف + إجراءات.', demo: DASH },
  { name: 'NavItem', label: 'عنصر تنقّل', cat: 'layout', layer: 'molecule', desc: 'شريط جانبي أو لوحة بعدّاد.', demo: DASH },
  { name: 'Breadcrumb', label: 'فتات تنقّل', cat: 'layout', layer: 'molecule', desc: 'مسار هرمي، عناصر قابلة للنقر.', demo: DASH },
  { name: 'FilterBar', label: 'شريط فلترة', cat: 'layout', layer: 'molecule', desc: 'بحث + مرشّحات + إجراءات.', demo: DASH },
  { name: 'Toolbar', label: 'شريط أدوات', cat: 'layout', layer: 'molecule', desc: 'صفّ إجراءات مرن.', demo: DASH },
  { name: 'SearchField', label: 'حقل بحث', cat: 'layout', layer: 'molecule', desc: 'إدخال بحث باختصار لوحة مفاتيح.', demo: DASH },
  { name: 'CollapsibleSection', label: 'قسم قابل للطيّ', cat: 'layout', layer: 'molecule', desc: 'ترويسة تطوي محتواها.', demo: DASH },
  // تفاعل وتراكب
  { name: 'CommandPalette', label: 'لوحة أوامر (⌘K)', cat: 'overlay', layer: 'organism', desc: 'بحث وأوامر بالكيبورد.', demo: LAB },
  { name: 'Popover', label: 'قائمة منبثقة', cat: 'overlay', layer: 'organism', desc: 'طبقة مرتكزة تُغلق بالنقر/Esc.', demo: LAB },
  { name: 'Kanban', label: 'لوحة كانبان', cat: 'overlay', layer: 'organism', desc: 'أعمدة وبطاقات مهام.', demo: DASH },
  { name: 'TreeView', label: 'شجرة', cat: 'overlay', layer: 'organism', desc: 'عُقد قابلة للطيّ.', demo: LAB },
  { name: 'Carousel', label: 'معرض شرائح', cat: 'overlay', layer: 'organism', desc: 'شرائح بتنقّل ومؤشّرات.', demo: LAB },
  { name: 'CompareSlider', label: 'مقارنة قبل/بعد', cat: 'overlay', layer: 'organism', desc: 'مقبض سحب يكشف الطبقتين.', demo: LAB },
  { name: 'Rating', label: 'تقييم نجوم', cat: 'overlay', layer: 'molecule', desc: 'تفاعلي أو للقراءة فقط.', demo: LAB },
  { name: 'Skeleton', label: 'هيكل تحميل', cat: 'overlay', layer: 'atom', desc: 'عناصر نائبة أثناء التحميل.', demo: LAB },
];
