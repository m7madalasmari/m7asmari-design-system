// كتالوج widgets النواة (Core) — فهرس قابل للقراءة آليًا، محايد للمجال.
// مرجع وحيد للتمييز: ما هنا = ودجت Core يُعاد استخدامه في أي Kit؛ أما الوصفات (Recipes)
// فهي تركيبات خاصّة بمجال داخل kits/<domain>/recipes ولا تُدرَج هنا.
// كل عنصر: { name, label, cat, layer, desc, demo } — demo = رابط عميق يفتح العرض الحيّ
// للودجت بعينه: لوحة الكِت بـhash الوصفة (#analytics…) أو قسم المختبر (#lab-…).

export const CATS = [
  { id: 'stat', title: 'إحصاء ومؤشّرات' },
  { id: 'chart', title: 'رسوم بيانية' },
  { id: 'data', title: 'عرض بيانات' },
  { id: 'entity', title: 'كيانات وتواصل' },
  { id: 'layout', title: 'تخطيط وتنقّل' },
  { id: 'overlay', title: 'تفاعل وتراكب' },
];

export const LAYER_LABELS = { atom: 'ذرّة', molecule: 'جزيء', organism: 'كائن', chart: 'رسم', pattern: 'نمط' };

export const WIDGETS = [
  // إحصاء — معروضة في مختبر المكوّنات (قسم الإحصاء/التحليلات)
  { name: 'StatTile', label: 'بطاقة مؤشّر', cat: 'stat', layer: 'molecule', desc: 'قيمة + تسمية + دلتا واتجاه.', demo: '/lab.html#lab-stats' },
  { name: 'CompareStat', label: 'مقارنة بفترة', cat: 'stat', layer: 'molecule', desc: 'القيمة الحالية مقابل السابقة مع نسبة التغيّر.', demo: '/lab.html#lab-stats' },
  { name: 'TrendStat', label: 'رقم باتجاه مدمج', cat: 'stat', layer: 'molecule', desc: 'مؤشّر مع خطّ اتجاه مصغّر.', demo: '/lab.html#lab-stats' },
  { name: 'GoalCard', label: 'تقدّم نحو هدف', cat: 'stat', layer: 'molecule', desc: 'قيمة مقابل هدف مع شريط تقدّم.', demo: '/lab.html#lab-stats' },
  { name: 'RingStat', label: 'نسبة دائرية', cat: 'stat', layer: 'molecule', desc: 'مقياس واحد في حلقة دائرية.', demo: '/lab.html#lab-stats' },
  { name: 'DistributionBar', label: 'توزيع نِسَب', cat: 'stat', layer: 'molecule', desc: 'تركيب 100% عبر فئات.', demo: '/lab.html#lab-stats' },
  { name: 'MetricGrid', label: 'جدول مؤشّرات', cat: 'stat', layer: 'molecule', desc: 'مقارنة عدّة مؤشّرات في شبكة.', demo: '/lab.html#lab-deeper' },
  { name: 'BulletChart', label: 'مؤشّر هدف', cat: 'stat', layer: 'chart', desc: 'قيمة مقابل هدف ضمن نطاقات.', demo: '/lab.html#lab-deeper' },
  // رسوم — لوحات الكِت (تحليلية/متجر/CRM) أو المختبر
  { name: 'Sparkline', label: 'رسم مصغّر', cat: 'chart', layer: 'chart', desc: 'خطّ اتجاه سطري مضغوط.', demo: '/dashboardkit.html#crm' },
  { name: 'LineChart', label: 'خطّ', cat: 'chart', layer: 'chart', desc: 'سلسلة زمنية بنقاط وتلميح.', demo: '/dashboardkit.html#analytics' },
  { name: 'MultiLineChart', label: 'خطّ متعدّد السلاسل', cat: 'chart', layer: 'chart', desc: 'مقارنة عدّة سلاسل.', demo: '/lab.html#lab-deeper' },
  { name: 'BarChart', label: 'أعمدة', cat: 'chart', layer: 'chart', desc: 'أعمدة عمودية مع قيم.', demo: '/dashboardkit.html#analytics' },
  { name: 'StackedBarChart', label: 'أعمدة متراكمة', cat: 'chart', layer: 'chart', desc: 'تركيب عبر الفئات.', demo: '/lab.html#lab-stats' },
  { name: 'DonutChart', label: 'دائري مجوّف', cat: 'chart', layer: 'chart', desc: 'حصص مع تسمية مركزية.', demo: '/dashboardkit.html#analytics' },
  { name: 'WaterfallChart', label: 'شلّالي', cat: 'chart', layer: 'chart', desc: 'تفكيك مساهمات التغيّر.', demo: '/lab.html#lab-deeper' },
  { name: 'Heatmap', label: 'خريطة حرارية', cat: 'chart', layer: 'chart', desc: 'كثافة عبر شبكة/زمن.', demo: '/lab.html#lab-stats' },
  { name: 'Gauge', label: 'مقياس نصف دائري', cat: 'chart', layer: 'chart', desc: 'قيمة واحدة على قوس.', demo: '/lab.html#lab-viz' },
  { name: 'Funnel', label: 'قمع تحويل', cat: 'chart', layer: 'chart', desc: 'مراحل متناقصة.', demo: '/lab.html#lab-viz' },
  { name: 'Legend', label: 'مفتاح ألوان', cat: 'chart', layer: 'chart', desc: 'دليل ألوان السلاسل.', demo: '/dashboardkit.html#analytics' },
  // بيانات — لوحات الكِت
  { name: 'DataTable', label: 'جدول بيانات', cat: 'data', layer: 'organism', desc: 'فرز وترقيم صفحات.', demo: '/dashboardkit.html#table' },
  { name: 'Pagination', label: 'ترقيم صفحات', cat: 'data', layer: 'molecule', desc: 'تنقّل بين صفحات النتائج.', demo: '/dashboardkit.html#table' },
  { name: 'RankList', label: 'قائمة مرتّبة', cat: 'data', layer: 'molecule', desc: 'عناصر بقيمة وترتيب.', demo: '/dashboardkit.html#store' },
  { name: 'Timeline', label: 'خطّ زمني', cat: 'data', layer: 'molecule', desc: 'أحداث متسلسلة بزمن وأيقونة.', demo: '/dashboardkit.html#crm' },
  { name: 'ActivityItem', label: 'عنصر نشاط', cat: 'data', layer: 'molecule', desc: 'إجراء + ملف + وقت.', demo: '/dashboardkit.html#analytics' },
  { name: 'FileRow', label: 'صفّ ملف', cat: 'data', layer: 'molecule', desc: 'اسم وحجم ووقت ونوع.', demo: '/dashboardkit.html#files' },
  { name: 'FolderItem', label: 'عنصر مجلّد', cat: 'data', layer: 'molecule', desc: 'مجلّد بعدّاد وحجم وتثبيت.', demo: '/dashboardkit.html#files' },
  // كيانات وتواصل
  { name: 'ProfileHeader', label: 'ترويسة كيان', cat: 'entity', layer: 'molecule', desc: 'اسم وصورة وبيانات وإجراءات.', demo: '/dashboardkit.html#profile' },
  { name: 'ContactCard', label: 'بطاقة جهة اتصال', cat: 'entity', layer: 'molecule', desc: 'هوية + بيانات + إجراءات.', demo: '/lab.html#lab-social' },
  { name: 'AvatarGroup', label: 'مجموعة أفاتارات', cat: 'entity', layer: 'molecule', desc: 'أفاتارات متراكبة بعدّاد فائض.', demo: '/lab.html#lab-social' },
  { name: 'ChatThread', label: 'محادثة (RTL)', cat: 'entity', layer: 'molecule', desc: 'فقاعات رسائل باتجاهين.', demo: '/lab.html#lab-social' },
  { name: 'UserMenu', label: 'قائمة مستخدم', cat: 'entity', layer: 'molecule', desc: 'صورة واسم وإعدادات وسمة.', demo: '/dashboardkit.html#files' },
  { name: 'Avatar', label: 'أفاتار', cat: 'entity', layer: 'atom', desc: 'صورة أو حرف بديل.', demo: '/lab.html#lab-social' },
  // تخطيط وتنقّل — لوحات الكِت (مدير الملفات/كانبان/الجدول)
  { name: 'DashboardLayout', label: 'هيكل لوحة', cat: 'layout', layer: 'pattern', desc: 'شريط جانبي + ترويسة + جسم.', demo: '/dashboardkit.html#analytics' },
  { name: 'PageHeader', label: 'ترويسة صفحة', cat: 'layout', layer: 'molecule', desc: 'عنوان + وصف + إجراءات.', demo: '/dashboardkit.html#kanban' },
  { name: 'NavItem', label: 'عنصر تنقّل', cat: 'layout', layer: 'molecule', desc: 'شريط جانبي أو لوحة بعدّاد.', demo: '/dashboardkit.html#files' },
  { name: 'Breadcrumb', label: 'فتات تنقّل', cat: 'layout', layer: 'molecule', desc: 'مسار هرمي، عناصر قابلة للنقر.', demo: '/dashboardkit.html#files' },
  { name: 'FilterBar', label: 'شريط فلترة', cat: 'layout', layer: 'molecule', desc: 'بحث + مرشّحات + إجراءات.', demo: '/dashboardkit.html#table' },
  { name: 'SearchField', label: 'حقل بحث', cat: 'layout', layer: 'molecule', desc: 'إدخال بحث باختصار لوحة مفاتيح.', demo: '/dashboardkit.html#files' },
  { name: 'CollapsibleSection', label: 'قسم قابل للطيّ', cat: 'layout', layer: 'molecule', desc: 'ترويسة تطوي محتواها.', demo: '/dashboardkit.html#files' },
  // تفاعل وتراكب
  { name: 'CommandPalette', label: 'لوحة أوامر (⌘K)', cat: 'overlay', layer: 'organism', desc: 'بحث وأوامر بالكيبورد.', demo: '/lab.html#lab-overlay' },
  { name: 'Popover', label: 'قائمة منبثقة', cat: 'overlay', layer: 'organism', desc: 'طبقة مرتكزة تُغلق بالنقر/Esc.', demo: '/lab.html#lab-overlay' },
  { name: 'Kanban', label: 'لوحة كانبان', cat: 'overlay', layer: 'organism', desc: 'أعمدة وبطاقات مهام.', demo: '/dashboardkit.html#kanban' },
  { name: 'TreeView', label: 'شجرة', cat: 'overlay', layer: 'organism', desc: 'عُقد قابلة للطيّ.', demo: '/lab.html#lab-media' },
  { name: 'Carousel', label: 'معرض شرائح', cat: 'overlay', layer: 'organism', desc: 'شرائح بتنقّل ومؤشّرات.', demo: '/lab.html#lab-media' },
  { name: 'CompareSlider', label: 'مقارنة قبل/بعد', cat: 'overlay', layer: 'organism', desc: 'مقبض سحب يكشف الطبقتين.', demo: '/lab.html#lab-media' },
  { name: 'Rating', label: 'تقييم نجوم', cat: 'overlay', layer: 'molecule', desc: 'تفاعلي أو للقراءة فقط.', demo: '/lab.html#lab-overlay' },
  { name: 'Skeleton', label: 'هيكل تحميل', cat: 'overlay', layer: 'atom', desc: 'عناصر نائبة أثناء التحميل.', demo: '/lab.html#lab-overlay' },
];
