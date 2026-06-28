# سجل التغييرات — M7asmari Design System

## 2026-06-28 — هيكل صفحات موحّد: هيدر مشترك + كتالوج + صفحة رئيسية (هاب)

طبقة تنقّل واحدة فوق كل صفحات MPA (تطبيق مهارة `m7-pages`) — بلا هوية/توكنز جديدة، بإعادة استخدام أصناف الهيدر/الفتات القائمة:

- **`app/chrome/AppHeader.jsx`** — هيدر موحّد بديل عن ثلاثة هيدرات inline: الشعار → الرئيسية، قائمة المجموعات (`app/chrome/KitsMenu.jsx`)، الكتالوج، المختبر، قائمة التوثيق (`app/chrome/DocsMenu.jsx`)، تبديل سمة محفوظ في `localStorage` (`app/lib/useTheme.js`)، و⌘K في كل الصفحات (`app/lib/navCommands.js`).
- **`components/molecules/Breadcrumb.jsx`** — دعم عناصر `{label, href}` قابلة للنقر (متوافق رجعيًا).
- **تنقّل الوصفات** موحّد بين Form/Dashboard: مبدّل داخل الصفحة + رابط `#hash` عميق قابل للمشاركة.
- **`app/CatalogPage.jsx` (`/catalog`)** — كتالوج widgets النواة قابل للبحث، مميَّز صراحةً عن وصفات الـKits (`app/catalog-data.js`).
- **`app/HomePage.jsx` (`/`)** — صفحة رئيسية (هاب) ببطاقات الطبقات؛ نُقل عرض النظام إلى `/core` (`core.html`). حُذف `app/chrome/TopBar.jsx` اليتيم.
- **النتيجة:** 154 اختبارًا ✅ · بناء كل المداخل ✅ · تحقّق بصري Light (الهاب/الكتالوج/اللوحات/المختبر)؛ الصفحات الجديدة توكنز فقط (دارك آمن بإعادة الاستخدام).

## 2026-06-28 — توسيع عائلة الإحصاء: طبقة تحليلية أعمق (Core)

أربع أفكار تحليلية متمايزة أُضيفت في **Core** (لا في الكِت)، توكنز فقط، RTL، فاتح/داكن:

- **`components/charts/MultiLineChart.jsx`** — خطّ متعدّد السلاسل لمقارنة اتجاهات على محور مشترك (`series:{label,color?,data}[]`).
- **`components/charts/BulletChart.jsx`** — أداء «قيمة مقابل هدف» على نطاقات كيفية، محاذاة منطقية `inset-inline` (RTL).
- **`components/charts/WaterfallChart.jsx`** — تفكيك التغيّر بمساهمات +/- وأعمدة إجمالي (`type:'total'`).
- **`components/molecules/MetricGrid.jsx`** — جدول مقارنة عدّة مؤشّرات (قيمة/تغيّر/اتجاه) بنظرة واحدة، يدمج `Sparkline`.
- **تثبيت في وصفة حقيقية:** وصفة جديدة `kits/dashboard/recipes/ExecutiveDashboard.jsx` («لمحة تنفيذية») تستخدم الأربعة فعليًا فوق `DashboardLayout`/`DashboardCard` (مكوّنات M7 القائمة فقط) — مُسجّلة في `kits/dashboard/index.js` (٩ لوحات الآن)، بياناتها في `kits/dashboard/data.js`. أُضيف معامل `?recipe=` لمعاينة اللوحات.
- **العرض:** قسم «تحليلات أعمق» في `app/LabPage.jsx`. **اختبارات:** موسّعة في `test/statistics.test.jsx`. **النتيجة:** `npm run audit` ✅ · `audit:contrast` ✅ · تحقّق بصري Light/Dark.

## 2026-06-28 — تصحيح اتجاه التنوّع: إحصاء وأفكار، لا مؤثّرات

تراجُع عن طبقة الحركة/المؤشّر التجريبية (إمالة 3D، توهّج يتبع المؤشّر، احتفال عند النقر) — قُيّمت بأنها **غير متّزنة** ولا تليق بنظام جادّ. التنوّع أُعيد توجيهه إلى **عرض الإحصاء والأفكار** لا إلى التأثيرات.

- **حُذف:** `TiltCard` · `SpotlightCard` · `MagneticButton` · `Reveal` · `CountUp` · `app/lib/confetti.js` وكامل CSS المرتبط بها (tiltcard/spotlight/magnetic/confetti/chero/glow/draw-line). أُزيلت خاصية `animate` (رسم تدريجي) من `LineChart` واللوحات.
- **عائلة إحصاء جديدة (Core، أفكار متمايزة لعرض البيانات):** `components/molecules/{CompareStat (الحالي مقابل السابق), TrendStat (رقم + Sparkline مدمج), DistributionBar (تركيب 100%)}.jsx` · `components/charts/StackedBarChart.jsx` (أعمدة متراكمة). كلها توكنز فقط، RTL، فاتح/داكن.
- **مختبر المكوّنات:** hero هادئ + قسم «تنوّع الإحصاء» يجمع KPI · مقارنة · اتجاه · تقدّم/هدف · نسبة دائرية · مقياس · تركيب · أعمدة متراكمة · خريطة حرارية — كل فكرة تجيب سؤالًا مختلفًا عن البيانات.
- **إصلاح ضمنيّ:** التوكن `--dur-normal` (غير معرَّف) في `chartbar`/`funnel-bar`/`carousel-slide` → `--dur`؛ كانت انتقالاتها فوريّة بلا مدّة.
- **توثيق/اختبارات:** [kits/WIDGETS.md](kits/WIDGETS.md) · `test/statistics.test.jsx`. **النتيجة:** `npm run audit` ✅ · تحقّق بصري Light/Dark.

## 2026-06-28 — تنويع مكتبة المكوّنات: عائلات جديدة + مختبر مكوّنات

معالجة «التكرار وقلّة الابتكار»: المكتبة كانت مركّزة في عائلة واحدة (بطاقات/قوائم إحصاء). أُضيفت **عائلات widgets غائبة** في Core لضمان التنوّع — RTL، توكنز فقط، فاتح/داكن.

- **تصوّر بياني مبتكر:** `components/charts/{Heatmap, Gauge (نصف-دائري), Funnel}.jsx`.
- **وسائط ومحتوى:** `components/organisms/{CompareSlider (قبل/بعد), Carousel, TreeView}.jsx`.
- **تواصل واجتماعي:** `components/molecules/{AvatarGroup, ChatThread, ContactCard}.jsx`.
- **تراكب وتفاعل/لمسات:** `components/organisms/{CommandPalette (⌘K), Popover}.jsx` · `components/molecules/Rating.jsx` · `components/atoms/Skeleton.jsx`.
- **مختبر المكوّنات:** صفحة `lab.html` (`app/LabPage.jsx`) تعرض العائلات الأربع حيّةً + مدخل Vite + `scripts/build-lab-dev.py` + رابط في TopBar.
- **توثيق/اختبارات:** كتالوج موسّع في [kits/WIDGETS.md](kits/WIDGETS.md) · `test/lab-widgets.test.jsx`. **النتيجة:** `npm run audit` ✅ · `audit:contrast` ✅ · تحقّق بصري Light/Dark.

## 2026-06-28 — Dashboard Kit v2: كتالوج Widgets محايد للمجال + صقل + تنوّع

تحويل Dashboard Kit من 4 لوحات ثابتة إلى **كتالوج widgets عامّ في Core** + 8 لوحات متنوّعة عبر مجالات (تعليم/صحة/تجارة/إدارة/مبيعات). المبدأ: نفس المكوّنات، بيانات مختلفة — **بلا توكنز/هوية جديدة في الكِت**؛ الفجوات تُصلَح في Core.

