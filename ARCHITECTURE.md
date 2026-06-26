# M7asmari Design System — خطة المعمارية والتفكيك

وثيقة مرجعية لتحويل صفحة العرض الواحدة إلى Design System منظم بـ**React قياسي** مع الحفاظ على نفس الهوية البصرية. تعكس قرارات المالك المعتمدة.

> ## ✅ المرحلة الأولى مكتملة ومستقرة
> التفكيك الهيكلي (الخطوات 1–7) **مُنجَز ومُتحقَّق منه**: التوكنز والـCSS مفصولة، dc-runtime حُوّل إلى React قياسي، والـChrome + مكوّنات التوثيق + المكوّنات الأساسية + الأقسام (40) + الأنماط كلها في ملفات مستقلّة. `App.jsx` = 685 سطرًا (منطق/حالة + render-قشرة). **الهوية البصرية لم تتغيّر** — تطابق DOM مؤكَّد عبر 21 جولة QA، 0 أخطاء/تحذيرات.
>
> **المرحلة الثانية ✅ منجَزة (2026-06-27):** استُخرجت 8 مكوّنات تفاعلية مستقلّة (Modal, Drawer, Tabs, Accordion, OtpInput, Slider, Pagination, TagsInput) تدير حالتها داخليًا بـ`useState`، مع وصولية شاملة واختبارات Vitest (47). `App.jsx` انخفض إلى **560 سطرًا**. التفاصيل في [`CHANGELOG.md`](CHANGELOG.md) والقسم «المرحلة الثانية» أدناه.
>
> **تمّ قبل إغلاق المرحلة الأولى:** فحص جاهزية البناء، تهيئة أصول `public/` (lucide + avatar)، QA بصري نهائي معتمَد، ثم **إزالة كامل مرجع dc وأدوات مقارنته** (`legacy.dc.html`, `support.js`, `preview.html`, `qa.html`, `build-qa.py`).

## المبدأ الحاكم
الهوية البصرية كلها في الـCSS. لذا: **قيم وقواعد CSS تُنقل بين ملفات دون تغيير** (عدا إصلاحات التباين الموثّقة في `CHANGELOG.md`). التفكيك يغيّر **بنية الماركب** فقط.

## نموذج الربط (من فحص الملف الأصلي)
القالب الأصلي يستخدم ربطًا **بصيغة React بالفعل**: `onClick`, `onInput`, `onKeyDown`, `onPointerDown/Move/Up`, `onPaste`, `ref`, `value`, `style`, `class` بقيم `{{ }}`. والمنطق فعليًا صنف React (`state`, `setState`, `React.createRef`, `componentDidMount/Update`, دوال تُعيد مُعالِجات). غير القياسي فقط:
- `renderVals()` تُرجع كائن القيم التي يربطها القالب الخارجي عبر `{{ }}`.
- `list="{{ arr }}"` (22 موضعًا) = تكرار يديره zمن التشغيل → يصبح `.map()` في JSX.
- لا توجد `<x-for>`/`<x-if>`/`<x-component>`/`<x-import>` (صفر) → لا توجد توجيهات قالب معقّدة.

**الخلاصة:** التحويل إلى React قياسي ميكانيكي إلى حدٍّ كبير: `class`→`className`، `{{e}}`→`{e}`، `style="{{o}}"`→`style={o}`، `list="{{a}}"`→`.map()`، سمات SVG/void، ودمج `renderVals()` داخل `render()`.

## استراتيجية التشغيل (قرار: React قياسي، والجهاز بلا Node)
- **المصدر:** React قياسي (JSX + ESM imports) في مشروع **Vite** → يُبنى وينشر عبر **Vercel سحابيًا** (لا يحتاج Node محليًا للنشر).
- **معاينة محلية بلا Node:** `index.dev.html` يحمّل نفس مصادر JSX عبر **Babel Standalone** (مضمّن في `vendor/`). نفس الـ`.jsx` يخدم الوضعين.
- **مرجع التحقق (تاريخي):** كان `preview.html` (صفحة dc بالـCSS المقسّم) يُستخدم لمطابقة «قبل/بعد» أثناء التفكيك — **أُزيل بعد QA النهائي**. مصدر الحقيقة الآن هو تطبيق React نفسه.
- يُتخلّى عن `dc-runtime` (`support.js`) كحل نهائي؛ يبقى مؤقتًا كمرجع فقط.

