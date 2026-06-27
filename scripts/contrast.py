#!/usr/bin/env python3
"""M7asmari — مدقّق تباين الثيم (Light/Dark · WCAG).
يحلّ كل توكن دلالي/مكوّن إلى لونه الفعلي في الوضعين، ويحسب نسبة التباين لأزواج النص/الخلفية
المعروفة في النظام، ويُبلّغ عمّا يقصُر عن WCAG AA. لا يتطلّب Node ولا متصفّحًا.
تشغيل: python3 scripts/contrast.py"""
import os, re, glob, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

# ---- 1) تحميل تعريفات التوكنز (:root + .dark) ----
root_defs, dark_defs = {}, {}
for f in glob.glob('tokens/*.css'):
    txt = re.sub(r'/\*.*?\*/', '', open(f).read(), flags=re.S)  # إزالة التعليقات أولًا
    # يدعم قوائم المُحدِّدات مثل `:root, .dark { … }`
    for m in re.finditer(r'([^{}]+)\{([^}]*)\}', txt):
        sels = [s.strip() for s in m.group(1).split(',')]
        body = m.group(2)
        for d in re.finditer(r'(--[a-z0-9-]+)\s*:\s*([^;]+);', body):
            name, val = d.group(1), d.group(2).strip()
            for sel in sels:
                if sel == ':root': root_defs[name] = val
                elif sel == '.dark': dark_defs[name] = val
                # .ds.acc-*/.sharp = variants — خارج التدقيق الأساسي

def resolve(name, mode, seen=None):
    seen = seen or set()
    if name in seen: return None
    seen.add(name)
    table = dict(root_defs)
    if mode == 'dark': table.update(dark_defs)
    val = table.get(name)
    if val is None: return None
    return resolve_value(val, mode, seen)

def resolve_value(val, mode, seen):
    val = val.strip()
    m = re.fullmatch(r'var\((--[a-z0-9-]+)\)', val)
    if m: return resolve(m.group(1), mode, seen)
    return val  # concrete (#hex / rgb / keyword)

def to_rgb(c):
    if c is None: return None
    c = c.strip().lower()
    m = re.fullmatch(r'#([0-9a-f]{3})', c)
    if m: return tuple(int(ch*2, 16) for ch in m.group(1))
    m = re.fullmatch(r'#([0-9a-f]{6})', c)
    if m: return tuple(int(m.group(1)[i:i+2], 16) for i in (0, 2, 4))
    m = re.match(r'rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)', c)
    if m: return tuple(int(m.group(i)) for i in (1, 2, 3))
    return None

def lum(rgb):
    def ch(v):
        v /= 255
        return v/12.92 if v <= 0.03928 else ((v+0.055)/1.055)**2.4
    r, g, b = rgb
    return 0.2126*ch(r) + 0.7152*ch(g) + 0.0722*ch(b)

def ratio(fg, bg):
    a, b = lum(fg), lum(bg)
    hi, lo = max(a, b), min(a, b)
    return (hi+0.05)/(lo+0.05)

