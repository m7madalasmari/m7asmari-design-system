# تقرير M7 Dashboard Kit — كِت لوحات تحكّم (طبقة تشغيل فوق نظام التصميم)

> الكِت طبقة تشغيل فوق M7: **بلا هوية أو توكنز أو CSS خاصّ**. يستخدم مكوّنات/توكنز M7 لتوليد لوحات عربية RTL متعددة. أي ضعف ظهر أثناء البناء **عولِج في M7 core** لا في الكِت.

---

## 1. جدول الجرد (المتوقّع → الواقع → الإجراء)

| العنصر | كان في M7 | الإجراء |
|---|---|---|
| StatTile / FileRow / FolderItem / ActivityItem / NavItem / UserMenu / NotificationMenu / CollapsibleSection / Breadcrumb / SearchField / Pagination / Tabs | ✅ مكوّنات | أُعيد استخدامها كما هي |
| Field / Input / Textarea / Switch / Select / RadioGroup | ✅ مكوّنات (من Form Kit) | أُعيد استخدامها في وصفة الإعدادات (جسر Form Kit) |
| **رسوم بيانية** | ❌ مفقودة (فقط `.spark`/`.progress` و SVG اتجاه داخل StatTile) | **مكوّنات core جديدة** `Sparkline, BarChart, LineChart, DonutChart` (SVG/CSS بلا runtime، ألوان `--chart-*`) |
| **جدول بيانات** | ⚠️ markup خام `.tbl` + منطق فرز مبعثر في `app/App.jsx` | **مكوّن core** `DataTable` (يلفّ `.tbl` + يعيد استخدام `app/lib/sort.js` + يدمج `Pagination`) |
| **تخطيط لوحة قابل لإعادة الاستخدام** | ⚠️ `DashboardShell` مونوليث يأخذ `v` ضخمًا | **بدائيّة core** `patterns/DashboardLayout.jsx` (فتحات sidebar/header/children) |
| توكنز · light/dark · RTL | ✅ مكتملة | استُخدمت دون أي توكن جديد |

**الخلاصة:** M7 غني بمكوّنات اللوحة، لكن **التصوير البياني والجدول والتخطيط القابل لإعادة الاستخدام لم تكن مكوّنات** — أكبر الفجوات، عولِجت بإضافتها إلى core.

---

## 2. مسار الكِت + المعاينة

- **مدخل Vite:** `dashboardkit.html` → `app/dashboardkit.jsx` → `app/DashboardKitPage.jsx` (مُضاف لـ`vite.config.js`).
- **معاينة بلا Node:** `python3 scripts/build-dashboardkit-dev.py` → `dashboardkit.dev.html`.
- **العرض:** مبدّل segmented (`Tabs variant="seg"`) يعرض لوحة كاملة واحدة في كل مرة، مقودًا بـ`RECIPES`.

---

## 3. الوصفات (٤)

| الوصفة | تركّب |
|---|---|
| **لمحة تحليلية** | صفّ KPIs (`StatTile`) + `LineChart`/`BarChart`/`DonutChart` + نشاط (`ActivityItem`) داخل `DashboardLayout` |
| **جدول بيانات** | `DataTable` (فرز/ترقيم) + `SearchField` + `Select` + `Badge` |
| **مدير ملفات** | `DashboardLayout` (sidebar) + `NavItem`/`CollapsibleSection`/`FolderItem`/`FileRow`/`UserMenu` |
| **الإعدادات** | `Tabs` + حقول Form Kit (`Field`/`Input`/`Textarea`/`Switch`/`Select`/`RadioGroup`) — يجسر Form Kit مع اللوحة |

---

## 4. ما أُضيف إلى core

- **مكوّنات (5):** `components/charts/{Sparkline,BarChart,LineChart,DonutChart}.jsx` · `components/organisms/DataTable.jsx`.
- **نمط (1):** `patterns/DashboardLayout.jsx`.
- **CSS (توكنز فقط):** كتلة «Charts» في `styles/components.css` (`.chartbars/.chartbar*/.linechart/.chart-axis/.chart-xlabels/.donut*/.chart-legend*`) + modifier `.dashframe.auto`.
- **إعادة استخدام:** `app/lib/sort.js` (DataTable) · `Pagination` · مكوّنات Form Kit (الإعدادات).

> كل الإصلاحات في core بتوكنز فقط: لا hex خام (يفرضه `audit.py`)، لا توكنز جديدة، الرسوم تستهلك `--chart-1..8` القائمة.

---

## 5. الاختبارات والتدقيق

| الفحص | النتيجة |
|---|---|
| `python3 scripts/audit.py` | ✅ PASS (لا hex خام في الرسوم، لا `data-lucide`، `:focus-visible` سليم) |
| `audit:contrast` | ✅ نصوص المحاور/التسميات بـ`--text-*` تستوفي AA؛ تعبئات الرسوم زخرفية |
| Vitest | `test/charts.test.jsx` + `test/DataTable.test.jsx` (تُشغَّل في CI) |
| تحقّق بصري (Safari فاتح/داكن) | الوصفات الأربع + الرسوم + فرز الجدول + RTL |

---

## 6. تحديث v2 — كتالوج Widgets + صقل + تنوّع

أُعيد تأطير الكِت حول **كتالوج widgets محايد للمجال** (Core) بدل لوحات ثابتة. التفاصيل في [../WIDGETS.md](../WIDGETS.md).

- **Widgets Core جديدة:** `GoalCard · RingStat · Timeline · RankList · ProfileHeader · PageHeader · Toolbar · FilterBar` (molecules) · `Kanban` (organism) · `Legend` (charts).
- **صقل الرسوم:** LineChart (تحجيم منتظم + شبكة + نقاط + tooltip) · BarChart (قيم) · DonutChart (فجوة + Legend).
- **8 لوحات عبر مجالات:** Analytics · Store · DataTable · CRM · Profile · Files · Kanban · Settings (مصنّفة).
- **قائمة فجوات Core المكتشفة (أُصلِحت في Core):** (1) لا رسوم → charts؛ (2) لا DataTable؛ (3) DashboardShell مونوليث → DashboardLayout؛ (4) لا widgets لوحات → الكتالوج؛ (5) تفاوت زوايا/مقاس الحقول → توحيد `--input-radius`.

- **نمط الكِت القادم:** نفس المعمار — **Landing/Admin/Profile Kits** تركّب نفس الكتالوج؛ أي نقص يُصلَح في Core.
