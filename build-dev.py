#!/usr/bin/env python3
"""Generate index.dev.html — a no-build, no-Node local preview.
Concatenates the SAME app/ source into one Babel-standalone script (global React from UMD),
so module resolution is never needed. The Vite project (index.html + app/main.jsx) is the
primary/authoritative source; this is only a convenience preview that mirrors it 1:1."""
import os
ROOT = os.path.dirname(os.path.abspath(__file__))

def strip(src):
    out = []
    for ln in src.splitlines():
        s = ln.strip()
        if s.startswith('import '):           # drop ESM imports (React is global, others in-scope)
            continue
        if s == 'export default App;':
            continue
        ln = ln.replace('export default function ', 'function ')
        ln = ln.replace('export function ', 'function ')
        ln = ln.replace('export const ', 'const ')
        out.append(ln)
    return '\n'.join(out)

_d = sorted('docs/'+x for x in os.listdir(os.path.join(ROOT,'docs')) if x.endswith('.jsx'))
_c = sorted('components/'+x for x in os.listdir(os.path.join(ROOT,'components')) if x.endswith('.jsx'))
import glob as _glob
_s = sorted(os.path.relpath(p, ROOT) for p in _glob.glob(os.path.join(ROOT,'sections','**','*.jsx'), recursive=True))
_p = sorted('patterns/'+x for x in os.listdir(os.path.join(ROOT,'patterns')) if x.endswith('.jsx')) if os.path.isdir(os.path.join(ROOT,'patterns')) else []
order = ['app/lib/css.js'] + _d + _c + _p + _s + ['app/chrome/TopBar.jsx','app/chrome/SideRail.jsx','app/chrome/Hero.jsx','app/chrome/CommandPalette.jsx','app/App.jsx']
parts = [strip(open(os.path.join(ROOT, p)).read()) for p in order]
mount = '\n\nconst { createRoot } = ReactDOM;\ncreateRoot(document.getElementById("root")).render(<App />);\n'
bundle = '\n\n'.join(parts) + mount

html = '''<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>M7asmari Design System — dev preview</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2032%2032'%3E%3Crect%20width='32'%20height='32'%20rx='7'%20fill='%2300a6ef'/%3E%3Ctext%20x='16'%20y='23'%20font-family='system-ui'%20font-size='19'%20font-weight='800'%20fill='%23fff'%20text-anchor='middle'%3EM%3C/text%3E%3C/svg%3E" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="tokens/tokens.css" />
<link rel="stylesheet" href="tokens/themes.css" />
<link rel="stylesheet" href="styles/base.css" />
<link rel="stylesheet" href="styles/components.css" />
<script src="vendor/react.production.min.js"></script>
<script src="vendor/react-dom.production.min.js"></script>
<script src="vendor/lucide.min.js"></script>
<script src="vendor/babel.min.js"></script>
</head>
<body>
<div id="root"></div>
<script type="text/babel" data-presets="react">
''' + bundle + '''
</script>
</body>
</html>
'''
open(os.path.join(ROOT, 'index.dev.html'), 'w').write(html)
print('wrote index.dev.html  (bundle', len(bundle), 'chars from', len(order), 'modules)')