- **Widgets جديدة (Core):** `components/molecules/{GoalCard,RingStat,Timeline,RankList,ProfileHeader,PageHeader,Toolbar,FilterBar}.jsx` · `components/organisms/Kanban.jsx` · `components/charts/Legend.jsx`. كلها محايدة للمجال (CSS بتوكنز فقط).
- **صقل الرسوم:** `LineChart` تحجيم منتظم بلا تشوّه + شبكة خفيفة + نقاط + tooltip؛ `BarChart` قيم فوق الأعمدة؛ `DonutChart` فجوة بين القطع (`gap`) + `Legend` موحّد.
- **8 لوحات (Recipes) عبر مجالات:** Analytics (SaaS) · Store/Orders (تجارة) · DataTable (مالي) · CRM (مبيعات) · Profile (تعليم/HR) · Files (محتوى) · Kanban (مهام) · Settings (حساب) — مصنّفة في [kits/dashboard/index.js](kits/dashboard/index.js)، بيانات متعددة المجالات في [kits/dashboard/data.js](kits/dashboard/data.js).
- **العرض:** [app/DashboardKitPage.jsx](app/DashboardKitPage.jsx) مبدّل مجمَّع حسب الفئة (4 فئات × لوحتان). تباين في الإطار (لوحات بإطار محاط وأخرى بلا).
- **توثيق:** [kits/WIDGETS.md](kits/WIDGETS.md) (كتالوج + دليل تركيب لأي مشروع + قائمة فجوات Core). **النتيجة:** `npm run audit` ✅ · `audit:contrast` ✅ · اختبارات `widgets`/`charts`/`DataTable` (CI) · تحقّق بصري Light/Dark.

## 2026-06-28 — Dashboard Kit (طبقة تشغيل لوحات تحكّم فوق M7)

كِت لوحات عربية RTL/داكن كطبقة فوق M7 — **بلا هوية/توكنز/CSS خاصّة**؛ الفجوات الثلاث التي كشفها الكِت عولِجت في **core** (تفيد ما بعده).

- **رسوم بيانية (core جديد):** `components/charts/{Sparkline,BarChart,LineChart,DonutChart}.jsx` — SVG/CSS بلا مكتبة runtime، ألوان `--chart-1..8`، `role="img"` + `aria-label`. (كانت الفجوة الأكبر؛ لم يكن في core سوى `.spark`/`.progress`.)
- **`DataTable` (core جديد):** `components/organisms/DataTable.jsx` — يلفّ `.tbl/.tablewrap/.sortable`، يعيد استخدام `app/lib/sort.js` ويدمج `Pagination` (فرز + ترقيم داخليّان، `aria-sort`).
- **`DashboardLayout` (نمط جديد):** `patterns/DashboardLayout.jsx` — إطار بفتحات (sidebar/header/children) بديلًا عن مونوليث `DashboardShell`؛ modifier `.dashframe.auto` لارتفاع مرن.
- **الكِت `kits/dashboard/`:** registry + بيانات عرض + 4 وصفات — لمحة تحليلية · جدول بيانات · مدير ملفات · إعدادات (تجسر Form Kit).
- **العرض/البناء:** `app/DashboardKitPage.jsx` (مبدّل `Tabs` segmented)، `app/dashboardkit.jsx`، `dashboardkit.html`، مدخل في `vite.config.js`، `scripts/build-dashboardkit-dev.py`، ورابط في `app/chrome/TopBar.jsx`.
- **CSS (توكنز فقط):** كتلة «Charts» في `styles/components.css`. **النتيجة:** `npm run audit` ✅ · `audit:contrast` ✅ · اختبارات `charts`/`DataTable` (CI) · تحقّق بصري Light/Dark.

## 2026-06-28 — توحيد الأيقونات وتقوية التركيز (Icon Consolidation + Focus Hardening)

تقوية core قبل الكِت القادم — **بلا توكنز/هوية جديدة**. مصدر أيقونات واحد بلا مكتبة runtime، وتغطية تركيز كاملة للعناصر ذات الأدوار المخصّصة، مع حرّاس تدقيق ضد الانحدار.

- **مصدر أيقونات موحّد:** وُسِّع مكوّن **`Icon.jsx`** إلى 46 أيقونة (مسارات Lucide ضمنيّة) وأضيف خطّاف هويّة ثابت **`data-icon={name}`**. رُحِّل **كل** استخدامات `<i data-lucide>` (مكوّنات core + chrome + الأنماط + أقسام المعرض) إلى `<Icon>`.
- **إسقاط lucide runtime:** حُذف `window.lucide.createIcons()` من `App.jsx`، ووسوم `lucide.min.js` من `index.html`/سكربتات `build-dev`/`build-formkit-dev`، وملفّا **`vendor/lucide.min.js`** و**`public/vendor/lucide.min.js`**. لا اعتماد على مكتبة أيقونات وقت التشغيل (موثوق في React الديناميكي بلا فحص DOM).
- **توست الإشعارات:** قواعد إظهار الأيقونة حسب الحالة تعتمد الآن `[data-icon="…"]` بدل أصناف `.lucide-*` المحقونة سابقًا.
- **`:focus-visible`:** أُضيف **`.selectbox`** صراحةً لقاعدة حلقة التركيز الموحّدة (كان مغطّى ضمنيًا عبر `[tabindex]` فقط). `.radio`/`.menuitem` غير قابلَين للتركيز (نقطة بصرية / تنقّل بصنف `.active`) فلا حلقة لهما — بقرار مبني على البنية.
- **حرّاس Audit (`scripts/audit.py`):** قاعدتان HARD FAIL جديدتان — (٦) منع رجوع `data-lucide` في الكود، (٧) التأكّد أن كل عنصر تفاعلي بدور مخصّص (`cbx/switch/selectbox/tab/ttab/sideitem/dashcat`) له `:focus-visible`.
- **النتيجة:** `npm run audit` ✅ PASS · `npm run audit:contrast` ✅ PASS (بلا تغيير ألوان) · Vitest محدّث (`dashboard-components` يؤكّد على `[data-icon]`) · معاينات بلا Node أُعيد توليدها بلا lucide · تأكيد بصري Light/Dark.

## 2026-06-27 — تمرير موثوقية الثيم (Theme Reliability Pass)

تدقيق وإصلاح **تباين Light/Dark** واستخدام التوكنز داخل المكوّنات/الأقسام — **إصلاح استخدام، بلا تغيير بنيوي ولا مزايا**. أُضيف مدقّق تباين منطقي يحلّ كل توكن إلى لونه الفعلي في الوضعين ويحسب WCAG.

