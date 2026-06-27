/* M7asmari — محرّك توليد رموز السمة (Phase 3 · Theme Builder)
   دوال خالصة بلا React: تحوّل خيارات المستخدم إلى متغيّرات CSS قابلة للتطبيق والتصدير.
   لا تبعيات خارجية — مشتقّات الألوان تُحسب يدويًا (HSL) لتعمل في كلا البناءين (Vite + dev preview). */

// ===== أدوات الألوان =====
export function tbClamp(n, lo, hi) { return Math.min(hi, Math.max(lo, n)); }

export function hexToRgb(hex) {
  let h = String(hex == null ? '' : hex).trim().replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}

export function rgbToHex(r, g, b) {
  const f = (n) => tbClamp(Math.round(n), 0, 255).toString(16).padStart(2, '0');
  return '#' + f(r) + f(g) + f(b);
}

export function rgbToHsl(rgb) {
  let r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, d = max - min;
  let h = 0, s = 0;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d) % 6; else if (max === g) h = (b - r) / d + 2; else h = (r - g) / d + 4;
    h *= 60; if (h < 0) h += 360;
  }
  return { h, s: s * 100, l: l * 100 };
}

export function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; } else if (h < 120) { r = x; g = c; } else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; } else if (h < 300) { r = x; b = c; } else { r = c; b = x; }
  return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}

export function hexToHsl(hex) { const rgb = hexToRgb(hex); return rgb ? rgbToHsl(rgb) : { h: 0, s: 0, l: 0 }; }

// مشتقّات لون البراند: نص داكن/فاتح (ink) وتعبئة ناعمة (soft) وحلقة تركيز (ring) حسب الوضع
export function deriveAccent(hex, mode) {
  const rgb = hexToRgb(hex) || { r: 0, g: 166, b: 239 };
  const safe = rgbToHex(rgb.r, rgb.g, rgb.b);
  const { h, s } = rgbToHsl(rgb);
  if (mode === 'dark') {
    return {
      base: safe,
      ink: hslToHex(h, tbClamp(s, 35, 92), 78),
      soft: hslToHex(h, tbClamp(s, 25, 60), 18),
      ring: '0 0 0 3px rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',.45)',
    };
  }
  return {
    base: safe,
    ink: hslToHex(h, tbClamp(s, 35, 85), 32),
    soft: hslToHex(h, tbClamp(s, 30, 90), 92),
    ring: '0 0 0 3px rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',.4)',
  };
}

// ===== جداول الأنماط (presets) =====
export const RADIUS_PRESETS = {
  sharp:   { xs: '3px',  sm: '4px',  md: '6px',  lg: '8px',  xl: '10px', full: '8px' },
  soft:    { xs: '5px',  sm: '7px',  md: '10px', lg: '14px', xl: '18px', full: '999px' },
  rounded: { xs: '7px',  sm: '10px', md: '14px', lg: '20px', xl: '28px', full: '999px' },
  pill:    { xs: '14px', sm: '18px', md: '24px', lg: '30px', xl: '40px', full: '999px' },
};

export const DENSITY_PRESETS = {
  compact:     { btnY: '9px',  btnX: '18px', inputY: '9px',  inputX: '13px', pad: '18px', gap: '12px', field: '10px' },
  comfortable: { btnY: '13px', btnX: '24px', inputY: '12px', inputX: '15px', pad: '24px', gap: '16px', field: '14px' },
  spacious:    { btnY: '16px', btnX: '30px', inputY: '15px', inputX: '18px', pad: '32px', gap: '22px', field: '18px' },
};

export const FONT_PRESETS = {
  official:  { ui: "'Thmanyah Sans',system-ui,-apple-system,sans-serif", display: "'Thmanyah Serif','Thmanyah Sans',Georgia,serif" },
  friendly:  { ui: "system-ui,-apple-system,'Segoe UI',sans-serif",       display: "system-ui,-apple-system,'Segoe UI',sans-serif" },
  editorial: { ui: "'Thmanyah Serif Text',Georgia,serif",                 display: "'Thmanyah Serif','Thmanyah Serif Text',Georgia,serif" },
  technical: { ui: "'Thmanyah Sans',system-ui,sans-serif",                display: "'JetBrains Mono',ui-monospace,monospace" },
};

export const MOTION_PRESETS = {
  none:   { fast: '0ms',   base: '0ms',   slow: '0ms' },
  subtle: { fast: '90ms',  base: '130ms', slow: '200ms' },
  smooth: { fast: '120ms', base: '180ms', slow: '320ms' },
};

// الإعدادات الافتراضية تطابق رموز النظام الأصلية (tokens.css)
export const DEFAULT_CONFIG = {
  primary: '#00a6ef',
  secondary: '#8b5cf6',
  mode: 'light',
  radius: 'rounded',
  density: 'comfortable',
  card: 'bordered',
  button: 'solid',
  font: 'official',
  motion: 'smooth',
};

export const CONFIG_KEYS = Object.keys(DEFAULT_CONFIG);

// يدمج إدخالًا جزئيًا مع الافتراضي ويتجاهل المفاتيح غير المعروفة (متانة تحميل localStorage)
export function normalizeConfig(input) {
  const out = Object.assign({}, DEFAULT_CONFIG);
  if (input && typeof input === 'object') {
    CONFIG_KEYS.forEach((k) => { if (input[k] != null) out[k] = input[k]; });
  }
  return out;
}

