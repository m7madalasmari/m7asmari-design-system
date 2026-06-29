#!/usr/bin/env python3
"""Generate dashboardkit.dev.html — a no-build, no-Node preview of the Dashboard Kit.
Mirrors the Vite entry (dashboardkit.html + app/dashboardkit.jsx) by concatenating the SAME source
(lib + docs + components + patterns + kit + DashboardKitPage) into one Babel-standalone script with global React.
The Vite project is authoritative; this is a convenience preview that mirrors it 1:1."""
import os, glob, hashlib
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def strip(src):
    out, lines, i = [], src.splitlines(), 0
    while i < len(lines):
        ln = lines[i]
        s = ln.strip()
        if s.startswith('import '):                 # drop ESM imports (React global, rest in-scope)
            while ';' not in lines[i] and i < len(lines) - 1:
                i += 1
            i += 1
            continue
        if s.startswith('export default function '):
            ln = ln.replace('export default function ', 'function ')
        elif s.startswith('export default '):        # `export default IDENT;` → drop
            i += 1
            continue
        elif s.startswith('export {'):
            i += 1
            continue
        else:
            ln = ln.replace('export function ', 'function ').replace('export const ', 'const ')
        out.append(ln)
        i += 1
    return '\n'.join(out)


def rel(p):
    return os.path.relpath(p, ROOT)


libs = ['app/lib/css.js'] + sorted(rel(p) for p in glob.glob(os.path.join(ROOT, 'app', 'lib', '*.js')) if os.path.basename(p) != 'css.js')
docs = sorted(rel(p) for p in glob.glob(os.path.join(ROOT, 'docs', '*.jsx')))
comps = sorted(rel(p) for p in glob.glob(os.path.join(ROOT, 'components', '**', '*.jsx'), recursive=True))
chrome = sorted(rel(p) for p in glob.glob(os.path.join(ROOT, 'app', 'chrome', '*.jsx')))
patterns = sorted(rel(p) for p in glob.glob(os.path.join(ROOT, 'patterns', '*.jsx')))
kit_data = ['kits/dashboard/data.js', 'kits/dashboard/DashboardCard.jsx']
recipes = sorted(rel(p) for p in glob.glob(os.path.join(ROOT, 'kits', 'dashboard', 'recipes', '*.jsx')))
registry = ['kits/dashboard/index.js']
page = ['app/DashboardKitPage.jsx']
order = libs + docs + comps + chrome + patterns + kit_data + recipes + registry + page

parts = [strip(open(os.path.join(ROOT, p), encoding='utf-8').read()) for p in order]
mount = ('\n\nconst { createRoot } = ReactDOM;\n'
         'createRoot(document.getElementById("root")).render(<DashboardKitPage />);\n'
         'if (location.search.indexOf("dark") >= 0 || location.hash === "#dark") { setTimeout(function(){ var el = document.querySelector(".ds"); if (el) el.classList.add("dark"); }, 80); }\n'
         'var rm = location.search.match(/recipe=([a-z]+)/); if (rm) setTimeout(function(){ var b = document.getElementById("dk-btn-" + rm[1]); if (b) b.click(); }, 140);\n'
         'var sm = location.search.match(/scroll=(\\d+)/); if (sm) setTimeout(function(){ window.scrollTo(0, parseInt(sm[1], 10)); }, 260);\n')
bundle = '\n\n'.join(parts) + mount

html = '''<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Dashboard Kit — dev preview</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2032%2032'%3E%3Crect%20width='32'%20height='32'%20rx='7'%20fill='%2300a6ef'/%3E%3Ctext%20x='16'%20y='23'%20font-family='system-ui'%20font-size='19'%20font-weight='800'%20fill='%23fff'%20text-anchor='middle'%3EM%3C/text%3E%3C/svg%3E" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
__CSS_LINKS__
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
# روابط CSS مع بصمة محتوى لتفادي كاش المتصفّح في المعاينة
css_files = ['tokens/primitive.css', 'tokens/semantic.css', 'tokens/component.css',
             'tokens/pattern.css', 'styles/base.css', 'styles/components.css']
ver = hashlib.md5(''.join(open(os.path.join(ROOT, f), encoding='utf-8').read() for f in css_files).encode('utf-8')).hexdigest()[:8]
css_links = '\n'.join('<link rel="stylesheet" href="%s?v=%s" />' % (f, ver) for f in css_files)
html = html.replace('__CSS_LINKS__', css_links)

open(os.path.join(ROOT, 'dashboardkit.dev.html'), 'w', encoding='utf-8').write(html)
print('wrote dashboardkit.dev.html  (bundle', len(bundle), 'chars from', len(order), 'modules)')
