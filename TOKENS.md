# M7asmari — دليل التوكنز والبنية (Token & Architecture Guide)

نظام التصميم مبني على **توكنز ذات طبقات واضحة** بأسماء **دلالية/وظيفية** (لا شكلية). هذه الوثيقة هي مرجع المطوّر.

---

## 1. الطبقات الأربع وترتيب التحميل

```
tokens/primitive.css   ← (1) مقاييس خام      — لا تُستخدم داخل المكوّنات مباشرة
tokens/semantic.css    ← (2) مفردات دلالية    — مبنية من primitive · مصدر الحقيقة للواجهة
tokens/component.css   ← (3) توكنز المكوّنات  — مبنية من semantic
tokens/pattern.css     ← (4) مسافات/تخطيط     — على مستوى الصفحة/النمط
```
ترتيب التحميل (محفوظ في `app/main.jsx`، `app/theme-builder.jsx`، `app/requests.jsx`، و`build-dev.py`):
`primitive → semantic → component → pattern → styles/base → styles/components → [styles/page]`

**القاعدة الذهبية:** المكوّن لا يشير أبدًا إلى primitive (`--brand-500`) أو لون خام (`#00a6ef`). يشير إلى **دلالي** (`--brand`, `--text-primary`) أو **توكن مكوّن** (`--btn-brand-bg`). يفرض هذا `npm run audit`.

---

## 2. اصطلاح التسمية

| النوع | النمط | مثال |
|------|------|------|
| مقياس لوني | `--<role>-<50…950>` | `--brand-500`, `--danger-100` |
| دلالي (سطح/نص/حدود) | `--<role>` / `--<role>-<modifier>` | `--surface-muted`, `--text-secondary` |
| دلالي (حالة) | `--<status>` · `-ink` (نص) · `-soft` (تعبئة) | `--success`, `--success-ink`, `--success-soft` |
| توكن مكوّن | `--<component>-<part>[-state]` | `--btn-brand-bg-hover`, `--input-border-focus` |
| مسافة دلالية | `--space-<purpose>` | `--space-page`, `--space-card` |

ممنوع: أسماء لونية شكلية (`--blue-500`, `--gray-100`, `--sky`, `--gold`) — يرفضها الـAudit.

---

## 3. مرجع التوكنز

### الألوان — Primitive (داخلي/مرجعي فقط)
مقاييس 50→950: `--brand-*` · `--neutral-*` (0=أبيض) · `--success-*` · `--warning-*` · `--danger-*` · `--info-*`.
لوحة تصنيفية للبيانات (تُستهلك مباشرة): `--chart-1 … --chart-8`.

### الألوان — Semantic (تُستخدم في الواجهة)
| المجموعة | التوكنز |
|---------|---------|
| الأسطح | `--background` · `--surface` · `--surface-muted` · `--surface-elevated` |
| النصوص | `--text-primary` · `--text-secondary` · `--text-muted` |
| الحدود | `--border` · `--border-strong` |
| العلامة | `--brand` · `--brand-hover` · `--brand-ink` · `--brand-soft` · `--focus-ring` |
| الحالات | `--success / --warning / --danger / --info` (+ لكلٍّ `-ink` و`-soft`) |

الوضع الداكن (`.dark`) ومتغيّرات العلامة (`.ds.acc-green/.acc-red`) والحوافّ (`.ds.sharp`) **تعيد تعريف الطبقة الدلالية فقط** — لا تلمس المكوّنات.

### الطباعة
- العائلات: `--font-ui` (Thmanyah Sans) · `--font-display` (Thmanyah Serif) · `--font-mono` (JetBrains Mono).
- الأحجام: `--text-xs(12) sm(14) base(16) lg(18) xl(22) 2xl(30) 3xl(40) 4xl(54)`.
- ارتفاع السطر: `--leading-tight(1.15) snug(1.25) normal(1.5) relaxed(1.65) loose(1.7)`.
- الأوزان: `--weight-light(300) regular(400) medium(500) semibold(600) bold(700) black(800)`.
- **عربي/إنجليزي:** الأرقام والأكواد والبريد تُعزل بـ`direction:ltr` (+`font-feature-settings:'tnum'` للأرقام الجدولية عبر `.numjoin`/`.tnum`).

### المسافات
- سلّم خام: `--space-0 … --space-24` (خطوة الأساس 4px + خطوة 12).
- دلالية (Pattern): `--space-page(40) · --space-section(96) · --space-card(28) · --space-stack(16) · --space-field(12) · --space-inline(8)`.

