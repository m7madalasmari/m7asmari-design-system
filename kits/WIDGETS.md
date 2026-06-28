# M7 Widget Catalog — لبنات لوحات محايدة للمجال

> مكوّنات **Core** عامّة تُركَّب في أي Kit/مشروع (تعليم · صحة · إدارة · تجارة · منتجات · CRM · HR).
> القاعدة: **نفس المكوّنات، بيانات وسياق مختلف فقط.** لا توكنز/هوية جديدة داخل أي Kit.

## المعمار (M7 Kits)
`M7 Core` (توكنز + أساسيّات + a11y + RTL/Dark) → **Core Widgets** (هذا الملف) → `Kits` (Dashboard/Form/…) → `Recipes` (تركيبات جاهزة) → `Domain Examples` (نفس الوصفة ببيانات قطاع مختلف).

**مبادئ:** أي Widget قابل لإعادة الاستخدام يعيش في Core؛ أي مثال خاص بمجال يعيش في Kit Recipe؛ أي فجوة في Core تُصلَح في Core لا تُرقَّع في الكِت.

---

## الكتالوج

| Widget | المسار | أبرز الخصائص | أمثلة مجالية |
|---|---|---|---|
| **StatTile** | `components/molecules/StatTile.jsx` | `icon,value,label,delta,trend,color` | إيراد · مرضى اليوم · طلاب نشطون |
| **Sparkline** | `components/charts/Sparkline.jsx` | `data:number[], color` | اتجاه سريع داخل صفّ |
| **LineChart** | `components/charts/LineChart.jsx` | `data:{label,value}[], color` | إيراد/حضور عبر الزمن |
| **BarChart** | `components/charts/BarChart.jsx` | `data:{label,value,color?}[], showValues` | مقارنات فئات |
| **DonutChart** | `components/charts/DonutChart.jsx` | `segments:{label,value,color}[], gap, centerLabel` | توزيع حالات |
| **Legend** | `components/charts/Legend.jsx` | `items:{label,value?,color}[], column` | وسيلة إيضاح أي رسم |
| **StackedBarChart** | `components/charts/StackedBarChart.jsx` | `series:{key,label,color?}[], data:{label,[key]:n}[]` | إيراد حسب القناة شهريًا · تركيب عبر الفئات |
| **MultiLineChart** | `components/charts/MultiLineChart.jsx` | `series:{label,color?,data:{label,value}[]}[]` | مقارنة فترتين/سلاسل عبر الزمن |
| **BulletChart** | `components/charts/BulletChart.jsx` | `label,value,target,ranges:{value,color?}[],max` | أداء مقابل هدف ونطاقات (KPI مرجعيّ) |
| **WaterfallChart** | `components/charts/WaterfallChart.jsx` | `data:{label,value,type?}[]` (`type:'total'`) | تفكيك التغيّر (مساهمات +/-) |
| **CompareStat** | `components/molecules/CompareStat.jsx` | `label,value,prev,unit,color` | الحالي مقابل السابق (% تغيّر + شريطا مقارنة) |
| **TrendStat** | `components/molecules/TrendStat.jsx` | `label,value,delta,trend,data:number[],color` | رقم + خطّ اتجاه مدمج |
| **DistributionBar** | `components/molecules/DistributionBar.jsx` | `segments:{label,value,color?}[], showLegend` | تركيب/حصص 100% (مصادر زيارات · توزيع حالات) |
| **MetricGrid** | `components/molecules/MetricGrid.jsx` | `rows:{label,value,prev?,unit?,data?,color?}[]` | جدول مقارنة عدّة مؤشّرات بنظرة واحدة |
| **DataTable** | `components/organisms/DataTable.jsx` | `columns:{key,label,align,num,sortable,render}[], rows, pageSize` | معاملات · مواعيد · درجات · مخزون |
| **GoalCard** | `components/molecules/GoalCard.jsx` | `label,value,target,unit,icon,color` | هدف مبيعات · حضور · سعة أسرّة |
| **RingStat** | `components/molecules/RingStat.jsx` | `value,max,label,color` | إشغال · اكتمال · استخدام |
| **Timeline** | `components/molecules/Timeline.jsx` | `items:{title,desc?,time?,icon?,color?}[]` | تتبّع طلب · تاريخ مريض · مراحل |
| **RankList** | `components/molecules/RankList.jsx` | `items:{name,value,sub?,avatar?,color?}[], showBar` | أفضل منتجات · أعلى طلاب |
| **ProfileHeader** | `components/molecules/ProfileHeader.jsx` | `name,subtitle,avatar,meta:{icon?,label}[],actions` | طالب/مريض/عميل/موظّف |
| **PageHeader** | `components/molecules/PageHeader.jsx` | `title,subtitle,actions` | رأس أي صفحة |
| **Toolbar** | `components/molecules/Toolbar.jsx` | `children` (+`.f1` فاصلًا) | شريط إجراءات |
| **FilterBar** | `components/molecules/FilterBar.jsx` | `query,onQuery,filters[],actions` | بحث + فلاتر لأي جدول/قائمة |
| **Kanban** | `components/organisms/Kanban.jsx` | `columns:{id,title,color?,cards[]}[]` | مهام · حالات طلبات · مراحل قبول |
| **DashboardLayout** | `patterns/DashboardLayout.jsx` | `sidebar?,header?,children` (+`className="auto"`) | إطار لوحة بفتحات |