- **`scripts/contrast.py`** + **`npm run audit:contrast`** — يفحص ~38 زوج نص/خلفية في Light وDark مقابل WCAG AA.
- **إصلاحات تباين (طبقة التوكنز، قيمة-محفوظة الطابع):** عُمّق `--success-ink` (→800) و`--danger-ink` (→700) ونصوص التنبيهات (ok/warn) لتجاوز AA على الخلفيات الناعمة؛ فُتِّح `--text-tertiary` في الدارك (`#83807a→#9a948c`) لرفع تباين النص الثانوي/placeholder/ترويسة الجدول. **10 أزواج كانت دون AA → الآن 0.**
- **اندماج الدارك:** خلفيات الصور النائبة (`.ph`/`.fcard-img`) كانت بـpastel ثابت (`#e1f4ff/#e0f7ed/#fdf0d8`) لا يندمج في الدارك → رُبطت بـ`--brand/-success/-warning-soft` (متجاوبة مع السمة). `DarkModeSection` كان يستخدم `#2e2e34/#27272c` خام → `var(--border)/var(--surface-muted)`.
- **تأكيد:** زرّ العلامة (نص داكن على أزرق) = **6.33:1 — متاح**؛ النص الأبيض عليه 2.7 (فاشل) — أُبقي الداكن عمدًا. الألوان المتبقّية في JSX (avatars/كيانات/مقاييس العرض) **بيانات زخرفية مقصودة** بلا مشكلة تباين.
- **🔴 إصلاح جذري للوضع الداكن (من فحص بصري):** توكنز المكوّنات كانت مُعرّفة `var(--semantic)` داخل `:root` فقط، فتُحسب مرّة على قيم الفاتح وتُجمَّد (سلوك CSS) ولا تتبع `.dark` ⇒ **بطاقات/حقول بيضاء ونص فاتح غير مقروء في الداكن**. الحلّ: تعريف الطبقة على `:root, .dark` معًا فتُعاد حلّها مقابل دلاليّات الدارك. تأكيد بصري عبر لقطة (Safari) — البطاقات تندمج والنص واضح.
- **أزرار الإجراء (قرار المالك):** العلامة/حذف كانتا «لون زاهٍ + نص داكن» (تمرّ AA لكن غير واضحة كـإجراء) → الآن **نص أبيض + تعميق اللون** (العلامة `brand-700` 5.9:1 · حذف `danger-600` 5.1:1). اللون الزاهي يبقى للشارات/الروابط/التركيز.
- **مدقّق التباين:** دُعِم المُحدِّد المركّب `:root, .dark` + إزالة التعليقات قبل التحليل.
- **النتيجة:** Build ✅ · `npm run audit` ✅ PASS · `npm run audit:contrast` ✅ PASS (كل الأزواج AA في الوضعين) · تحويل+تشغيل JSC ✅ · تأكيد بصري للوضعين ✅.

## 2026-06-27 — تنظيف معماري شامل (System Architecture Cleanup)

إعادة تنظيم بنيوية للنظام: **توكنز بأربع طبقات وأسماء دلالية، معمارية مكوّنات ذرّية، ونظام Audit** — **بلا مزايا/مكوّنات جديدة وبلا إعادة تصميم**. كل إعادة تسمية لون **قيمة-محفوظة** (لا فرق بصري) عدا تغييرين محدودين مبرّرين موثّقين.

### 1) معمارية التوكنز — 4 طبقات
استُبدل `tokens.css` + `themes.css` بأربعة ملفات: **`primitive.css`** (مقاييس خام) → **`semantic.css`** (مفردات دلالية + `.dark`/`.acc-*`/`.sharp`) → **`component.css`** (توكنز المكوّنات) → **`pattern.css`** (مسافات دلالية + تخطيط). أُعيد توصيل ترتيب التحميل في `main.jsx`/`theme-builder.jsx`/`requests.jsx`/`build-dev.py`. الدليل: [`TOKENS.md`](TOKENS.md).

### 2) توحيد الأسماء (شكلية → وظيفية) — 617 استبدالًا قيمة-محفوظًا في 19 ملفًا
`--sky→--brand` · `--emerald→--success` · `--amber→--warning` · `--red→--danger` · `--cat→--chart` · `--ink→--text-primary` · `--canvas→--background` · `--surface-2/3→--surface-muted/raised` · `--border-2→--border-strong` · `--r-*→--radius-*` · `--sh-*→--shadow-*` · `--brand-2→--accent-2`. أُضيف **`--info`** و**`--brand-hover`** وسلالم **`--space-*`/`--text-*`/`--leading-*`/`--weight-*`**.

### 3) إزالة تسرّب الـprimitives والـhex من المكوّنات
ألوان الفئات (folder/file/stat) → `--chart-*`؛ توكنز المكوّنات السبعة (btn/card/input/table/badge/alert/nav) → `component.css`؛ نُقلت كل قيم hex الخام (حدود/نصوص التنبيهات، `#000`/`#1b1b19`/`#d8d4cc`، Banner/Code) إلى طبقة التوكنز. لم يبقَ في `styles/` سوى `#fff` (نص على تعبئات).

### 4) Typography / Spacing / Motion / z-index
رُبطت أصناف `.t-*` بمقاييس `--text/-leading/-weight-*`؛ المسافات الهيكلية (page/section/card) بـ`--space-*` الدلالية؛ المدد المطابقة تمامًا بتوكنز `--dur-*`؛ z-index الشريط العلوي بـ`--z-sticky`.

### 5) معمارية المكوّنات — ذرّي
`components/` → **`atoms/`(8) · `molecules/`(11) · `organisms/`(7)**؛ حُدِّثت ≈220 مسار استيراد + ملفات الاختبار + `build-dev.py` (مسح تعاودي). توحيد سطح البطاقات المكرّر (`panel/statcard/pcard/swcard`) عبر `--card-*`.

### 6) نظام Audit
**`scripts/audit.py`** + **`npm run audit`** (بايثون، بلا Node). يفشل على: توكنز قديمة · primitive داخل المكوّنات · hex خام في الأنماط · استيراد مكسور · أسماء غير دلالية. يحذّر (backlog): مسافات/حركة خارج السلّم، خصائص RTL فيزيائية (61 موضعًا). **النتيجة الحالية: ✅ PASS.**

### 7) التصدير الطبقي
`themeTokens.js` يُخرج الآن **CSS Variables** و**JSON** بهيكلة `primitive/semantic/component` (schema `v2`). حُدِّثت الاختبارات المتأثّرة (themeTokens / ThemeBuilder / dashboard) للأسماء والبنية الجديدة.

### تغييرات بصرية مبرّرة (محدودة)
- `.topbar` z-index `30 → var(--z-sticky)` (تصحيح طبقات).
- إلصاق 3 مدد حركة (`.12s/.18s/.32s`) بتوكنز مساوية القيمة (بلا فرق محسوس).

### تحقّق
`python3 build-dev.py` ✅ · محلّل استيراد (220 مسارًا) ✅ · `npm run audit` ✅ PASS. **ملاحظة:** Node غير متوفّر في بيئة التنفيذ، فلم تُشغَّل `vitest`/`vite build` — يُنصح بتشغيل `npm run test:run` و`npm run build` للتأكيد النهائي (الاختبارات حُدِّثت لتطابق الأسماء الجديدة).

## 2026-06-27 — فصل مُخصِّص السمة إلى صفحة مستقلة (Vite MPA)

نُقل محرّك التخصيص من قسم مدمج في صفحة العرض إلى **صفحة مستقلة بعنوان URL خاص** — أنظف لأداة تفاعلية، ويتفادى تعارض التوجيه مع روابط `#section-id` في شريط التنقّل.

- **`theme-builder.html`** (جذر) + **`app/theme-builder.jsx`** (مدخل ثانٍ) + **`app/ThemeBuilderPage.jsx`** (هيكل صفحة خفيف: ترويسة + رابط رجوع + `ThemeBuilderSection`).
- **`vite.config.js`** — مدخلان عبر `build.rollupOptions.input` (MPA، بلا مكتبة توجيه). `vite build` ينتج `dist/index.html` و`dist/theme-builder.html`.
- صفحة العرض: حُذف القسم المدمج وعنصر التنقّل، وأُضيفت **بطاقة CTA بارزة** بعد الـHero تقود إلى `/theme-builder.html`.
- النشر: `netlify.toml` يخدم الملفات الحقيقية قبل تحويل الـSPA، فـ`/theme-builder.html` يعمل دون تغيير. `ThemeBuilderSection` يبقى مصدرًا واحدًا يُعاد استخدامه. الاختبارات: **+2** (الإجمالي 80).
- ملاحظة: معاينة الـno-Node (`index.dev.html`) تظلّ للصفحة الرئيسية؛ الصفحة المستقلة تُعايَن عبر Vite (`npm run dev` / `dist`).

