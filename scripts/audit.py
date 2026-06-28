#!/usr/bin/env python3
"""M7asmari — Design-System Architecture Audit  (`npm run audit` · python3 scripts/audit.py)

يمنع انحدار البنية بعد مرحلة التنظيف المعماري:
  HARD FAIL → توكنز قديمة (legacy) · primitives مباشرة داخل المكوّنات · ألوان hex خام في الأنماط
              · استيرادات نسبية مكسورة · أسماء توكنز غير دلالية
  WARN      → مسافات خارج السلّم · مدد حركة خارج التوكنز · خصائص RTL فيزيائية (backlog)

يُرجع رمز خروج 1 عند أي HARD FAIL. لا يتطلّب Node."""
import os, re, sys, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

def files(*globs):
    out = []
    for g in globs: out += glob.glob(g, recursive=True)
    return sorted(set(p for p in out if os.path.isfile(p)))

STYLES = files('styles/*.css')
CODE   = files('app/**/*.jsx', 'app/**/*.js', 'components/**/*.jsx',
               'sections/**/*.jsx', 'patterns/*.jsx', 'docs/*.jsx', 'tokens/*.css',
               'kits/**/*.jsx', 'kits/**/*.js',
               'test/*.jsx', 'test/*.js')
ALL_IMP = files('app/**/*.jsx', 'app/**/*.js', 'components/**/*.jsx',
                'sections/**/*.jsx', 'patterns/*.jsx', 'docs/*.jsx',
                'kits/**/*.jsx', 'kits/**/*.js', 'test/*.jsx', 'test/*.js')

fails, warns = [], []

# ---- 1) توكنز قديمة (legacy) في أي مصدر كود ----
LEGACY = re.compile(r'--(ink|canvas|surface-[23]|border-2|green|gold|red|sky|emerald|amber|cat|r|sh)(-[a-z0-9]+)?(?![a-z0-9-])')
hits = []
for p in STYLES + CODE:
    for i, ln in enumerate(open(p, encoding='utf-8'), 1):
        for m in LEGACY.finditer(ln):
            hits.append(f'{p}:{i}  {m.group(0)}')
if hits:
    fails.append(('legacy tokens (أسماء توكنز قديمة)', hits))

# ---- 2) primitives مباشرة داخل أنماط المكوّنات (styles/) — chart مسموح ----
PRIM = re.compile(r'var\(--(brand|neutral|success|warning|danger|info)-\d+\)')
hits = []
for p in STYLES:
    for i, ln in enumerate(open(p, encoding='utf-8'), 1):
        for m in PRIM.finditer(ln):
            hits.append(f'{p}:{i}  {m.group(0)}')
if hits:
    fails.append(('primitive scale used directly in component CSS', hits))

# ---- 3) ألوان hex خام في الأنماط (عدا الأبيض/الأسود) — التوكنز المضبوطة تعيش في tokens/ ----
HEX = re.compile(r'#[0-9a-fA-F]{3,8}\b')
ALLOW = {'#fff', '#ffffff', '#000', '#000000'}
hits = []
for p in STYLES:
    for i, ln in enumerate(open(p, encoding='utf-8'), 1):
        for m in HEX.finditer(ln):
            if m.group(0).lower() not in ALLOW:
                hits.append(f'{p}:{i}  {m.group(0)}')
if hits:
    fails.append(('raw hex color in component CSS (نقلها إلى طبقة التوكنز)', hits))

# ---- 4) استيرادات نسبية مكسورة ----
IMP = re.compile(r"""from\s+['"](\.[^'"]+)['"]""")
hits = []
for p in ALL_IMP:
    base = os.path.dirname(p)
    for m in IMP.findall(open(p, encoding='utf-8').read()):
        if not (m.endswith('.js') or m.endswith('.jsx')):
            continue
        if not os.path.isfile(os.path.normpath(os.path.join(base, m))):
            hits.append(f'{p}  ->  {m}')
if hits:
    fails.append(('broken relative imports', hits))

# ---- 5) أسماء توكنز غير دلالية في طبقة التوكنز (شكلية بدل وظيفية) ----
NONSEM = re.compile(r'--(blue|gray|grey|teal|purple|pink|indigo|orange|yellow|sky|emerald|amber)\b')
hits = []
for p in files('tokens/*.css'):
    for i, ln in enumerate(open(p, encoding='utf-8'), 1):
        for m in NONSEM.finditer(ln):
            hits.append(f'{p}:{i}  {m.group(0)}')
