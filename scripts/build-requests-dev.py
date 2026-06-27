#!/usr/bin/env python3
"""Generate requests.dev.html — a no-build, no-Node local preview of the standalone
«منصّة الطلبات» page (app/RequestsPage.jsx). Mirrors build-dev.py 1:1 but bundles only
the modules this page composes. The Vite project (requests.html + app/requests.jsx) is the
primary/authoritative source; this is only a convenience preview for machines without Node."""
import os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def strip(src):
    out = []
    lines = src.splitlines()
    i = 0
    while i < len(lines):
        ln = lines[i]
        s = ln.strip()
        if s.startswith('import '):           # drop ESM imports (incl. multi-line)
            while ';' not in lines[i] and i < len(lines) - 1:
                i += 1
            i += 1
            continue
        ln = ln.replace('export default function ', 'function ')
        ln = ln.replace('export function ', 'function ')
        ln = ln.replace('export const ', 'const ')
        out.append(ln)
        i += 1
    return '\n'.join(out)

# نفس ترتيب تبعيات الصفحة (من imports app/RequestsPage.jsx): مساعد css ثم ذرّات ثم ترويسة القسم ثم الصفحة.
order = [
    'app/lib/css.js',
    'components/atoms/Button.jsx',
    'components/atoms/Badge.jsx',
    'components/atoms/EmptyState.jsx',
    'docs/SectionHeader.jsx',
    'app/RequestsPage.jsx',
]
parts = [strip(open(os.path.join(ROOT, p)).read()) for p in order]
mount = '\n\nconst { createRoot } = ReactDOM;\ncreateRoot(document.getElementById("root")).render(<RequestsPage />);\n'
bundle = '\n\n'.join(parts) + mount

html = '''<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>منصّة الطلبات — dev preview</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2032%2032'%3E%3Crect%20width='32'%20height='32'%20rx='7'%20fill='%2300a6ef'/%3E%3Ctext%20x='16'%20y='23'%20font-family='system-ui'%20font-size='19'%20font-weight='800'%20fill='%23fff'%20text-anchor='middle'%3EM%3C/text%3E%3C/svg%3E" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="tokens/primitive.css" />
<link rel="stylesheet" href="tokens/semantic.css" />
<link rel="stylesheet" href="tokens/component.css" />
<link rel="stylesheet" href="tokens/pattern.css" />
<link rel="stylesheet" href="styles/base.css" />
<link rel="stylesheet" href="styles/components.css" />
<link rel="stylesheet" href="styles/requests.css" />
<script src="vendor/react.production.min.js"></script>
<script src="vendor/react-dom.production.min.js"></script>
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
open(os.path.join(ROOT, 'requests.dev.html'), 'w').write(html)
print('wrote requests.dev.html  (bundle', len(bundle), 'chars from', len(order), 'modules)')
