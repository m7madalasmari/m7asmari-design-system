# تقرير M7 Form Kit — كِت متكامل (طبقة تشغيل فوق نظام التصميم)

> الكِت طبقة تشغيل فوق M7: **بلا هوية أو توكنز أو CSS خاص**. يستخدم مكوّنات/توكنز M7 لتوليد نماذج عربية RTL متعددة. أي ضعف ظهر أثناء البناء **عولِج في M7 core** لا في الكِت.

---

## 1. جدول الجرد (المتوقّع → الواقع → الإجراء)

| العنصر | كان في M7 | الإجراء |
|---|---|---|
| Button / OtpInput / SearchField / Slider / TagsInput | ✅ مكوّنات | أُعيد استخدامها كما هي |
| Input / Textarea | ⚠️ classes فقط (`.input`,`.field`,`.hint`) | **مكوّن core جديد** `Input`, `Textarea` |
| رسائل Help/Error/Success | ⚠️ classes فقط (`.hint/.err/.ok`) | **مكوّن core** `FieldMessage` |
| غلاف الحقل + ربط a11y | ❌ مفقود | **مكوّن core** `Field` (label/aria-describedby/aria-invalid) |
| Checkbox / Radio / Switch | ⚠️ classes فقط (`.cbx/.radio/.switch`) | **مكوّنات core** `Checkbox`,`Radio`,`RadioGroup`,`Switch` |
| Select (قائمة) | ⚠️ نمط listbox بلا منطق/تموضع | **مكوّن core** `Select` (stateful + كيبورد) |
| Combobox | ⚠️ نمط `.search/.menu` بلا منطق | **مكوّن core** `Combobox` (فلترة/تمييز) |
| FileUpload | ⚠️ نمط `.dropzone/.fileitem` | **مكوّن core** `FileUpload` |
| DatePicker | ⚠️ نمط `.cal` + `buildMonth` فقط | **مكوّن core** `DatePicker` |
| Stepper | ⚠️ نمط `.stepper` | **مكوّن core** `Stepper` |
| PasswordInput | ❌ غير موجود | **مكوّن core** `PasswordInput` (إظهار/إخفاء + مقياس قوّة) |
| التحقّق (validation) | ❌ غير موجود | **core lib** `app/lib/validation.js` |
| توكنز النماذج · light/dark · RTL · QA | ✅ مكتملة | استُخدمت دون أي توكن جديد |

**الخلاصة:** M7 غني بالتوكنز والمكوّنات المعقّدة، لكن **أوّليّات النماذج لم تكن مكوّنات** — أكبر فجوة، عولِجت بالتحويل إلى مكوّنات core.

---

## 2. مسار الكِت + اللقطات

- **مدخل Vite:** `formkit.html` → `app/formkit.jsx` → `app/FormKitPage.jsx` (مُضاف لـ`vite.config.js`).
- **معاينة بلا Node:** `python3 scripts/build-formkit-dev.py` → `formkit.dev.html` (يُخدَم بـ`python3 -m http.server`).
- **اللقطات (Safari + screencapture):**
  - فاتح — أعلى الصفحة + حالات الحقول: `formkit-light2.png`
  - فاتح — نماذج المصادقة: `formkit-forms-light.png`
  - داكن — أعلى الصفحة + حالات الحقول: `formkit-dark.png`
  - داكن — نماذج التفاعل: `formkit-forms-dark.png`
  - (في مجلد scratchpad للجلسة)

---

## 3. أين نجح M7 (اشتغل بلا تعديل)

- **نظام التوكنز:** كل المكوّنات الجديدة تلوّنت ودعمت Light/Dark **بصفر توكنز جديدة**؛ التباين بقي AA تلقائيًا (تأكّد بـ`contrast.py`).
- **أصناف النماذج القائمة** (`.input/.field/.hint/.cbx/.radio/.switch/.selectbox/.menu/.cal/.dropzone/.stepper/.otpwrap`) كانت كاملة وعالية الجودة — التحويل لمكوّنات كان **لفّ رفيع** بلا إعادة تنسيق.
- **RTL** عمل مباشرةً لكل النماذج (محاذاة، جزر LTR للبريد/الأرقام/OTP).
- **آلية الثيم** (`.ds`/`.dark`) أُعيد استخدامها كما هي — لا تبديل جديد.
- **المكوّنات المُعاد استخدامها** (`Button`,`OtpInput`,`Slider`,`TagsInput`) ركّبت في الوصفات بسلاسة.

---

## 4. أين احتاج تقوية (الجذر في core + الإصلاح)

| المشكلة | الجذر | الإصلاح (ملف) | الحالة |
|---|---|---|---|
| أوّليّات النماذج ليست مكوّنات | غياب طبقة مكوّنات للنماذج | إضافة 17 مكوّنًا في `components/{atoms,molecules,organisms}` | ✅ نُفِّذ |
| `.menu`/`.cal` بلا تموضع كقائمة منسدلة | لا primitive للارتكاز | `.fk-anchor`/`.fk-pop` (توكنز + خصائص منطقية) في `styles/components.css` | ✅ نُفِّذ |
| لا حالة تنشيط بالكيبورد لعنصر القائمة | `.menuitem` فيه `:hover` فقط | `.menuitem.active` في `styles/components.css` | ✅ نُفِّذ |
| لا حقل كلمة مرور (إظهار + قوّة) | غير موجود في core | `.pwfield/.pwtoggle/.pwmeter/.pwseg` + `PasswordInput` | ✅ نُفِّذ |
| لا غلاف حقل ولا تحقّق | غياب Field + validation | `Field` + `app/lib/validation.js` (+ `Form/FormSection/FormActions`) | ✅ نُفِّذ |
| `audit.py` لا يفحص `kits/` | نطاق الفحص قديم | توسيع `CODE`/`ALL_IMP` لتشمل `kits/**` | ✅ نُفِّذ |
| `.input.is-error/.is-success` و`.otp*` تستخدم `rgba()` خام | قيم core سابقة للكِت | تحويلها لتوكن `--input-ring-error/-success` | 🔶 توصية (تمسّ بصريات قائمة) |
| تباين رسائل الحقول غير مُدرَج آليًا في `contrast.py` | قائمة الأزواج ثابتة | إضافة أزواج `.hint.err/.ok` + placeholder للفحص الآلي | 🔶 توصية |

