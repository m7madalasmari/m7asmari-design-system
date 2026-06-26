export function css(v) {
  if (v == null) return undefined;
  if (typeof v === 'object') return v;
  const o = {};
  String(v).split(';').forEach((d) => {
    const i = d.indexOf(':'); if (i < 0) return;
    let k = d.slice(0, i).trim(); const val = d.slice(i + 1).trim();
    if (!k) return;
    if (k.startsWith('--')) { o[k] = val; return; }
    k = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    o[k] = val;
  });
  return o;
}
