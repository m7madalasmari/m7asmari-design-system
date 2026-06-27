# سجل التغييرات — M7asmari Design System

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
