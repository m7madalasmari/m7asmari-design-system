# M7asmari Design System

نظام تصميم عربي RTL، مبني بـ**React قياسي (Vite)**. مُصدَّر أصلًا من مشروع claude.ai/design ثم فُكِّك إلى نظام تصميم منظّم مع الحفاظ التامّ على الهوية البصرية.

An Arabic-first (RTL) design system built with **standard React (Vite)** — originally exported from a claude.ai/design project, then decomposed into an organized design system with its visual identity 100% preserved.

> **الحالة:** المرحلة الأولى (التفكيك) والثانية (مكوّنات + وصولية + اختبارات) **منجزتان**. المرحلة الثالثة (**تنظيف معماري**: توكنز 4 طبقات بأسماء دلالية + معمارية ذرّية + Audit) **منجَزة** — دليل التوكنز في [`TOKENS.md`](TOKENS.md)، والتفاصيل في [`CHANGELOG.md`](CHANGELOG.md) و[`ARCHITECTURE.md`](ARCHITECTURE.md).

## ما الذي بداخله / What's inside
- **التوكنز (4 طبقات):** primitive → semantic → component → pattern. مقاييس لونية وظيفية (**brand / neutral / success / warning / danger / info** + chart)، ومفردات دلالية (`--background`, `--surface`, `--text-primary`, `--brand`…)، وسلالم طباعة/مسافات/حوافّ/ظلال/حركة. الدليل الكامل: [`TOKENS.md`](TOKENS.md).
- **الطباعة:** خطوط **Thmanyah** (Sans للنصوص، Serif Display للعناوين) + JetBrains Mono للرموز.
- **المكوّنات والأقسام:** ~40 قسمًا (أزرار، حقول، OTP، شارات، تبويبات، بطاقات، جداول، تقويم، نوافذ، أدراج، لوحة أوامر ⌘K، إشعارات…) + نمطان مركّبان (FeatureSection، DashboardShell).
- **مكوّنات تفاعلية قابلة لإعادة الاستخدام** (المرحلة الثانية): `Modal`, `Drawer`, `Tabs`, `Accordion`, `OtpInput`, `Slider`, `Pagination`, `TagsInput` — تدير حالتها داخليًا بـAPI واضح، ووصولية كاملة بلوحة المفاتيح.
- **وضع داكن + RTL** أصيلان، و**وصولية** (أدوار ARIA، حبس تركيز، احترام `prefers-reduced-motion`)، و**اختبارات** (Vitest، 165 اختبارًا).

## البنية / Structure
```
index.html              الصفحة الرئيسية (هاب) — مدخل Vite الأساسي (app/home.jsx)
core.html               عرض النظام الكامل (الأسس/المكوّنات/المرجع) — app/main.jsx → App.jsx
catalog.html · formkit.html · dashboardkit.html · lab.html   صفحات MPA (كتالوج/كِت/مختبر)
app/        App.jsx (حالة الأقسام غير المُستخرَجة + render-قشرة) · home.jsx · main.jsx · CatalogPage · FormKitPage · DashboardKitPage · LabPage
            lib/  css.js · a11y.js · sort.js · calendar.js · useTheme.js (سمة مشتركة) · navCommands.js (⌘K)
            chrome/ AppHeader (هيدر موحّد عبر كل الصفحات) · KitsMenu · DocsMenu · SideRail · Hero
docs/       7 مكوّنات توثيق (SectionHeader, TokenTable, ColorSwatch, ColorScale, TypeSpecimen, ShowcasePanel, CodeBlock)
components/ atoms/(17) Button Badge Avatar Card Alert Banner StatCard EmptyState Input Textarea Checkbox Switch Radio PasswordInput FieldMessage Skeleton Icon
            molecules/(34) Field NavItem Breadcrumb SearchField StatTile GoalCard RingStat Timeline RankList ProfileHeader PageHeader Toolbar FilterBar Rating … (حقول/إحصاء/تنقّل/كيانات)
            organisms/(17) Modal Drawer Tabs Accordion Select Combobox DatePicker DataTable Kanban TreeView Carousel CompareSlider CommandPalette Popover OtpInput Slider TagsInput
            charts/(12) Sparkline LineChart MultiLineChart BarChart StackedBarChart DonutChart WaterfallChart BulletChart Heatmap Gauge Funnel Legend
sections/   foundations(9) · components(28) · reference(3)
patterns/   FeatureSection · DashboardShell
scripts/    أدوات بايثون (بلا Node): build-dev.py · build-requests-dev.py · audit.py · contrast.py · token_map.py
test/       اختبارات Vitest (setup.js + *.test.{js,jsx})
tokens/     primitive · semantic · component · pattern (.css)   styles/  base.css · components.css
public/     assets/avatar.jpg   (أصول بناء Vite الإنتاجي)
vendor/     react · react-dom · babel (للمعاينة المحلية بلا Node)
            الأيقونات مُضمّنة كـSVG عبر components/atoms/Icon.jsx (لا مكتبة أيقونات وقت التشغيل)
fonts/  assets/
```
المكوّنات التفاعلية المُستخرَجة **تدير حالتها داخليًا** (`useState`). أمّا الأقسام التي لم تُستخرَج بعد فتبقى عرضية تستقبل كائن القيم المحسوبة `v={V}` (مخرَج `renderVals`) من `App`.