if hits:
    fails.append(('non-semantic token name in token layer', hits))

# ---- 6) أيقونات: منع رجوع data-lucide (المصدر الموحّد هو مكوّن Icon، لا مكتبة runtime) ----
hits = []
for p in CODE:
    for i, ln in enumerate(open(p, encoding='utf-8'), 1):
        if 'data-lucide' in ln:
            hits.append(f'{p}:{i}')
if hits:
    fails.append(('data-lucide (استخدم مكوّن Icon بدل أيقونات lucide runtime)', hits))

# ---- 7) :focus-visible للعناصر التفاعلية ذات الأدوار المخصّصة (checkbox/switch/select…) ----
# كل صنف تفاعلي بدور مخصّص (يُركَّز بالكيبورد) يجب أن تكون له حلقة تركيز صريحة في components.css.
FOCUS_CLASSES = ['cbx', 'switch', 'selectbox', 'tab', 'ttab', 'sideitem', 'dashcat']
comp_src = open('styles/components.css', encoding='utf-8').read()
covered = set(re.findall(r'\.([a-z][\w-]*):focus-visible', comp_src))
missing = [f'.{c}' for c in FOCUS_CLASSES if c not in covered]
if missing:
    fails.append((':focus-visible مفقودة لعناصر ذات أدوار مخصّصة (أضِفها لقاعدة حلقة التركيز)', missing))

# ---- WARN: مسافات خارج السلّم في الأنماط ----
SCALE = {0,4,8,12,16,20,24,28,32,36,40,48,56,64,80,96,120,999}  # 999 = نصف قطر الحبّة المقصود
PX = re.compile(r'(?<![\w.])(\d+)px')
off = {}
for p in STYLES:
    for m in PX.finditer(open(p, encoding='utf-8').read()):
        v = int(m.group(1))
        if v not in SCALE and v >= 4:   # <4px = عروض حدود/خطوط، ليست مسافات
            off[v] = off.get(v, 0) + 1
if off:
    warns.append(('spacing/size خارج السلّم (px)',
                  [f'{v}px ×{c}' for v, c in sorted(off.items(), key=lambda x:-x[1])[:14]]))

# ---- WARN: مدد حركة خارج التوكنز ----
DUR = re.compile(r'(?<![\w.])(\.\d+|\d+)s\b')
TOK = {'.12', '.18', '.32', '0', '.6', '.8'}  # 120/180/320ms tokens + animation durations
offd = {}
for p in STYLES:
    for m in DUR.finditer(open(p, encoding='utf-8').read()):
        val = m.group(1)
        if val not in TOK:
            offd[val + 's'] = offd.get(val + 's', 0) + 1
if offd:
    warns.append(('motion durations خارج التوكنز',
                  [f'{v} ×{c}' for v, c in sorted(offd.items(), key=lambda x:-x[1])[:12]]))

# ---- WARN: خصائص RTL فيزيائية (roadmap للترحيل لمنطقية) ----
PHYS = re.compile(r'(?<![\w-])(left|right|margin-left|margin-right|padding-left|padding-right|text-align)\s*:')
nphys = sum(len(PHYS.findall(open(p, encoding='utf-8').read())) for p in STYLES)
if nphys:
    warns.append(('خصائص اتجاه فيزيائية (RTL backlog)', [f'{nphys} موضعًا (left/right/margin-*/padding-*/text-align)']))

# ===================== التقرير =====================
print('\n' + '=' * 64)
print('  M7asmari — تدقيق البنية المعمارية')
print('=' * 64)
if not fails:
    print('\n  ✅ PASS — لا انتهاكات صارمة')
else:
    print(f'\n  ❌ FAIL — {len(fails)} فئة انتهاك صارم\n')
    for title, hits in fails:
        print(f'  ✗ {title}: {len(hits)}')
        for h in hits[:12]:
            print(f'      {h}')
        if len(hits) > 12:
            print(f'      … (+{len(hits)-12})')
print('\n  ── تحذيرات (backlog موثّق، لا تكسر البناء) ──')
for title, items in warns:
    print(f'  ⚠ {title}: {", ".join(items)}')
print('\n' + '=' * 64)
sys.exit(1 if fails else 0)