// النواة: خيارات → { config, vars (متغيّرات CSS), classes (أصناف المعاينة للخيارات غير المُرمَّزة) }
export function buildThemeTokens(input) {
  const config = normalizeConfig(input);
  const acc = deriveAccent(config.primary, config.mode);
  const acc2 = deriveAccent(config.secondary, config.mode);
  const rad = RADIUS_PRESETS[config.radius] || RADIUS_PRESETS.rounded;
  const den = DENSITY_PRESETS[config.density] || DENSITY_PRESETS.comfortable;
  const fnt = FONT_PRESETS[config.font] || FONT_PRESETS.official;
  const mot = MOTION_PRESETS[config.motion] || MOTION_PRESETS.smooth;

  const vars = {
    '--brand': acc.base, '--brand-ink': acc.ink, '--brand-soft': acc.soft, '--focus-ring': acc.ring,
    '--accent-2': acc2.base, '--accent-2-ink': acc2.ink, '--accent-2-soft': acc2.soft,
    '--radius-xs': rad.xs, '--radius-sm': rad.sm, '--radius-md': rad.md, '--radius-lg': rad.lg, '--radius-xl': rad.xl, '--radius-full': rad.full,
    '--font-ui': fnt.ui, '--font-display': fnt.display,
    '--dur-fast': mot.fast, '--dur': mot.base, '--dur-slow': mot.slow,
    // متغيّرات الكثافة — تستهلكها قواعد ‎.tb-preview‎ في theme-builder.css (الحشوة غير مُرمَّزة في النظام الأصلي)
    '--tb-btn-py': den.btnY, '--tb-btn-px': den.btnX, '--tb-input-py': den.inputY, '--tb-input-px': den.inputX,
    '--tb-pad': den.pad, '--tb-gap': den.gap, '--tb-field-gap': den.field,
  };

  const classes = [
    config.mode === 'dark' ? 'dark' : '',
    'dens-' + config.density,
    'card-' + config.card,
    'btn-' + config.button,
    'motion-' + config.motion,
  ].filter(Boolean);

  return { config: config, vars: vars, classes: classes };
}

// ===== المُصدّرات (بنفس هيكلة طبقات النظام: primitive · semantic · component) =====

// يقسّم متغيّرات السمة على الطبقات حسب اسم المفتاح
function layerOf(key) {
  if (key.indexOf('--radius-') === 0 || key.indexOf('--dur') === 0) return 'primitive';
  if (key.indexOf('--tb-') === 0) return 'component';
  return 'semantic'; // --brand* · --accent-2* · --focus-ring · --font-*
}

export function tokensToCss(input) {
  const built = buildThemeTokens(input);
  const c = built.config, vars = built.vars;
  const groups = { primitive: [], semantic: [], component: [] };
  Object.keys(vars).forEach((k) => { groups[layerOf(k)].push('  ' + k + ': ' + vars[k] + ';'); });
  const LABEL = { primitive: 'Primitive — مقاييس خام', semantic: 'Semantic — مفردات دلالية', component: 'Component — كثافة المكوّنات' };
  const out = [
    '/* M7asmari — رموز السمة المُخصّصة (Theme Builder) */',
    '/* الوضع: ' + c.mode + ' · الحوافّ: ' + c.radius + ' · الكثافة: ' + c.density +
      ' · البطاقة: ' + c.card + ' · الزر: ' + c.button + ' · الخط: ' + c.font + ' · الحركة: ' + c.motion + ' */',
    ':root {',
  ];
  ['primitive', 'semantic', 'component'].forEach((layer) => {
    if (!groups[layer].length) return;
    out.push('  /* — ' + LABEL[layer] + ' — */');
    out.push.apply(out, groups[layer]);
  });
  out.push('}');
  return out.join('\n');
}

export function tokensToJson(input) {
  const built = buildThemeTokens(input);
  const v = built.vars;
  return JSON.stringify({
    $schema: 'm7asmari.theme/v2',
    options: built.config,
    // مرتّبة حسب طبقات نظام التوكنز نفسها
    primitive: {
      radius: { xs: v['--radius-xs'], sm: v['--radius-sm'], md: v['--radius-md'], lg: v['--radius-lg'], xl: v['--radius-xl'], full: v['--radius-full'] },
      motion: { fast: v['--dur-fast'], base: v['--dur'], slow: v['--dur-slow'] },
    },
    semantic: {
      brand: { base: v['--brand'], ink: v['--brand-ink'], soft: v['--brand-soft'], ring: v['--focus-ring'] },
      accent: { base: v['--accent-2'], ink: v['--accent-2-ink'], soft: v['--accent-2-soft'] },
      typography: { ui: v['--font-ui'], display: v['--font-display'] },
    },
    component: {
      density: { btnY: v['--tb-btn-py'], btnX: v['--tb-btn-px'], inputY: v['--tb-input-py'], inputX: v['--tb-input-px'], pad: v['--tb-pad'], gap: v['--tb-gap'], field: v['--tb-field-gap'] },
    },
  }, null, 2);
}
