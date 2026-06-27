#!/usr/bin/env python3
"""M7asmari — Theme Token Mapping Audit.
لكل توكن دلالي/مكوّن: القيمة في Light وDark + هل يتحوّل + أين يُستخدم.
يكشف الفجوات: توكن لوني لا يتحوّل في الدارك رغم استخدامه على أسطح متفاعلة.
تشغيل: python3 scripts/token_map.py"""
import os, re, glob, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

root_defs, dark_defs, order = {}, {}, []
for f in sorted(glob.glob('tokens/*.css')):
    txt = re.sub(r'/\*.*?\*/', '', open(f).read(), flags=re.S)
    for m in re.finditer(r'([^{}]+)\{([^}]*)\}', txt):
        sels = [s.strip() for s in m.group(1).split(',')]
        for d in re.finditer(r'(--[a-z0-9-]+)\s*:\s*([^;]+);', m.group(2)):
            name, val = d.group(1), d.group(2).strip()
            for sel in sels:
                if sel == ':root':
                    if name not in root_defs: order.append(name)
                    root_defs[name] = val
                elif sel == '.dark':
                    dark_defs[name] = val

def resolve(name, mode, seen=None):
    seen = seen or set()
    if name in seen: return None
    seen.add(name)
    table = dict(root_defs);
    if mode == 'dark': table.update(dark_defs)
    v = table.get(name)
    if v is None: return None
    m = re.fullmatch(r'var\((--[a-z0-9-]+)\)', v.strip())
    return resolve(m.group(1), mode, seen) if m else v.strip()

# used-by: ابحث عن استهلاك var(--token) في الأنماط والمكوّنات
CONSUMERS = glob.glob('styles/*.css') + glob.glob('components/**/*.jsx', recursive=True) + \
            glob.glob('sections/**/*.jsx', recursive=True) + glob.glob('app/**/*.jsx', recursive=True) + \
            glob.glob('patterns/*.jsx')
usage = {}
for f in CONSUMERS:
    txt = open(f).read()
    for tok in re.findall(r'var\((--[a-z0-9-]+)', txt):
        usage.setdefault(tok, set()).add(os.path.basename(f))

def used_by(name):
    fs = usage.get(name, set())
    if not fs: return '—'
    return f'{len(fs)} ملف' + (': ' + ', '.join(sorted(fs)[:3]) + ('…' if len(fs) > 3 else ''))

# التوكنز المطلوبة في الجدول (دلالي ثم مكوّن)
SEMANTIC = ['--background','--surface','--surface-muted','--surface-elevated',
            '--text-primary','--text-secondary','--text-muted','--border','--border-strong',
            '--brand','--brand-hover','--brand-ink','--brand-soft','--focus-ring',
            '--success','--success-ink','--success-soft','--warning','--warning-ink','--warning-soft',
            '--danger','--danger-ink','--danger-soft','--info','--info-ink','--info-soft']
COMPONENT = [t for t in order if re.match(r'--(btn|card|input|badge|alert|table|nav|stat|fg-on)', t)]

def row(name):
    lt, dk = resolve(name, 'light'), resolve(name, 'dark')
    changes = '—' if lt == dk else 'يتحوّل'
    return (name, lt or '?', dk or '?', changes, used_by(name))

def section(title, names):
    print(f'\n### {title}')
    print(f'{"token":26} | {"light":34} | {"dark":34} | {"Δ":7} | used-by')
    print('-'*150)
    for n in names:
        name, lt, dk, ch, ub = row(n)
        print(f'{name:26} | {lt:34} | {dk:34} | {ch:7} | {ub}')

# فجوات محتملة: توكن لوني (hex) لا يتحوّل في الدارك لكنه مستخدم
def gaps():
    print('\n### فجوات دارك محتملة (لون ثابت عبر الوضعين + مستخدم على أسطح متفاعلة)')
    flagged = []
    for n in SEMANTIC:
        lt, dk = resolve(n, 'light'), resolve(n, 'dark')
        if lt == dk and lt and lt.startswith('#') and n in usage:
            flagged.append((n, lt, used_by(n)))
    # focus-ring (rgba) مستقلّ
    fr_l, fr_d = resolve('--focus-ring','light'), resolve('--focus-ring','dark')
    if fr_l == fr_d:
        flagged.append(('--focus-ring', fr_l, used_by('--focus-ring')))
    if not flagged:
        print('  لا فجوات')
    for n, v, ub in flagged:
        print(f'  ⚠ {n} = {v} (ثابت) — {ub}')

section('Semantic tokens', SEMANTIC)
section('Component tokens', COMPONENT)
gaps()
print()