## طبقات التفكيك وشجرة الملفات
```text
tokens/        A — مصدر الحقيقة     ✅ منجز
  tokens.css   :root (السلالم + الدلالية + cat + radius/shadow/ring/font/dur/ease/z)
  themes.css   .dark + .ds.acc-green/.acc-red/.sharp
  tailwind.preset.js   (لاحقًا — من مصدّر التوكنز الموجود في المنطق)
styles/        ✅ منجز (CSS عام مقسّم، الهوية محفوظة)
  base.css     reset + layout + chrome scaffold + foundations display + @font-face
  components.css  أنماط المكوّنات + لوحة التحكم + @keyframes + @media
components/    B — مكوّنات أساسية (markup React + سلوك). تُشتق من classes موجودة فقط:
  Button Input OTPInput Badge Tabs Card Avatar StatCard Alert Banner Toast Tooltip
  Modal Drawer Accordion Stepper Select Combobox Slider Calendar FileUpload Table
  TagsInput CommandPalette Pagination SwipeList EmptyState Spinner
docs/          C — مكوّنات توثيق (المعتمدة فقط):
  SectionHeader ShowcasePanel Preview CodeBlock ColorSwatch ColorScale TokenTable TypeSpecimen
sections/      D — قسم لكل ملف يركّب C حول B
  foundations/ (Colors Type Spacing Radius Shadow Motion Elevation Icons States)
  components/  (Buttons Inputs … 27 قسمًا)
  reference/   (DarkMode Responsive Guidelines)
patterns/      E — أمثلة مركّبة (معزولة)
  DashboardShell  FeatureSection
examples/      مكان منظّم لـ Landing/Details لاحقًا (فارغ الآن عمدًا)
app/
  chrome/      TopBar SideRail Hero CommandPalette(+Trigger)
  App.jsx      جذر التركيب + حالة الثيم/الاتجاه/القسم النشط
  main.jsx     نقطة الدخول (createRoot)
vendor/        react, react-dom, lucide (+ babel-standalone للمعاينة)
fonts/  assets/  (أصول)
```
ترتيب تحميل CSS الثابت: `tokens → themes → base → components`.

## قواعد التفكيك المعتمدة
- لا يُنشأ مكوّن إلا إذا قلّل تكرارًا حقيقيًا أو خدم إعادة استخدام (لا تنظيم لأجل التنظيم).
- `RTL` يبقى الاتجاه الأساسي؛ جزر `LTR` للأرقام/الأكواد/البريد فقط — **لا** تحويل شامل لـ `left/right` الآن.
- أمثلة الآن: `DashboardShell` + `FeatureSection` فقط.
- لا نظام توثيق ضخم الآن (مكوّنات C الأساسية فقط).

## الحالة
- ✅ **خطوة 1:** فصل التوكنز/الثيمات (lossless، مثبت).
- ✅ **خطوة 2:** إصلاح التباين الحرج (انظر `CHANGELOG.md`)، مُتحقّق منه عددًا وبصريًا عبر `preview.html`.
- ✅ **خطوة 3:** تحويل dc-runtime → React قياسي (Vite) + فصل الـChrome (TopBar/SideRail/Hero/CommandPalette). الصفحة كاملة تُعرض كـ`app/App.jsx` (React.Component) بنفس المنطق والتفاعلات؛ معاينة بلا Node عبر `index.dev.html` (Babel-standalone) — تأكّد العرض بلا أخطاء وقت التشغيل.
- ✅ **خطوة 4:** فصل مكوّنات التوثيق المتكرّرة إلى `docs/`: SectionHeader (40)، TypeSpecimen (7)، TokenTable (8)، ColorSwatch (8)، CodeBlock (1)، ShowcasePanel (23)، ColorScale (5). تحقّق آلي (`qa.html`): الـDOM الناتج مطابق تمامًا لما قبل الفصل (reactEls=2584)، و0 أخطاء/تحذيرات. (Preview بلا نمط مصدر متميّز → مغطّى بـ ShowcasePanel، لم يُخترع له مكوّن.)
- ◐ **خطوة 5 (جارية، تدريجيًا):** `components/` (8 مكوّنات، 121 نسخة) — د1 Button(49)/Badge(28)؛ د2 Avatar(18)/Alert(4)/Banner(3)/EmptyState(2)؛ د3 Card(13)/StatCard(4). تحقّق QA لكل دفعة: DOM مطابق (2584)، 0 أخطاء، بلا نقل حالة. مؤجَّل (حالة/ديناميكي): Tab، Input، OTPInput، Modal، Drawer، Slider، Calendar، Table، FileUpload، Accordion، Stepper، Select، Combobox، TagsInput، Pagination، SwipeList.