## 2026-06-27 — المرحلة الثالثة: محرّك التخصيص (Theme Builder + معاينة حيّة)

إضافة **مُخصِّص السمة** — لوحة تتيح لأي مستخدم تخصيص النظام عبر **متغيّرات CSS** ومعاينة فورية، دون كسر اتساق M7 أو تعديل المكوّنات. **إضافات فقط — لا refactor، ولا تبعيات خارجية.**

### ما الذي أُضيف
- **`app/lib/themeTokens.js`** — محرّك خالص قابل للاختبار: مشتقّات ألوان (HSL يدوي، بلا تبعيات) + جداول أنماط (radius/density/font/motion) + `buildThemeTokens` + مُصدّرات `tokensToCss`/`tokensToJson`.
- **`sections/reference/ThemeBuilderSection.jsx`** — قسم قائم بذاته يدير حالته (`useState` + `localStorage`)، يطبّق المتغيّرات على حاوية المعاينة فتتدفّق لكل مكوّناتها.
- **`styles/theme-builder.css`** — طبقة مُضافة: واجهة اللوحة + معدِّلات **مقصورة على `.tb-preview`** (الكثافة/نمط البطاقة/نمط الزر/إيقاف الحركة) — لا تمسّ أصناف المكوّنات عالميًا.

### خيارات التخصيص (10)
لون أساسي · لون ثانوي · الوضع (فاتح/داكن) · الحوافّ (حادّ/ناعم/مستدير/حبّة) · الكثافة (متراصّ/مريح/فسيح) · نمط البطاقة (محدّد/مملوء/مرتفع/مبسّط) · نمط الزر (صلب/ناعم/محدّد/شبحي) · شخصية الخط (رسمي/ودود/تحريري/تقني) · الحركة (بلا/خفيف/سلس) · تصدير الرموز (CSS + JSON).

### كيف تُطبَّق
- **مُرمَّز بالكامل** (ينعكس تلقائيًا): اللون/الحوافّ/الخط/الحركة → متغيّرات `--brand*`، `--r-*`، `--font-*`، `--dur*` على حاوية المعاينة (الـinline style يتفوّق على `.dark`).
- **يحتاج قاعدة مقصورة** (الحشوة/التعبئة غير مُرمَّزة في النظام الأصلي): الكثافة/البطاقة/الزر/إيقاف الحركة → أصناف على `.tb-preview` + قواعد في `theme-builder.css`.
- الوضع الداكن = صنف `dark` على المعاينة (يعيد استخدام تجاوزات `.dark` القائمة).

### المعاينة الحيّة
أزرار · حقول + نموذج · بطاقات + StatCard · شارات + لون ثانوي · تنبيهات · جدول · حالة فارغة.

الحفظ في `localStorage` (مفتاح `m7-theme-builder`) + إعادة ضبط + نسخ CSS/JSON. الاختبارات: **+20** (الإجمالي 78؛ منها 12 لمحرّك الرموز و8 للقسم). اختبار الدخان للتطبيق الكامل يبقى خاليًا من تحذيرات console.

## 2026-06-27 — توحيد المكوّنات المكرّرة (Search · Breadcrumb · NavItem)

توحيد ثلاث حالات تكرار على **طبقة Component** بمتغيّرات (variants) — بلا تغيير بصري (نفس الأصناف/الماركب لكل متغيّر):

- **`SearchField`** — يوحّد `.search` و`.dashsearch`. `variant="pill"|"dash"` + `shortcut` اختياري؛ الإدخال قابل للتهيئة بالكامل عبر تمرير الخصائص. (استُبدل في: SearchSlider، Combobox، DashboardShell)
- **`Breadcrumb`** — يوحّد `.breadcrumb` و`.dashcrumb`. `items` + `leadingIcon` اختياري + `variant="dash"` (فاصل chevron). (استُبدل في: NavSection، DashboardShell)
- **`NavItem`** — يوحّد `.sideitem` و`.dashcat`. `variant="rail"|"panel"` + `count` اختياري؛ **حلّ محلّ `SidebarItem`** (حُذف). (استُبدل في: NavSection، DrawerSection، DashboardShell)

**StatCard و StatTile تُركا منفصلين** عمدًا (بنيتان مختلفتان: sparkline مقابل أيقونة+اتجاه). الاختبارات: 58 (محدّثة لـNavItem). يبقى التكرار اللوني عبر التوكنز (موحّد أصلًا).

## 2026-06-27 — استخراج مكوّنات لوحة التحكّم القابلة لإعادة الاستخدام

فُكِّكت قطع `DashboardShell` الداخلية إلى **8 مكوّنات عرضية مستقلّة بـAPI نظيف** (تحسب تنسيقها من `color`/booleans) — بلا تغيير بصري (نفس الأصناف والماركب):

`StatTile` · `FileRow` · `FolderItem` · `ActivityItem` · `SidebarItem` · `UserMenu` · `NotificationMenu` · `CollapsibleSection`.

- `_dashVals` بُسِّط ليمرّر بيانات خام (color/booleans) بدل تنسيقات محسوبة مسبقًا؛ المكوّنات تحسب `color-mix`/أصناف الحالة داخليًا.
- `DashboardShell` صار تركيبًا واضحًا من المكوّنات بدل markup مضمّن طويل.
- وصولية إضافية: `aria-label` لأزرار الأيقونات (المستخدم/المجلّد/البحث)، و`aria-current` لعنصر الشريط النشط.
- اختبارات: **+9** للمكوّنات الجديدة (الإجمالي 57). يبقى التكرار مع `breadcrumb`/`search`/`StatCard` موثّقًا كفرصة توحيد لاحقة.

## 2026-06-27 — المرحلة الثانية: تقوية النظام (مكوّنات قابلة لإعادة الاستخدام + وصولية + اختبارات)

تحويل النظام من «موقع عرض» إلى نظام تصميم أقرب للاستخدام الحقيقي — **بلا أي تغيير في الهوية البصرية**.

### مكوّنات قابلة لإعادة الاستخدام (جديدة في `components/`)
استُخرجت الحالة والمنطق من `App.jsx` إلى مكوّنات قائمة بذاتها تدير حالتها داخليًا (`useState`)، بـAPI واضح، مع الحفاظ على نفس الأصناف والمظهر:

| المكوّن | API مختصر |
|---|---|
| `Modal` | `open · onClose · labelledBy · describedBy · ariaLabel` |
| `Drawer` | `open · onClose · placement(left\|right\|bottom) · ariaLabel · labelledBy` |
| `Tabs` | `variant(pill\|seg\|und) · tabs[{id,label,panel?}] · defaultActive · showPanel · ariaLabel` |
| `Accordion` | `items[{id,icon,title,body}] · defaultOpen · allowToggle` |
| `OtpInput` | `length · status · onChange · onComplete · label` |
| `Slider` | `value · onChange · min · max · step · ariaLabel` |
| `Pagination` | `total · defaultPage · onChange · ariaLabel` |
| `TagsInput` | `defaultTags · onChange · placeholder · ariaLabel` |