أساسيّات Core تُكمّل الكتالوج: `Card · Badge · Avatar · Button · EmptyState · NavItem · FolderItem · FileRow · ActivityItem · CollapsibleSection · Pagination · Tabs · Modal · Drawer · حقول النماذج (Field/Input/Select/Switch/RadioGroup…)`.

---

## كتالوج موسّع — عائلات متنوّعة (لتفادي تكرار الأرشيتايب)
لضمان التنوّع، أُضيفت عائلات مكوّنات كانت غائبة (تجاوز بطاقات/قوائم الإحصاء):

| العائلة | المكوّنات | المسار |
|---|---|---|
| **تصوّر بياني مبتكر** | `Heatmap` · `Gauge` (نصف-دائري) · `Funnel` (قمع تحويل) | `components/charts/` |
| **وسائط ومحتوى** | `CompareSlider` (قبل/بعد) · `Carousel` · `TreeView` | `components/organisms/` |
| **تواصل واجتماعي** | `AvatarGroup` (+N) · `ChatThread` (RTL) · `ContactCard` | `components/molecules/` |
| **تراكب وتفاعل/لمسات** | `CommandPalette` (⌘K) · `Popover` · `Rating` · `Skeleton` | `organisms/` + `molecules/` + `atoms/` |

كلها RTL-aware، توكنز فقط، تدعم الوضع الداكن، وقابلة لإعادة الاستخدام في أي مجال. معرض حيّ: `lab.html` (`app/LabPage.jsx`).

## التركيب لأي مشروع (مثال)
نفس الـwidgets، بدّل البيانات فقط:

```jsx
// لوحة تعليمية = ProfileHeader(طالب) + StatTile(مقرّرات/معدّل) + GoalCard(إنجاز) + Timeline(درجات)
// لوحة طبية   = ProfileHeader(مريض) + StatTile(مواعيد) + Timeline(تاريخ مرضي) + DataTable(فحوص)
// لوحة تجارة  = StatTile(مبيعات) + LineChart(إيراد) + RankList(أفضل منتجات) + DataTable(طلبات)
<DashboardLayout header={<PageHeader title="…" actions={…} />}>
  <div className="grid cols4">{kpis.map(k => <StatTile key={k.id} {...k} />)}</div>
  <DashboardCard title="…"><LineChart data={series} /></DashboardCard>
</DashboardLayout>
```

القاعدة: لا CSS/توكنز في الكِت — كل التنسيق من Core. أمثلة عاملة في [kits/dashboard/recipes/](dashboard/recipes/).

---

## فجوات M7 Core المكتشفة (أُصلِحت في Core)
بناء Dashboard Kit كشف فجوات عولِجت **في Core** (تفيد كل Kit لاحقًا):
1. لا مكوّنات رسوم → أُضيف `components/charts/{Sparkline,BarChart,LineChart,DonutChart,Legend}`.
2. لا `DataTable` (جداول markup خام + منطق فرز مبعثر) → مكوّن `DataTable` يعيد استخدام `app/lib/sort.js` + `Pagination`.
3. `DashboardShell` مونوليث → بدائيّة `patterns/DashboardLayout` بفتحات.
4. لا widgets لوحات (تقدّم/خط زمني/ترتيب/رأس كيان/كانبان/فلاتر/رأس صفحة) → أُضيفت في `components/`.
5. تفاوت زوايا/مقاس حقول النماذج → توحيد على `--input-radius` + حشو موحّد.
