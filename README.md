# M7asmari Design System

نظام تصميم عربي RTL، مبني بـ**React قياسي (Vite)**. مُصدَّر أصلًا من مشروع claude.ai/design ثم فُكِّك إلى نظام تصميم منظّم مع الحفاظ التامّ على الهوية البصرية.

An Arabic-first (RTL) design system built with **standard React (Vite)** — originally exported from a claude.ai/design project, then decomposed into an organized design system with its visual identity 100% preserved.

> **الحالة:** المرحلة الأولى (التفكيك الهيكلي) **مكتملة ومستقرة**. المرحلة الثانية (مكوّنات قابلة لإعادة الاستخدام + وصولية + اختبارات) **منجَزة** — التفاصيل في [`CHANGELOG.md`](CHANGELOG.md) و[`ARCHITECTURE.md`](ARCHITECTURE.md).

## ما الذي بداخله / What's inside
- **الأسس:** لوحات ألوان (sky / neutral / emerald / amber / red)، توكنز دلالية، تباعد، أنصاف، ظلال، حركة، حالات تفاعل.
- **الطباعة:** خطوط **Thmanyah** (Sans للنصوص، Serif Display للعناوين) + JetBrains Mono للرموز.
- **المكوّنات والأقسام:** ~40 قسمًا (أزرار، حقول، OTP، شارات، تبويبات، بطاقات، جداول، تقويم، نوافذ، أدراج، لوحة أوامر ⌘K، إشعارات…) + نمطان مركّبان (FeatureSection، DashboardShell).
- **مكوّنات تفاعلية قابلة لإعادة الاستخدام** (المرحلة الثانية): `Modal`, `Drawer`, `Tabs`, `Accordion`, `OtpInput`, `Slider`, `Pagination`, `TagsInput` — تدير حالتها داخليًا بـAPI واضح، ووصولية كاملة بلوحة المفاتيح.
- **وضع داكن + RTL** أصيلان، و**وصولية** (أدوار ARIA، حبس تركيز، احترام `prefers-reduced-motion`)، و**اختبارات** (Vitest، 47 اختبارًا).

## البنية / Structure
```
index.html              مدخل Vite (الأساسي)
app/        App.jsx (حالة الأقسام غير المُستخرَجة + render-قشرة) · main.jsx
            lib/  css.js · a11y.js (useFocusTrap, prefersReducedMotion…) · sort.js · calendar.js
            chrome/ (TopBar, SideRail, Hero, CommandPalette)
docs/       7 مكوّنات توثيق (SectionHeader, TokenTable, ColorSwatch, ColorScale, TypeSpecimen, ShowcasePanel, CodeBlock)
components/ أساسية: Button, Badge, Avatar, Card, Alert, StatCard, Banner, EmptyState
            تفاعلية (المرحلة 2): Modal, Drawer, Tabs, Accordion, OtpInput, Slider, Pagination, TagsInput
sections/   foundations(9) · components(28) · reference(3)
patterns/   FeatureSection · DashboardShell
test/       اختبارات Vitest (setup.js + *.test.{js,jsx})
tokens/     tokens.css · themes.css          styles/  base.css · components.css
public/     vendor/lucide.min.js · assets/avatar.jpg   (أصول بناء Vite الإنتاجي)
vendor/     react · react-dom · lucide · babel (للمعاينة المحلية بلا Node)
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
npm run test:run  # اختبارات (تشغيل واحد) — 47 اختبارًا
```
> **تهيئة النشر (مطبَّقة):** أصول النشر التي يطلبها بناء Vite موجودة تحت `public/` — `public/vendor/lucide.min.js` (يحمّله `index.html` عبر `/vendor/lucide.min.js`) و`public/assets/avatar.jpg` (تشير إليه الأقسام عبر `/assets/avatar.jpg`). نسخ `vendor/` و`assets/` في الجذر باقية لخدمة المعاينة المحلية بلا Node.

**معاينة محلية بلا Node:** `index.dev.html` مُولَّد ولم يعد متعقّبًا في git — ولّده أولًا:
```bash
python3 build-dev.py            # يولّد/يحدّث index.dev.html من مصادر app/ و components/ …
python3 -m http.server 8137
# http://127.0.0.1:8137/index.dev.html   (نفس المصادر عبر Babel-standalone)
```
أعد تشغيل `build-dev.py` بعد تعديل أي ملف في `app/`/`docs/`/`components/`/`sections/`/`patterns/`.

## ضمان الجودة / QA
أثناء المراحل 1–7 جرى التحقّق بأداة مقارنة آلية (React مقابل نسخة dc المرجعية): تطابق DOM، **0 أخطاء / 0 تحذيرات console**. بعد اعتماد QA النهائي **أُزيلت أداة المقارنة ونسخة dc المرجعية بالكامل** (`preview.html`, `qa.html`, `build-qa.py`, `legacy.dc.html`, `support.js`) — لم تعد لازمة. للمعاينة المحلية بلا Node استخدم `index.dev.html` (يُحدَّث بـ`python3 build-dev.py`).

## المرحلة الثانية (منجَزة) + ما بقي
**أُنجِز:** استخراج 8 مكوّنات تفاعلية مستقلّة (Modal, Drawer, Tabs, Accordion, OtpInput, Slider, Pagination, TagsInput) تدير حالتها داخليًا؛ وصولية شاملة (أدوار ARIA، لوحة مفاتيح، حبس تركيز، `prefers-reduced-motion`)؛ دوال منطق نقيّة (`sort`, `calendar`)؛ إطار اختبار Vitest (47 اختبارًا)؛ وتنحيف `App.jsx`. التفاصيل في [`CHANGELOG.md`](CHANGELOG.md).

**بقي (بوعي):** Combobox/Select عيّنات ساكنة (حُسّنت وصوليتها بدل استخراجها). الاستخراج الكامل لـ Calendar/FileUpload/SwipeList كمكوّنات عامّة مؤجَّل لارتباطها العميق ببيانات `App` (حُسّنت وصوليتها في مكانها). Stepper بلا حالة فعلية.

## أصول/مراجع
- `legacy.dc.html` + `support.js`: **حُذِفا** بعد اعتماد QA البصري النهائي (كانا نسخة dc-runtime الأصلية للمقارنة). لم يعد المشروع يعتمد على dc-runtime إطلاقًا.
- مُستورد من claude.ai/design (project `12dcdf85-598d-4c04-81df-2fafabf453e2`). خطوط Thmanyah من `~/Downloads/Thmanyah-Font-Family/`.
