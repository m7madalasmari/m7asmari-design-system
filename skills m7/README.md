# M7 Skills

مجموعة Claude Code Skills لمراجعة وتطوير **M7 Design System** و **M7 Kits**.
كل Skill يعمل **مدقّقًا/مراجعًا خبيرًا**: يبدأ بتقرير، ولا يعدّل الكود إلا إذا طُلب صراحةً.

## قبل المراجعة: مهارة التصميم `m7-ui-foundation`

كل الـ Skills في هذا المجلد **مراجِعة بعد البناء** (review-after). يقابلها مهارة
**`m7-ui-foundation`** وهي **التصميم قبل البناء** (design-before): تفرض ترتيب أساس ثابت
(tokens → layout → spacing → sizing → typography → text behavior → responsive → anatomy →
states → implementation) قبل كتابة أي HTML/CSS/JSX، مع RTL عربي أولًا عبر الـ logical properties.

الحلقة الكاملة:
**صمّم بـ `m7-ui-foundation` ← ابنِ ← دقّق بـ `m7-auditor` / بوّابة الدمج `m7-qa`.**

**التثبيت:** مصدر المهارة يُشحن مع هذا الريبو في `m7-ui-foundation.skill` (ملف ZIP في جذر
المشروع). لتفعيلها، ثبّتها بنفسك في مجلد مهاراتك العام:

```sh
unzip -n m7-ui-foundation.skill -d ~/.claude/skills/
```

> ملاحظة: هذه المهارة **لا تُفعَّل تلقائيًا** لزملائك — كل شخص يثبّتها بنفسه من الـ ZIP.
> وهي ليست جزءًا من مجلد `skills/` أدناه؛ تعيش في `~/.claude/skills/m7-ui-foundation/`.

## متى أستخدم كل Skill

| Skill | استخدمها متى | النطاق |
|---|---|---|
| **m7-auditor** | تبي مراجعة شاملة للنظام أو لطبقة كبيرة منه: tokens، components، patterns، docs، architecture دفعة واحدة. | النظام كامل / طبقة |
| **m7-component** | عندك مكوّن واحد وتبي تحكم: هل يدخل Core؟ وهل API/states/a11y جاهزة؟ | مكوّن واحد |
| **m7-kits** | تراجع أو تبني Kit فوق Core (مثل Form Kit): التزام بـ Core، widgets/recipes، Gaps Log. | Kit |
| **m7-pages** | التنقل مشتت، الهيدر غير ثابت، أو تبي تتأكد كيف يصل المستخدم ويرجع. | الصفحات والتنقل |
| **m7-qa** | قبل دمج أي فرع: build/tests/RTL/dark/docs/changelog + حكم جاهز/غير جاهز. | فرع قبل الدمج |

## كيف تختار بسرعة

```
مراجعة كل النظام؟            → m7-auditor
مكوّن واحد قبل Core؟         → m7-component
Kit فوق Core؟               → m7-kits
بنية الصفحات/التنقل؟         → m7-pages
فرع قبل الدمج؟              → m7-qa
```

## المفاهيم الأساسية (موحّدة عبر كل الـ Skills)

| المفهوم | التعريف | أين يعيش |
|---|---|---|
| **Token** | قيمة تصميم مجرّدة (color/space/type/radius) | `tokens/` |
| **Component** | وحدة بناء قابلة لإعادة الاستخدام، محايدة للمجال | `components/` (Core) |
| **Pattern** | تركيبة متكررة من components تحل مشكلة UX متكررة | `patterns/` |
| **Widget** | مكوّن مركّب عام محايد للمجال — مرشّح للترقية إلى Core | Kit مؤقتًا ← Core |
| **Recipe** | تركيبة خاصة بمجال داخل Kit — ليست component جديدًا | `kits/<domain>/recipes/` |
| **Kit** | طبقة فوق Core لمجال معيّن، تستهلك Core فقط | `kits/<domain>/` |
| **Page** | صفحة فعلية في الموقع/التطبيق | `pages/` |
| **Documentation** | توثيق المكونات والاستخدام | `docs/` |

## القواعد الثابتة (تسري على كل الـ Skills)

1. **التقرير أولًا** — لا تعديل على الكود إلا بطلب صريح بعد قراءة التقرير.
2. **لا هوية جديدة** — لا إعادة تصميم بصري ولا token جديد إلا بمبرر موثّق.
3. **أصلح المصدر لا العَرَض** — إذا أصل المشكلة في component فالإصلاح في `components/`، لا في الاستخدام.
4. **Core فوق Kit** — إذا أصل المشكلة في Core فلا تُرقّع في Kit؛ تُوثّق وتُصلح في Core.
5. **رقِّ ما يستحق** — أي widget قابل لإعادة الاستخدام يُرفع إلى Core؛ أي شيء خاص بمجال يبقى recipe.
6. **لا refactor أعمى** — أي refactor كبير يُحدَّد نطاقه وعدد الملفات المتأثرة قبل البدء.
7. **فرّق دائمًا** بين Component / Pattern / Widget / Recipe / Kit / Page / Documentation.

## مسار التوجيه (مرجع سريع لتحديد مصدر أي مشكلة)

```
قيمة خاطئة/ناقصة؟              → token
المكوّن يخطئ في كل استخداماته؟  → component (أصلح في components/)
خطأ في استخدام واحد فقط؟       → usage (section/pattern/recipe)
نقص ظهر في Kit أصله Core؟      → Core gap (وثّق + أصلح في Core)
ترتيب/تنقل الصفحة خاطئ؟        → page architecture
السلوك صحيح لكن غير موثّق؟     → documentation
```

## البنية

```
skills/
├── README.md                          ← هذا الملف
├── m7-auditor/SKILL.md
├── m7-component/SKILL.md
├── m7-kits/SKILL.md
├── m7-pages/SKILL.md
└── m7-qa/SKILL.md
```

ضع مجلد `skills/` في جذر مشروع M7 ليتعرّف عليه Claude Code.