دوال مساعدة نقيّة قابلة للاختبار: `app/lib/sort.js` (`sortRows`, `nextSortDir`, `ariaSortFor`) و`app/lib/calendar.js` (`buildMonth`)، وخطّافات وصولية في `app/lib/a11y.js` (`useFocusTrap`, `useInertWhenClosed`, `prefersReducedMotion`, `getFocusable`).

### تنحيف `App.jsx`
- من **685 → 560 سطرًا**، والحالة المركزية من ~40 حقلًا إلى ~27 (الباقي يخصّ أقسامًا لم تُستخرَج بعد).
- أُزيلت الحالة/المعالِجات/مفاتيح `renderVals` الخاصّة بـ Modal/Drawer/Tabs/Accordion/OTP/Slider/Pagination/Tags/ENS/Amount.
- التحقّق المباشر لحقلَي ENS والمبلغ نُقل لحالة محلية داخل `InputsSection`.

### الوصولية (a11y)
- **النوافذ والأدراج:** `role="dialog"` + `aria-modal` + حبس التركيز + Escape + إرجاع التركيز للزر الفاتح + `inert` عند الإغلاق.
- **التبويبات:** `role=tablist/tab/tabpanel` + `aria-selected` + `aria-controls` + roving tabindex + أسهم (مراعية لـ RTL) + Home/End.
- **الأكورديون:** ترويسات أزرار حقيقية + `aria-expanded`/`aria-controls` + تنقّل بالأسهم. (كانت `<div onClick>` غير وصولة بلوحة المفاتيح.)
- **الجدول:** ترويسات فرز أزرار + `aria-sort`.
- **التقويم:** أيام وأزرار تنقّل أزرار حقيقية + `aria-label`/`aria-current`/`aria-pressed`.
- **عناصر الاختيار:** `role=switch/checkbox/radio` + `aria-checked` + تفعيل بـ Enter/Space + `radiogroup` (أُصلِحت أزرار التبديل الفارغة بلا اسم).
- **OTP / المنزلق:** `role=group` بأسماء لكل خانة / `role=slider` بقيم `aria-valuemin/max/now`.
- **الرفع:** `role=progressbar` لأشرطة التقدّم. **القوائم:** `role=listbox/option`/`combobox`.
- **الحركة المخفّضة:** بالإضافة لقاعدة CSS العامّة، أصبح عدّ الأرقام والتمرير الناعم يحترمان `prefers-reduced-motion` في JS.

### الاختبارات (جديد)
- **Vitest + Testing Library + jsdom** — `npm test` / `npm run test:run`.
- **47 اختبارًا (10 ملفات)** تغطّي: Modal، Drawer، Tabs، Accordion، OtpInput، Slider، Pagination، TagsInput، منطق الفرز، وبناء التقويم.

### تنظيف الدين التقني
- `index.dev.html` (مُولّد) لم يعد متعقّبًا في git (أُضيف لـ`.gitignore`) — يُعاد توليده بـ`python3 build-dev.py` (حُدِّث ليشمل `app/lib/*`). أزال ازدواجية خطر الانحراف عن المصدر.
- أُزيلت 18 استيرادًا ميتًا (15 في `App.jsx` + 3 `css` في chrome).

### ما بقي مؤجَّلًا (بوعي هندسي)
Combobox/Select **عيّنات بصرية ساكنة** (لا حالة) → حُسّنت وصوليتها بدل استخراجها. الاستخراج الكامل لـ Calendar/FileUpload/SwipeList كمكوّنات عامّة مؤجَّل (مرتبطة بعمق ببيانات `App`)؛ حُسّنت وصوليتها في مكانها. Stepper بلا حالة فعلية.

---

## المرحلة 1 — فصل التوكنز (لا تغيير بصري)

نُقلت كل قواعد الـCSS من `<style>` المضمّن داخل الصفحة إلى ملفات منظمة، **حرفيًا ودون تغيير أي قيمة** (عدا إصلاحات التباين أدناه). التقسيم مثبت أنه «بلا فقد» (lossless) عبر فحص تطابق طول النص الكامل:

- `tokens/tokens.css` — كتلة `:root` (السلالم + الدلالية + cat + radius/shadow/ring/font/dur/ease/z).
- `tokens/themes.css` — `.dark{}` + `.dark .topbar` + `.dark .siderail` + `.ds.acc-green` + `.ds.acc-red` + `.ds.sharp`.
- `styles/base.css` — إعادة الضبط + التخطيط + هيكل الصفحة + عرض الأسس + `@font-face` (×11).
- `styles/components.css` — كل أنماط المكوّنات + لوحة التحكم + `@keyframes` (×8) + `@media`.

ترتيب التحميل (يحافظ على الـcascade): `tokens → themes → base → components`.

---

## المرحلة 2 — معالجة التباين الحرجة (WCAG AA)

**المبدأ:** لم تُخترع أي ألوان جديدة. كل القيم مأخوذة من سلالم النظام نفسها. ألوان التعبئة الزاهية (السماوي/الأخضر/الذهبي) **بقيت كما هي تمامًا** — غُيّر لون النص فوقها فقط (أبيض → حبر داكن)، فالهوية اللونية لم تتغيّر إطلاقًا في هذه الحالات.

### توكنز نصية (في `tokens/tokens.css`)
| التوكن | قبل | بعد | السبب | التباين قبل→بعد |
|---|---|---|---|---|
| `--ink-3` | `#8f8d86` | `#6e6c66` (neutral-600) | نص ثانوي/تسميات | 3.19 → **5.04** ✓ |
| `--brand-ink` | `#0084c4` | `#0a6a9e` (sky-700) | روابط/أسهم/شارة brand | 4.12 → **5.89** ✓ |
| `--gold-ink` | `#c97f06` | `#854f0f` (amber-800) | نص شارة gold الناعمة | 2.77 → **5.79** ✓ |

### حماية الوضع الداكن (في `tokens/themes.css`)
| التوكن (داخل `.dark`) | إضافة | السبب | التباين |
|---|---|---|---|
| `--gold-ink` | `#f9c652` (amber-300) | منع تراجع شارة gold في الوضع الداكن بعد تغيير gold-ink | 4.54 → **9.22** ✓ |

### نص على تعبئة زاهية — تغيير لون النص فقط (في `styles/components.css`)
ألوان التعبئة **لم تتغيّر**؛ النص أبيض → `var(--ink)`:
| العنصر | الخلفية (بلا تغيير) | النص | التباين قبل→بعد |
|---|---|---|---|
| `.btn.brand` | `--brand` #00a6ef | #fff → ink | 2.73 → **6.33** ✓ |
| `.badge.solid-brand` | `--brand` | #fff → ink | 2.73 → **6.33** ✓ |
| `.btn.is-ok` | `--green` #16bd74 | #fff → ink | 2.45 → **7.04** ✓ |
| `.badge.solid-green` | `--green` | #fff → ink | 2.45 → **7.04** ✓ |
| `.badge.solid-gold` | `--gold` #f5a623 | #fff → ink | 2.03 → **8.51** ✓ |
| `.btn.brand:hover` | `--brand-ink` → `--sky-600` | ink | (hover عابر) 4.19 |

### الخطر/Danger — تغميق التعبئة درجة واحدة (إبقاء النص أبيض، عرف الخطر التقليدي)
| العنصر | قبل | بعد | التباين قبل→بعد |
|---|---|---|---|
| `.btn.danger` | bg `--red` #fb3d18 | bg `--red-ink` #d22d0d | 3.63 → **5.10** ✓ |
| `.btn.danger:hover` | `--red-ink` | `--red-700` #ad2410 | **6.92** ✓ |
| `.btn.is-err` | bg `--red` | bg `--red-ink` | 3.63 → **5.10** ✓ |
| `.badge.solid-red` | bg `--red` | bg `--red-ink` | 3.63 → **5.10** ✓ |