> **كل الإصلاحات المنفّذة في core بتوكنز فقط**: لا hex خام، ولا توكنز جديدة، وخصائص RTL منطقية (`inset-inline`, `padding-inline`).

---

## 5. نتائج الاختبارات

| الفحص | الأمر | النتيجة |
|---|---|---|
| تدقيق البنية | `python3 scripts/audit.py` | ✅ PASS — لا انتهاكات صارمة (يشمل `kits/` الآن) |
| التباين WCAG AA | `python3 scripts/audit.py:contrast` | ✅ PASS — كل الأزواج AA في Light وDark (مثلًا `input placeholder/bg` 5.25، `input fg/bg` 14.55) |
| تحقّق بصري | Safari + screencapture | ✅ Light + Dark يرسمان؛ كل الحالات (default/focus/filled/disabled/error/success) صحيحة؛ RTL سليم؛ **14 وصفة ترسم كلها** (شجرة React اكتملت دون تعطّل) |
| اختبارات الوحدة | Vitest (6 ملفات: FormFields, FormControls, Select, PasswordInput, Stepper, validation) | ✍️ مكتوبة — **تُشغَّل في CI** (Node 20)؛ لا Node محليًا في هذه البيئة (سير العمل المحلي بايثوني بلا Node) |
| بناء Vite | `vite build` | يُشغَّل في CI؛ بديل محلي: `build-formkit-dev.py` بنى 74 وحدة بنجاح |

---

## 6. قائمة النواقص (لم تُخترَع)

لا نواقص متبقّية لبناء Form Kit — كل ما احتاجه النموذج كان **إمّا موجودًا في M7 أو أُضيف إلى core**. لم يُبنَ أي مكوّن/توكن خارج core، ولم تُخترَع هوية أو قيم.

---

## 7. الخلاصة

- **هل M7 core جاهز لـForm Kit؟** نعم الآن — بعد إضافة طبقة مكوّنات النماذج (17 مكوّنًا) + التحقّق + إصلاحات core الصغيرة. قبل ذلك لم يكن (أوّليّات النماذج كانت classes فقط).
- **أهم 3 تقويات core قبل التوزيع كحزمة — كلها أُنجزت:**
  1. ✅ توكنة حلقات الخطأ/النجاح (`--input-ring-error/-success`) بدل `rgba()` الخام. *(commit `bb7dcac`)*
  2. ✅ توسيع `contrast.py` ليشمل أزواج رسائل الحقول والplaceholder تلقائيًا. *(commit `bb7dcac`)*
  3. ✅ تدقيق `:focus-visible` للعناصر ذات الأدوار المخصّصة ضمن `audit.py` (القاعدة ٧) + إضافة `.selectbox` صراحةً لحلقة التركيز الموحّدة. *(تمرير 2026-06-28)*
- **تقوية إضافية (2026-06-28): توحيد الأيقونات.** رُحِّلت كل `<i data-lucide>` إلى مكوّن `Icon` (مصدر واحد، `data-icon` كخطّاف هويّة)، وأُسقطت مكتبة lucide وقت التشغيل، وأُضيف حارس audit (القاعدة ٦) يمنع رجوع `data-lucide`. التفاصيل في `CHANGELOG.md`.
- **نمط الكِت القادم:** نفس المعمار يتكرّر — **Dashboard Kit** و**Landing Kit**: طبقة `kits/<name>` تركّب مكوّنات core، وأي نقص يُصلَح في core، مع registry قابل للقراءة آليًا (جاهز للأجنت).

---

## ملحق: ما أُضيف

**core — مكوّنات (17):** `Input, Textarea, FieldMessage, PasswordInput, Checkbox, Radio, Switch` (atoms) · `Field, RadioGroup, Form, FormSection, FormActions, Stepper, FileUpload` (molecules) · `Select, Combobox, DatePicker` (organisms).
**core — lib:** `app/lib/validation.js`.
**core — CSS (توكنز فقط):** كتلة «Form Kit additions» في `styles/components.css`.
**core — أدوات:** توسيع `scripts/audit.py` ليشمل `kits/`؛ `scripts/build-formkit-dev.py` (معاينة بلا Node).
**core — اختبارات:** `test/{FormFields,FormControls,Select,PasswordInput,Stepper}.test.jsx` + `test/validation.test.js`.
**الكِت — `kits/form/`:** `useForm.js`, `FormCard.jsx`, `index.js` (registry) + 14 وصفة في `recipes/`.
**المعرض/البناء:** `app/FormKitPage.jsx`, `app/formkit.jsx`, `formkit.html`, مدخل في `vite.config.js`.
