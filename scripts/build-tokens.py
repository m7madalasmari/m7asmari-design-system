#!/usr/bin/env python3
"""M7asmari — Token Build  (`python3 scripts/build-tokens.py`)

يقرأ مصدر التوكنز الأساسي DTCG / W3C Design Tokens (tokens/primitive.tokens.json)
ويولّد منه tokens/primitive.css **مطابقًا بايتيًّا** للملف الحالي:
  مصدر واحد (DTCG)  →  مخرَج مشتقّ (CSS Custom Properties).

الخريطة DTCG → CSS:
  • كل توكن { "$value": v } تحت مجموعة بادئتها P واسم مفتاحه K  →  ‏`--P-K:v;` (بادئة فارغة ⇒ `--K:v;`).
  • التوكنات تُسرَد على سطر واحد لكل مجموعة/مجموعة فرعية، بلا مسافات، يفصلها `;`.
  • التعليقات ومرتّبات المجموعات تُقرأ من `$extensions["com.m7asmari.css"]`:
        header / selector / groupOrder / subgroupOrder / comment(s) / prefix.
  • سطر فارغ يسبق كل مجموعة عليا (عدا الأولى مباشرة بعد `:root{`).

النطاق: الطبقات الأربع كلّها.
  • primitive  → نموذج «مجموعات» (group-based): محدِّد واحد، prefix لكل مجموعة.
  • semantic / component / pattern → نموذج «كتل» (blocks): عدّة محدِّدات لكل ملف
    (:root, .dark, .ds.acc-green, .ds.acc-red, .ds.sharp ; و":root, .dark")،
    وقيم var()/color-mix()/hex حرفيّة. لكل كتلة محدِّدها وترتيب تصاريحها ونصّها
    الحرفيّ وتعليقاتها المتداخلة محفوظة في $extensions["com.m7asmari.css"]
    (format:"blocks") لإعادة إنتاج المخرَج بايتيًّا.
لا يتطلّب Node. أسلوبه متوافق مع scripts/audit.py."""
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# (مصدر DTCG → مخرَج CSS) لكل طبقة. primitive أوّلًا (نموذج المجموعات) ثم الكتل.
LAYERS = [
    ('primitive', 'primitive.tokens.json', 'primitive.css'),
    ('semantic',  'semantic.tokens.json',  'semantic.css'),
    ('component', 'component.tokens.json', 'component.css'),
    ('pattern',   'pattern.tokens.json',   'pattern.css'),
]

CSS_EXT = 'com.m7asmari.css'


def css_meta(node):
    """يعيد بيانات الإخراج CSS لعقدة مجموعة (قد تكون غائبة)."""
    return (node.get('$extensions') or {}).get(CSS_EXT, {})


def is_token(node):
    return isinstance(node, dict) and '$value' in node


def child_groups(node):
    """يعيد (key, child) للمجموعات/التوكنات الأبناء فقط (يتجاهل مفاتيح $)."""
    return [(k, v) for k, v in node.items()
            if not k.startswith('$') and isinstance(v, dict)]


def ordered(node, order_key):
    """يرتّب الأبناء حسب subgroupOrder إن وُجد، وإلا حسب ترتيب الإدراج."""
    items = dict(child_groups(node))
    order = css_meta(node).get(order_key)
    if order:
        return [(k, items[k]) for k in order if k in items]
    return list(items.items())


def token_decls(group, prefix):
    """يعيد قائمة `--prefix-key:value;` لكل توكن في مجموعة (أبناء مباشرون فيهم $value)."""
    out = []
    for k, v in group.items():
        if k.startswith('$') or not is_token(v):
            continue
        name = f'{prefix}-{k}' if prefix else k
        out.append(f'--{name}:{v["$value"]};')
    return out


def emit_decls(group, meta, lines):
    """يضيف تصاريح مجموعة: سطر لكل توكن إن oneTokenPerLine، وإلا سطر واحد مُجمَّع."""
    decls = token_decls(group, meta.get('prefix', ''))
    if meta.get('oneTokenPerLine'):
        for d in decls:
            lines.append('  ' + d)
    else:
        lines.append('  ' + ''.join(decls))


def emit_group(node, lines):
    """يضيف أسطر مجموعة عليا (تعليقات + سطر/أسطر توكنات) إلى lines."""
    meta = css_meta(node)
    for c in meta.get('comments', []):
        lines.append('  ' + c)

    # مجموعة بها توكنات مباشرة.
    if any(is_token(v) for _, v in child_groups(node)):
        emit_decls(node, meta, lines)
        return

    # مجموعة بمجموعات فرعية → كل مجموعة فرعية على حدة (مع تعليقها إن وُجد).
    for _, sub in ordered(node, 'subgroupOrder'):
        smeta = css_meta(sub)
        if 'comment' in smeta:
            lines.append('  ' + smeta['comment'])
        emit_decls(sub, smeta, lines)


def build_blocks(data):
    """نموذج «الكتل»: ملف بعدّة محدِّدات. كل كتلة = block-N تحت الجذر، تحمل في
    $extensions.com.m7asmari.css: selector + (oneline+keys) أو lines، و pre/noBlankBefore.
    قيمة كل تصريح تؤخذ حرفيًّا من css.decl للتوكن — فيُحفظ التحاذي والمسافات بايتيًّا."""
    root_meta = css_meta(data)
    lines = list(root_meta.get('header', []))

    for bid in root_meta.get('blockOrder', []):
        block = data[bid]
        bmeta = css_meta(block)
        if not bmeta.get('noBlankBefore'):
            lines.append('')
        lines.extend(bmeta.get('pre', []))

        def decl(key):
            return css_meta(block[key])['decl']

        if bmeta.get('oneline'):
            body = ''.join(decl(k) for k in bmeta['keys'])
            lines.append(f'{bmeta["selector"]}{{{body}}}')
            continue

        lines.append(f'{bmeta["selector"]}{{')
        for ln in bmeta.get('lines', []):
            if ln.get('blank'):
                lines.append('')
            elif 'raw' in ln:
                lines.append(ln['raw'])
            else:
                body = ''.join(decl(k) for k in ln['decls'])
                lines.append('  ' + body + ln.get('trailing', ''))
        lines.append('}')

    return '\n'.join(lines) + '\n'


def build(data):
    root_meta = css_meta(data)
    selector = root_meta.get('selector', ':root')

    lines = list(root_meta.get('header', []))
    lines.append('')
    lines.append(selector + '{')

    group_order = root_meta.get('groupOrder') or [k for k, _ in child_groups(data)]
    for gi, gname in enumerate(group_order):
        if gname not in data:
            continue
        # سطر فاصل قبل كل مجموعة عليا، عدا الأولى والمجموعات التي تُكمل كتلة سابقة.
        if gi > 0 and not css_meta(data[gname]).get('noBlankBefore'):
            lines.append('')
        emit_group(data[gname], lines)

    lines.append('}')
    return '\n'.join(lines) + '\n'


def main():
    for _, src_name, out_name in LAYERS:
        src = os.path.join(ROOT, 'tokens', src_name)
        out = os.path.join(ROOT, 'tokens', out_name)
        with open(src, encoding='utf-8') as f:
            data = json.load(f)
        # اختيار النموذج: «الكتل» إن صُرِّح به، وإلا «المجموعات» (primitive).
        if css_meta(data).get('format') == 'blocks':
            css = build_blocks(data)
        else:
            css = build(data)
        with open(out, 'w', encoding='utf-8') as f:
            f.write(css)
        print(f'wrote {out}  ({len(css.encode("utf-8"))} bytes)')


if __name__ == '__main__':
    sys.exit(main())