### الحوافّ · الظلال · الحركة · الطبقات · النقاط
- الحوافّ: `--radius-xs(7) sm(10) md(14) lg(20) xl(28) full(999)`.
- الظلال: `--shadow-sm/md/lg` (+ `--focus-ring` للتركيز، دلالي).
- الحركة: `--dur-fast(120) --dur(180) --dur-slow(320)` + `--ease / --ease-out / --ease-spring`.
- الطبقات: `--z-base/dropdown/sticky/drawer/modal/toast/tooltip`.
- النقاط (توثيقية): `--bp-sm(480) md(768) lg(1024) xl(1320)`.

### توكنز المكوّنات (component.css)
`--btn-*` · `--card-*` · `--input-*` · `--table-*` · `--badge-*` · `--nav-*` · `--alert-*` (+ `--fg-on-accent`, `--fg-on-warning`, `--stat-trend-*`, `--banner-*`, `--code-*`). كلها مشتقّة من الدلالي/الخام داخل الطبقة فقط.

---

## 4. جدول الترحيل (قديم → جديد)

| قديم | جديد | قديم | جديد |
|------|------|------|------|
| `--sky-*` | `--brand-*` | `--ink` | `--text-primary` |
| `--emerald-*` | `--success-*` | `--ink-2` | `--text-secondary` |
| `--amber-*` | `--warning-*` | `--ink-3` | `--text-muted` |
| `--red-*` | `--danger-*` | `--canvas` | `--background` |
| `--cat-*` | `--chart-*` | `--surface-2/3` | `--surface-muted/raised` |
| `--green/-ink/-soft` | `--success/-ink/-soft` | `--border-2` | `--border-strong` |
| `--gold/-ink/-soft` | `--warning/-ink/-soft` | `--r-*` | `--radius-*` |
| `--red/-ink/-soft` | `--danger/-ink/-soft` | `--sh-*` | `--shadow-*` |
| `--brand-2*` (ثانوي) | `--accent-2*` | — | — |

---

## 5. معمارية المكوّنات (Atomic)

```
components/atoms/      ذرّات: Button Badge Avatar Alert Banner Card StatCard EmptyState
components/molecules/  جزيئات: ActivityItem FileRow FolderItem NavItem UserMenu SearchField
                              Breadcrumb NotificationMenu CollapsibleSection StatTile Pagination
components/organisms/  كائنات: OtpInput Slider Accordion Tabs Drawer Modal TagsInput
sections/              عرض النظام (foundations/ components/ reference/)
patterns/              أنماط مركّبة (DashboardShell · FeatureSection)
```

### تصنيف أنماط الصفحات (Page Patterns) — مرجعي
| النمط | الموجود | يُركّب من |
|------|---------|----------|
| Showcase | `app/App.jsx` | chrome + sections |
| Landing + Form | `app/RequestsPage.jsx` | Hero + Features + Form/List |
| Tool + Preview | `app/ThemeBuilderPage.jsx` | controls + live preview |
| Dashboard | `patterns/DashboardShell.jsx` | siderail + stats + list |
| Empty | `components/atoms/EmptyState.jsx` | قابل للتركيب |

أنماط مستقبلية (Admin List / Registration / Details / Settings) تُركّب من نفس الذرّات/الجزيئات القائمة — لا قوالب جديدة في هذه المرحلة.

---

## 6. الفصل: مستخدم / مطوّر / داخلي

| الطبقة | الجمهور | أين |
|-------|--------|-----|
| خيارات مفهومة | المستخدم النهائي | Theme Builder: Brand/Secondary · Theme · Radius · Density · Card/Button · Font · Motion |
| دلالي + مكوّن | المطوّر | هذه الوثيقة + تصدير CSS/JSON طبقي من الباني |
| primitive scales | داخلي | لا تُعرض كخيارات؛ مرجع فقط في قسم «الألوان» |

تصدير الباني (`app/lib/themeTokens.js`) يُخرج **CSS Variables** و**JSON** بنفس الطبقات (`primitive` / `semantic` / `component`).

---

## 7. الـAudIT و كيفية التوسعة

`npm run audit` (`python3 scripts/audit.py`) — **يفشل** على: توكنز قديمة · primitive داخل المكوّنات · hex خام في الأنماط · استيراد مكسور · اسم غير دلالي. **يحذّر** (backlog): مسافات/حركة خارج السلّم، خصائص RTL فيزيائية.

**لإضافة توكن:** ضعه في الطبقة الصحيحة (لون خام → primitive؛ معنى واجهة → semantic؛ خاص بمكوّن → component) واستهلكه من الطبقة الأعلى فقط. لا تُدخل hex داخل `styles/` — انقله إلى طبقة التوكنز.

**Backlog موثّق (لا يكسر البناء):** توحيد قيم المسافات/الحركة خارج السلّم تدريجيًا؛ ترحيل `left/right` إلى خصائص منطقية (`inset-inline`, `margin-inline`) لدعم LTR مستقبلًا.