> **قابل للتراجع:** عناصر «الخطر» هي الوحيدة التي تغيّرت تعبئتها (أحمر ساطع → أحمر أغمق درجة). إن فضّلت إبقاء الأحمر الساطع، يمكن بدلًا من ذلك استخدام نص داكن عليه (ink على #fb3d18 = 4.75 ✓). أبلغني وأعدّلها.

### لم يُمسّ
- `--brand` و`--green` و`--gold` و`--red` (قيم التعبئة الأساسية) — كما هي.
- كل السلالم الخام، الزوايا، الظلال، الخطوط، الحركة، z-index.
- المحتوى، البنية، التفاعلات.

---

## المرحلة 3 — تحويل dc-runtime → React قياسي + فصل الـChrome

- **المنصة:** مشروع **Vite** (`package.json`, `vite.config.js`, `index.html`, `app/main.jsx`) — مصدر React قياسي قابل للنشر سحابيًا. مكوّن `App` يرث `React.Component` بنفس الحالة والدوال ودورة الحياة و`renderVals()` من الأصل (التفاعلات محفوظة بالكامل).
- **المحوّل:** القالب (`{{}}`, `<sc-for>`, `<sc-if>`, `style` كنص) حُوّل آليًا إلى JSX: `class→className`, `{{e}}→{e}`, `<sc-for list as>→.map`, `<sc-if value>→ternary`, `style="{{e}}"→style={css(e)}`, تذييل العناصر الفارغة. تحقّق بنيوي: 0 بقايا `{{`/`<sc-`، أقواس/أقواس معقوفة متوازنة، Fragments 40/40.
- **الـChrome المفصول:** `app/chrome/TopBar.jsx` (themeLabel/toggleTheme/toggleCmd)، `SideRail.jsx` (navItems)، `Hero.jsx` (ثابت)، `CommandPalette.jsx` (حالة + دوال الأوامر). تُمرَّر القيم كـprops من `App`.
- **معاينة بلا Node:** `index.dev.html` (Babel-standalone، يجمّع نفس مصادر `app/`). تحقّقت أن العرض يتم **بلا أخطاء وقت تشغيل** عبر حدّ خطأ (error boundary) يبلّغ الخادم.
- **خطأ التُقط وأُصلح أثناء التحويل:** أسماء المفاتيح المختصرة المتتالية في `renderVals` (`{accCls, accH, posList}`) كانت تُفقَد بسبب regex غير متداخل → نقص في destructure → `accH is not defined`. الحل: تفكيك **كل** المعرّفات المستخدمة في JSX من `V` (مع استثناء معاملات `.map` وglobals وReact/css).
- **محفوظ كما هو:** كل CSS/التوكنز، المحتوى، والتفاعلات. `legacy.dc.html` + `support.js` مُبقاة كمرجع.

### مخاطر متبقية تحتاج فحصًا بصريًا (لا يمكن التحقق منها بلا متصفح مرئي)
- مطابقة بصرية دقيقة (بكسل) مقابل `preview.html` — تحقّقتُ من عدم الانهيار فقط، لا من التطابق البصري الكامل.
- أيقونات lucide: تُستبدل بعد العرض عبر `componentDidUpdate` (سلوك الأصل نفسه — محفوظ).
- مدخلات مضبوطة (`value` + `onInput`) قد تُظهر تحذير React تطويريًا (تعمل وظيفيًا).
- `css()` يُحلّل ~232 نمطًا مضمّنًا حرفيًا وقت العرض (يعمل؛ أداء مقبول لصفحة مرجع).

---

## QA (preview.html ↔ index.dev.html) + المرحلة 4 — فصل مكوّنات التوثيق

### نتيجة QA (آلية، React التطويرية)
- **0 أخطاء console، 0 تحذيرات React.**
- الثيم الفاتح/الداكن ✓، التبويبات ✓، لوحة الأوامر ✓ (نقر آلي مؤكَّد).
- OTP (6 خانات)، الجدول، المنزلق، النوافذ، لوحة التحكم، الأدراج — كلها موجودة وتُعرض.
- الخطوط مطابقة للمرجع (Thmanyah Serif/Sans)، ولون نص زر brand = حبر (إصلاح التباين مؤكَّد).
- **تطابق بنيوي ~99%**: الفرق الوحيد المعنوي هو غلاف `span.sc-interp` غير المرئي الذي يضيفه dc حول كل تعبئة `{{}}` (لا قاعدة CSS له → بلا أثر بصري) + تباين عابر بسيط في خلايا الجدول (حالة وقت اللقطة).

### إصلاحات توافق React اكتُشفت وأُصلحت أثناء QA
1. `onInput` → `onChange` (الحقول المضبوطة).
2. حقول العرض الثابتة (`القيمة`، العنوان، البريد) → `readOnly`.
3. `disabled=""` → `disabled` فعلي — كان حقل «حقل مقفل» غير مقفل فعليًا (خطأ كامن).
4. `inputmode` → `inputMode` (خاصية DOM صحيحة).

### المرحلة 4 — مكوّنات التوثيق (في `docs/`)
| المكوّن | الاستخدامات | النوع |
|---|---|---|
| `SectionHeader` | 40 | بارامترات (kicker/title/desc اختياري) |
| `TypeSpecimen` | 7 | بارامترات (cls/sample/spec) |
| `TokenTable` | 8 | بارامترات (صفّ مسافة: copy/label/bar) |
| `ColorSwatch` | 8 | بارامترات (copy/chip/name/hex) |
| `CodeBlock` | 1 | children |
| `ShowcasePanel` | 23 | wrapper (children) |
| `ColorScale` | 5 | wrapper (name/varLabel + خلايا كأطفال) |

- **Preview:** لا يوجد نمط مصدر متميّز له (مناطق العرض هي `.panel`) → مُغطّى بـ`ShowcasePanel`؛ لم يُخترع مكوّن زائد.
- **تحقّق:** بعد الفصل، الـDOM الناتج **مطابق تمامًا** لما قبله (reactEls=2584، نفس أرقام التطابق)، و0 أخطاء/تحذيرات. أي أنّ الفصل غيّر تنظيم الكود فقط، لا المخرجات.

#### مشكلتان ظهرتا أثناء الفصل (وأُصلحتا)
1. **`ColorScale` بسماته:** حُقن `<ColorScale name={..}>` في القالب قبل `to_jsx`، فعطب محلّل السمات (يفهم `attr="..."` لا `attr={...}`). الحل: حقن السمات عبر tokens **بعد** `to_jsx`.
2. **`SectionHeader` ابتلع أقسامًا:** رؤوس «الزوايا/الظلال» بلا `secdesc`، فتمدّد regex العنوان عبر الأقسام (ابتلع radius/shadow داخل نص عنوان واحد → اختلّت الشجرة). الحل: جعل `secdesc` اختياريًا في النمط فلا يعبر `</h2>`.

---

## المرحلة 5 — فصل المكوّنات الأساسية (تدريجيًا) — الدفعة 1

مكوّنات أساسية في `components/` (تُشتق من classes موجودة، تعرض ماركب مطابقًا تمامًا):
| المكوّن | الاستخدامات | الواجهة |
|---|---|---|
| `Button` | 49 | `variant` (سلسلة الأصناف بعد btn) + تمرير `onClick`/سمات + children |
| `Badge` | 28 | `variant` + children (يحافظ على `.dot` الداخلي) |

- **النطاق:** الفصل يطبَّق على **جسم الصفحة فقط** (بعد فصل الـChrome)، فلا تعتمد مكوّنات الـChrome على المكوّنات الأساسية. (شارة الـTopBar تبقى inline داخل TopBar.)
- **تحقّق QA:** بعد الفصل، الـDOM الناتج **مطابق تمامًا** (reactEls=2584، onlyReact=0)، و0 أخطاء/تحذيرات، والتفاعلات تعمل (ثيم/تبويبات/أوامر). الفصل غيّر التنظيم فقط لا المخرجات.
- **متبقٍّ من الأساسية:** Input/Field, OTPInput, Tabs, Card, Avatar, StatCard, Alert/Banner, Toast, Tooltip, Modal, Drawer, Accordion, Stepper, Select, Combobox, Slider, Calendar, FileUpload, Table, TagsInput, Pagination, SwipeList, EmptyState, Spinner — تُفصل في دفعات لاحقة بنفس آلية التحقق.

### المرحلة 5 — الدفعة 2

| المكوّن | الاستخدامات | النوع |
|---|---|---|
| `Avatar` | 18 | variant + تمرير `style`/سمات + children |
| `Alert` | 4 | variant + children |
| `Banner` | 3 | variant + children |
| `EmptyState` | 2 | (base `empty`) + children |

- **مُستثنى بوعي:** `Tooltip` (لا توجد class `.tooltip`/`.tip` في المصدر)، `Spinner` (1–3 عناصر فارغة فقط — لا تكرار يُذكر). لم تُخترع مكوّنات زائدة.
- **تحقّق QA:** DOM مطابق تمامًا (reactEls=2584، onlyReact=0)، 0 أخطاء/تحذيرات، التفاعلات تعمل.
- **أداة البناء:** `build-dev.py`/`build-qa.py` تجمع الآن `docs/*` و`components/*` تلقائيًا (لا حاجة لتعديلها مع كل دفعة).

**المكوّنات الأساسية حتى الآن:** Button(49)، Badge(28)، Avatar(18)، Alert(4)، Banner(3)، EmptyState(2) — 104 نسخة في 6 مكوّنات.

### المرحلة 5 — الدفعة 3 (أغلفة بسيطة فقط، بلا نقل حالة)

| المكوّن | الاستخدامات | الملاحظة |
|---|---|---|
| `Card` | 13 | مكوّن واحد بـ`variant` يغطّي pcard(4)/fcard(6)/wcard(3) |
| `StatCard` | 4 | بطاقات قسم «الإحصاء» (`.statcard`) |

- **Tab/ttab مؤجَّل:** التبويبات تستخدم class **ديناميكيًا** (`class="{{ t.cls }}"`) مدفوعًا بحالة `App` — ليس بنفس بساطة الأغلفة ذات الـclass الحرفي، وفصله يلمس منطق App. أُجِّل لدفعة لاحقة.
- **تحقّق QA:** DOM مطابق تمامًا (reactEls=2584، onlyReact=0)، 0 أخطاء/تحذيرات، لا تغيير سلوك.
- **لم يُنقل أي state أو business logic من `App`.**

**المكوّنات الأساسية بعد 3 دفعات:** Button(49)، Badge(28)، Avatar(18)، Card(13)، Alert(4)، StatCard(4)، Banner(3)، EmptyState(2) = **8 مكوّنات، 121 نسخة**.

---

## المرحلة 6 — فصل الأقسام إلى ملفات (الدفعة: الأسس)

تُمرَّر القيم المحسوبة (`renderVals()`) إلى كل قسم عبر **خاصية واحدة `v`**، ويفكّكها القسم داخليًا — بلا prop-threading موسّع و**بلا نقل أي state/منطق** من `App` (المنطق يبقى في `App`؛ الأقسام عرضية فقط).

`sections/foundations/` (9 ملفات): `Colors, Typography, Spacing, Radius, Shadow, Motion, Elevation, Icons, States`. كل قسم يستورد ما يستخدمه فقط من `docs/`+`components/`+`css`.

- استدعاء في `App`: `<Colors v={V} />` حيث `V = {...props, ...renderVals()}`.
- **تحقّق QA:** DOM مطابق تمامًا (reactEls=2584، onlyReact=0)، 0 أخطاء/تحذيرات، التفاعلات تعمل.
- `App.jsx`: 1045 → **943 سطرًا**. أداتا البناء تجمعان `sections/**` تلقائيًا.
- **متبقٍّ:** مجموعة المكوّنات (02، ~27 قسمًا) ومجموعة المرجع (04، 3 أقسام)، ثم عزل DashboardShell/FeatureSection (خطوة 7).

### المرحلة 6 — مكتملة (كل الأقسام مفصولة)

أُضيفت دفعةً واحدة (بنمط `v={V}` المتحقَّق):
- **مجموعة المكوّنات (27):** `sections/components/` — ButtonsSection, InputsSection, OtpSection, ControlsSection, SelectSection, ComboboxSection, SearchSliderSection, CalendarSection, UploadSection, CardsSection, TablesSection, BadgesSection, NumAnimSection, AvatarsSection, KpiSection, AlertsSection, BannerSection, FeedbackSection, ModalSection, DrawerSection, LoadingSection, EmptySection, TabsSection, NavSection, StepperSection, AccordionSection, SwipeSection. (لاحقة `Section` لتفادي التصادم مع مكوّنات Card/Badge/…)
- **مجموعة المرجع (3):** `sections/reference/` — DarkModeSection, ResponsiveSection, GuidelinesSection.

**الإجمالي: 39 قسمًا مفصولًا** (9 أسس + 27 مكوّنات + 3 مرجع). تبقّى قسم `patterns` inline فقط (هدف الخطوة 7: عزل DashboardShell + FeatureSection).
- `App.jsx`: 943 → **731 سطرًا** (الجسم الآن = جذر + chrome + 39 استدعاء قسم + قسم patterns؛ والباقي = صنف المنطق/الحالة).
- **QA:** DOM مطابق (2584)، onlyReact=0، 0 أخطاء/تحذيرات — بلا regression عبر 3 جولات (مجموعة المكوّنات ثم المرجع).

---

## المرحلة 7 — عزل الأنماط المركّبة (مكتملة)

- `patterns/FeatureSection.jsx` و`patterns/DashboardShell.jsx`: عُزل قسم المزايا (`featsec`) ولوحة التحكم (`dashframe`) من قسم `patterns` إلى مكوّنين مستقلّين يستقبلان `v`.
- `sections/components/PatternsSection.jsx`: يصبح غلافًا يستورد ويركّب `<SectionHeader/>` + `<FeatureSection v={v}/>` + `<DashboardShell v={v}/>`.
- **النتيجة:** **صفر أقسام inline في `App`** — كل الأقسام الـ40 مفصولة. `App.jsx`: → **685 سطرًا** (= صنف الحالة/المنطق + `render()` صار قشرة فقط: جذر + chrome + 40 استدعاء قسم).
- **مشكلة التُقطت وأُصلحت:** `PatternsSection` يستدعي `<FeatureSection v={v}/>` فالتقط idents الـ`v` وأُدرج في destructure → `const {…, v} = v` (إعادة تعريف). الحل: استثناء `v`/`V` (متغيّر النطاق) من destructure.
- **QA:** 0 أخطاء/تحذيرات، التفاعلات تعمل، الفرق البنيوي الوحيد = أغلفة `sc-interp` غير المرئية. بلا regression.

### حالة المعمارية بعد الخطوة 7
```
app/        App.jsx (الحالة + ~50 دالة + renderVals + render-قشرة) · main.jsx · chrome/(4) · lib/css.js
docs/       7 مكوّنات توثيق
components/ 8 مكوّنات أساسية
sections/   foundations(9) · components(28 ومنها PatternsSection) · reference(3)
patterns/   FeatureSection · DashboardShell
tokens/ styles/ vendor/ fonts/ assets/
```
**متبقٍّ (مؤجَّل):** المكوّنات الأساسية ذات الحالة (Modal/Drawer/Slider/Calendar/OTP/Table/Tabs/…) ما زال markup كلٍّ منها داخل قسمه؛ تحويلها لمكوّنات مستقلّة يحتاج prop-threading للحالة من `App` (قرار دفعة لاحقة). ثم QA بصري نهائي + إزالة `legacy.dc.html`/`support.js` عند الاكتفاء.

---

# ✅ نهاية المرحلة الأولى — التفكيك الهيكلي مكتمل ومستقر

**المرحلة الأولى (الخطوات 1–7) منجزة بالكامل ومُتحقَّق منها:**
1. فصل التوكنز (`tokens/tokens.css` + `themes.css`) — lossless.
2. تنظيم الـCSS (`styles/base.css` + `components.css`) + إصلاح تباين WCAG AA حرج (بلا تغيير ألوان التعبئة).
3. تحويل dc-runtime → **React قياسي (Vite)** — أُزيل `support.js` من مسار التشغيل.
4. فصل الـChrome (TopBar/SideRail/Hero/CommandPalette).
5. فصل 7 مكوّنات توثيق (`docs/`) + 8 مكوّنات أساسية (`components/`).
6. فصل **40 قسمًا** (`sections/foundations|components|reference`) عبر `v={V}`.
7. عزل الأنماط المركّبة (`patterns/FeatureSection` + `DashboardShell`).

**النتيجة:** `App.jsx` = 685 سطرًا (صنف الحالة/المنطق + render-قشرة)، صفر أقسام inline، صفر اعتماد على dc-runtime. **63 ملف JSX منظّم.**

**الهوية البصرية لم تتغيّر إطلاقًا** — تطابق DOM بنيوي مؤكَّد عبر 21 جولة QA آلية (reactEls=2584، الفرق الوحيد = أغلفة `sc-interp` غير المرئية)، **0 أخطاء console، 0 تحذيرات React**.

**المكوّنات ذات الحالة مؤجَّلة للمرحلة الثانية** (Modal, Drawer, Slider, Calendar, OTP, Table-sorting, Tabs, FileUpload, Accordion, Stepper, Select, Combobox, TagsInput, Pagination, SwipeList) — markupها داخل أقسامها؛ تحويلها لمكوّنات مستقلّة يحتاج prop-threading، ويبدأ عند حاجة فعلية لإعادة الاستخدام.

**قبل المرحلة الثانية:** Build/Deploy check → QA بصري بشري (preview.html ↔ index.dev.html) → إزالة `legacy.dc.html`/`support.js` بعد اعتماد المالك.

**`legacy.dc.html` + `support.js` مُبقاة عمدًا** كمرجع dc حتى الاعتماد البصري النهائي.

---

## تهيئة نشر — lucide (آمنة، بلا تغيير تصميم/منطق)

- **نُسخ** (لا نُقل) `vendor/lucide.min.js` → `public/vendor/lucide.min.js` كي يَنسخه بناء Vite الإنتاجي (الأصول تحت `public/` تُخدَم على الجذر `/`). النسخة الأصلية في `vendor/` بقيت كما هي لتظلّ معاينات بلا Node (`index.dev.html`, `preview.html`, `qa.html`) تعمل.
- `index.html`: **لا تغيير** — يشير أصلًا إلى `/vendor/lucide.min.js`، وهو بالضبط ما يخدمه Vite من `public/vendor/`.
- `index.dev.html`: غير متأثّر (يستخدم `vendor/lucide.min.js` من الجذر) — تأكّد عمله: 0×404.
- **ملاحظة مماثلة (لم تُعالَج، بطلب الاقتصار على lucide):** `assets/avatar.jpg` مُشار إليه نصيًا في الأقسام (7 مرّات) — نفس صنف مشكلة نشر Vite؛ يحتاج لاحقًا `public/assets/avatar.jpg` أو استيرادًا.

## تهيئة نشر — assets/avatar.jpg (آمنة)
- **نُسخ** `assets/avatar.jpg` → `public/assets/avatar.jpg` (md5+الحجم متطابقان، 196608 bytes). الأصل في `assets/` بقي للمعاينات.
- لا تغيير في JSX/HTML: المسار `assets/avatar.jpg` يُحلّ إلى `/assets/avatar.jpg` في الحالتين (python من الجذر، وVite من `public/`).
- تحقّق: `index.dev.html` و`preview.html` يعملان، **0 × 404**.
- **بهذا اكتملت تهيئة أصول النشر** (lucide + avatar) لبناء Vite الإنتاجي — دون تغيير تصميم/منطق ودون حذف ملفات legacy.

---

# 🧹 إغلاق نهائي — حذف مرجع dc القديم (باعتماد المالك)

بعد اعتماد الـQA البصري النهائي:
- **حُذف `legacy.dc.html`** (نسخة dc بالـCSS المضمّن) و**`support.js`** (زمن تشغيل dc).
- تحقّق: تطبيق React/بناء Vite **غير متأثّر إطلاقًا** — لا يعتمد على `support.js` (260 استيرادًا تُحلّ، 0 مشاكل؛ `index.html` + `app/main.jsx` سليمان). `index.dev.html` يعمل (لا يستخدم dc-runtime).
- **أثر جانبي مرصود:** `preview.html` كان يعتمد على `support.js` (كان مرجع المقارنة dc) فصار **غير فعّال** الآن. هو أداة QA فقط (ليس جزءًا من تطبيق الإنتاج). يمكن إزالته + إزالة مقارنة dc في `qa.html`/`build-qa.py` لاحقًا عند الطلب.

**المشروع الآن نظيف وقائم بذاته على React/Vite بلا أي اعتماد على dc-runtime.** المرحلة الأولى مغلقة.

---

# 🧹 تنظيف أدوات مقارنة dc (باعتماد المالك)

بعد حذف `legacy.dc.html` + `support.js`، صار `preview.html` معطّلًا (يعتمد على support.js). فحُذف هو وأدوات المقارنة المرتبطة بـ dc:
- **حُذف `preview.html`** (كان مرجع المقارنة dc البصري — معطّل بعد حذف support.js).
- **حُذف `qa.html`** (هارنس مقارنة آلي كان يحمّل preview.html في إطار).
- **حُذف `build-qa.py`** (كان يولّد qa.html لمقارنة dc فقط).
- **أُبقي `build-dev.py`** (يولّد `index.dev.html`، لا علاقة له بـ dc).
- ملفّا `vendor/react.development.js` + `vendor/react-dom.development.js` (كانا لـqa.html فقط) — **حُذِفا باعتماد المالك**. تحقّق: لا يشير إليهما أي ملف، و`index.dev.html` يعمل (يستخدم `react.production.min.js`)، فحص الاستيراد 0 مشاكل. أُبقي `vendor/babel.min.js` و`vendor/lucide.min.js` و`public/vendor/lucide.min.js`.

حُدّثت `README.md` و`ARCHITECTURE.md`: أُزيلت إشارات `preview.html`/`qa.html` كمرجع/أداة نشطة، ومصدر الحقيقة الآن تطبيق React نفسه.

**النتيجة: لا أثر لـ dc-runtime في المشروع إطلاقًا.** المرحلة الأولى مُغلقة على بنية React/Vite نظيفة قائمة بذاتها.