- ✅ **خطوة 6:** فصل كل الأقسام (39) إلى `sections/{foundations(9),components(27),reference(3)}/` عبر `v={V}` بلا نقل منطق. QA: DOM مطابق (2584)، 0 أخطاء. بقي قسم `patterns` inline (هدف خطوة 7). App.jsx: → 731 سطرًا.
- ✅ **خطوة 7:** عزل FeatureSection + DashboardShell إلى `patterns/`؛ `PatternsSection` يركّبهما. صفر أقسام inline في App؛ App.jsx → 685 سطرًا. QA: 0 أخطاء، بلا regression.
- ⏳ **التالي:** المكوّنات الأساسية ذات الحالة (markupها داخل أقسامها) — تحويلها لمكوّنات مستقلّة بـprop-threading؛ ثم QA بصري نهائي.
- ✅ **خطوة 8:** QA بصري نهائي معتمَد، ثم إزالة مرجع dc وأدواته.

## أداة QA (تاريخية — أُزيلت)
كانت `build-qa.py` تولّد `qa.html` لمقارنة React بنسخة dc المرجعية آليًا (تطابق DOM + أخطاء/تحذيرات console + اختبارات تفاعل). **أُزيلت بالكامل بعد QA النهائي** مع نسخة dc المرجعية. تبقّى `build-dev.py` فقط لتوليد `index.dev.html` (معاينة بلا Node).

## ملف التشغيل الحالي
- **الأساسي (Vite):** `index.html` → `app/main.jsx` → `app/App.jsx` + `app/chrome/*` + `app/lib/css.js`. يستورد CSS من `tokens/` و`styles/`. للبناء/النشر: `npm i && npm run build` (يبني سحابيًا على Vercel بلا Node محلي).
- **معاينة محلية بلا Node:** `index.dev.html` (يجمّع نفس مصادر `app/` في سكربت Babel واحد، React عام من `vendor/`). للتحديث بعد تعديل `app/`: `python3 build-dev.py`.
- **مرجع dc الأصلي:** `legacy.dc.html` + `support.js` — **حُذِفا** بعد اعتماد QA البصري النهائي. (`preview.html` كان يعتمد عليهما فصار غير فعّال — أداة QA فقط.)

## المرحلة الثانية — تقوية النظام (منجَزة 2026-06-27)

**الهدف:** تحويل الأقسام التفاعلية من markup مدفوع بـ`v={V}` إلى **مكوّنات قائمة بذاتها** تدير حالتها داخليًا، بـAPI واضح ووصولية كاملة، **بلا أي تغيير بصري**.

### طبقة المكوّنات الجديدة (`components/`)
- **مكوّنات بحالة داخلية:** `Modal`, `Drawer`, `Tabs`, `Accordion`, `OtpInput`, `Slider`, `Pagination`, `TagsInput`. كلٌّ يستهلكه قسمه عبر API صريح (props) بدل قراءة `V`. الأصناف والـmarkup محفوظة حرفيًا.
- **النمط:** بدل دمج الحالة في `App`، كل مكوّن `useState` + يبعث عبر callbacks (`onChange`/`onComplete`/`onClose`). الأقسام تحمل حالة عرض محلية صغيرة عند الحاجة (مثل `fee` للمنزلق، `status` لـOTP).

### طبقة المنطق/الوصولية (`app/lib/`)
- `a11y.js` — `useFocusTrap` (حبس تركيز + Escape + إرجاع التركيز)، `useInertWhenClosed` (inert + aria-hidden)، `prefersReducedMotion`، `getFocusable`.
- `sort.js` — `sortRows`/`nextSortDir`/`ariaSortFor` (منطق فرز الجدول، نقيّ).
- `calendar.js` — `buildMonth` (بناء خلايا الشهر، نقيّ).
هذه دوال **نقيّة** → تُختبَر مباشرة بلا DOM.

### الوصولية
أدوار ARIA كاملة للنوافذ/الأدراج/التبويبات/الأكورديون/الجدول/التقويم/عناصر الاختيار/القوائم؛ تنقّل لوحة مفاتيح ومراعاة RTL؛ حبس تركيز للطبقات؛ واحترام `prefers-reduced-motion` في CSS وJS.

### الاختبارات (`test/`)
Vitest + Testing Library + jsdom — `npm run test:run`. 47 اختبارًا (10 ملفات): سلوك المكوّنات الثمانية + منطق `sort` و`calendar`.

### نموذج الربط الآن (هجين، مقصود)
- **مُستخرَج (حالة داخلية):** المكوّنات الثمانية أعلاه — لا تمرّ عبر `V`.
- **غير مُستخرَج بعد (لا يزال `v={V}`):** الأقسام المرتبطة بعمق ببيانات `App` (الجدول، التقويم، الرفع، السحب، لوحة التحكم، الإشعارات، عناصر الاختيار، لوحة الأوامر). حُسّنت وصوليتها في مكانها.
- **ساكن (عيّنات بصرية):** Combobox، Select، Stepper — لا حالة؛ وصولية فقط.