# ---- 2) أزواج النص/الخلفية في النظام (نوع: text=4.5 · ui/large=3.0) ----
PAIRS = [
    # (label, fg-token, bg-token, kind)
    ('text-primary / background',       '--text-primary',   '--background',     'text'),
    ('text-secondary / background',     '--text-secondary', '--background',     'text'),
    ('text-muted / background',      '--text-muted',  '--background',     'text'),
    ('text-primary / surface',          '--text-primary',   '--surface',        'text'),
    ('text-secondary / surface',        '--text-secondary', '--surface',        'text'),
    ('text-muted / surface',         '--text-muted',  '--surface',        'text'),
    ('text-secondary / surface-muted',  '--text-secondary', '--surface-muted',  'text'),
    ('text-muted / surface-muted',   '--text-muted',  '--surface-muted',  'text'),
    # الأزرار (نص على تعبئة — UI)
    ('btn.primary fg/bg',   '--btn-primary-fg',   '--btn-primary-bg',   'ui'),
    ('btn.brand fg/bg',     '--btn-brand-fg',     '--btn-brand-bg',     'ui'),
    ('btn.secondary fg/bg', '--btn-secondary-fg', '--btn-secondary-bg', 'ui'),
    ('btn.danger fg/bg',    '--btn-danger-fg',    '--btn-danger-bg',    'ui'),
    # الشارات الناعمة (ink على soft — text)
    ('badge.brand ink/soft',   '--brand-ink',   '--brand-soft',   'text'),
    ('badge.success ink/soft', '--success-ink', '--success-soft', 'text'),
    ('badge.warning ink/soft', '--warning-ink', '--warning-soft', 'text'),
    ('badge.danger ink/soft',  '--danger-ink',  '--danger-soft',  'text'),
    ('badge.info ink/soft',    '--info-ink',    '--info-soft',    'text'),
    # الشارات الصلبة (نص داكن على تعبئة زاهية — UI)
    ('badge.solid-brand',   '--fg-on-accent', '--brand',   'ui'),
    ('badge.solid-success', '--fg-on-accent', '--success', 'ui'),
    ('badge.solid-warning', '--fg-on-accent', '--warning', 'ui'),
    ('badge.solid-danger',  '--fg-on-accent', '--danger',  'ui'),
    # الإدخال + الجدول + التنقّل
    ('input fg/bg',          '--input-fg',       '--input-bg',         'text'),
    ('input placeholder/bg', '--input-placeholder','--input-bg',       'text'),
    ('table header fg/bg',   '--table-header-fg','--table-header-bg',  'text'),
    ('table cell fg/surface','--table-cell-fg',  '--surface',          'text'),
    ('nav active fg/bg',     '--nav-active-fg',  '--nav-active-bg',    'text'),
    # التنبيهات (نص على خلفية التنبيه)
    ('alert.ok text/bg',     '--alert-ok-text',     '--alert-ok-bg',     'text'),
    ('alert.ok title/bg',    '--alert-ok-title',    '--alert-ok-bg',     'text'),
    ('alert.warn text/bg',   '--alert-warn-text',   '--alert-warn-bg',   'text'),
    ('alert.warn title/bg',  '--alert-warn-title',  '--alert-warn-bg',   'text'),
    ('alert.err text/bg',    '--alert-err-text',    '--alert-err-bg',    'text'),
    ('alert.err title/bg',   '--alert-err-title',   '--alert-err-bg',    'text'),
    ('alert.info text/bg',   '--alert-info-text',   '--alert-info-bg',   'text'),
    ('alert.info title/bg',  '--alert-info-title',  '--alert-info-bg',   'text'),
    # نص العلامة على خلفية الصفحة (روابط/عناوين ملوّنة)
    ('brand-ink / background', '--brand-ink', '--background', 'text'),
    ('brand-ink / surface',    '--brand-ink', '--surface',    'text'),
]
MIN = {'text': 4.5, 'ui': 3.0}

def run():
    rows = []
    for mode in ('light', 'dark'):
        for label, fg, bg, kind in PAIRS:
            cf, cb = resolve(fg, mode), resolve(bg, mode)
            rf, rb = to_rgb(cf), to_rgb(cb)
            if not rf or not rb:
                rows.append((mode, label, None, kind, cf, cb)); continue
            rows.append((mode, label, ratio(rf, rb), kind, cf, cb))
    fails = [r for r in rows if r[2] is not None and r[2] < MIN[r[3]]]
    unresolved = [r for r in rows if r[2] is None]
    print('\n' + '='*70)
    print('  M7asmari — تدقيق تباين الثيم (WCAG AA · text≥4.5 · ui≥3.0)')
    print('='*70)
    if not fails:
        print('\n  ✅ PASS — كل الأزواج تستوفي WCAG AA في Light وDark')
    else:
        print(f'\n  ❌ {len(fails)} زوج دون AA:\n')
        for mode, label, r, kind, cf, cb in fails:
            print(f'  [{mode:5}] {label:26} {r:4.2f}:1  (حدّ {MIN[kind]})  fg={cf} bg={cb}')
    if unresolved:
        print('\n  ⚠ لم تُحلّ (تحقّق يدوي):')
        for mode, label, _, _, cf, cb in unresolved:
            print(f'  [{mode:5}] {label}: fg={cf} bg={cb}')
    # ملخّص أدنى النسب لكل زوج عبر الوضعين
    print('\n  ── أدنى نسبة لكل زوج (عبر الوضعين) ──')
    by = {}
    for mode, label, r, kind, cf, cb in rows:
        if r is None: continue
        by.setdefault(label, (r, kind, mode))
        if r < by[label][0]: by[label] = (r, kind, mode)
    for label in sorted(by, key=lambda k: by[k][0]):
        r, kind, mode = by[label]
        mark = '✓' if r >= MIN[kind] else '✗'
        print(f'  {mark} {label:28} أدنى {r:5.2f}:1  ({mode})')
    print('\n' + '='*70)
    return 1 if fails else 0

sys.exit(run())