## التشغيل والبناء / Run & Build

**البناء/النشر (Vite) — يحتاج Node (أو بناء سحابي على Vercel):**
```bash
npm install
npm run dev       # خادم تطوير
npm run build     # بناء إنتاجي إلى dist/
npm test          # اختبارات (وضع المراقبة)
npm run test:run  # اختبارات (تشغيل واحد)
npm run audit     # تدقيق البنية (توكنز قديمة/primitives/hex/استيراد) — بايثون، بلا Node
```
> **تهيئة النشر (مطبَّقة):** أصول النشر التي يطلبها بناء Vite موجودة تحت `public/` — `public/assets/avatar.jpg` (تشير إليه الأقسام عبر `/assets/avatar.jpg`). الأيقونات مُضمّنة كـSVG عبر `components/atoms/Icon.jsx` (لا مكتبة أيقونات وقت التشغيل). نسخ `vendor/` و`assets/` في الجذر باقية لخدمة المعاينة المحلية بلا Node.

**معاينة محلية بلا Node:** `index.dev.html` مُولَّد ولم يعد متعقّبًا في git — ولّده أولًا:
```bash
python3 scripts/build-dev.py            # يولّد/يحدّث index.dev.html من مصادر app/ و components/ …
python3 -m http.server 8137
# http://127.0.0.1:8137/index.dev.html   (نفس المصادر عبر Babel-standalone)
```
أعد تشغيل `scripts/build-dev.py` بعد تعديل أي ملف في `app/`/`docs/`/`components/`/`sections/`/`patterns/`.

## ضمان الجودة / QA
أثناء المراحل 1–7 جرى التحقّق بأداة مقارنة آلية (React مقابل نسخة dc المرجعية): تطابق DOM، **0 أخطاء / 0 تحذيرات console**. بعد اعتماد QA النهائي **أُزيلت أداة المقارنة ونسخة dc المرجعية بالكامل** (`preview.html`, `qa.html`, `build-qa.py`, `legacy.dc.html`, `support.js`) — لم تعد لازمة. للمعاينة المحلية بلا Node استخدم `index.dev.html` (يُحدَّث بـ`python3 scripts/build-dev.py`).

## المرحلة الثانية (منجَزة) + ما بقي
**أُنجِز:** استخراج 8 مكوّنات تفاعلية مستقلّة (Modal, Drawer, Tabs, Accordion, OtpInput, Slider, Pagination, TagsInput) تدير حالتها داخليًا؛ وصولية شاملة (أدوار ARIA، لوحة مفاتيح، حبس تركيز، `prefers-reduced-motion`)؛ دوال منطق نقيّة (`sort`, `calendar`)؛ إطار اختبار Vitest (165 اختبارًا)؛ وتنحيف `App.jsx`. التفاصيل في [`CHANGELOG.md`](CHANGELOG.md).

**بقي (بوعي):** Combobox/Select عيّنات ساكنة (حُسّنت وصوليتها بدل استخراجها). الاستخراج الكامل لـ Calendar/FileUpload/SwipeList كمكوّنات عامّة مؤجَّل لارتباطها العميق ببيانات `App` (حُسّنت وصوليتها في مكانها). Stepper بلا حالة فعلية.

## أصول/مراجع
- `legacy.dc.html` + `support.js`: **حُذِفا** بعد اعتماد QA البصري النهائي (كانا نسخة dc-runtime الأصلية للمقارنة). لم يعد المشروع يعتمد على dc-runtime إطلاقًا.
- مُستورد من claude.ai/design (project `12dcdf85-598d-4c04-81df-2fafabf453e2`). خطوط Thmanyah من `~/Downloads/Thmanyah-Font-Family/`.
