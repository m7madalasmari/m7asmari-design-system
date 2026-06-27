import { describe, it, expect } from 'vitest';
import {
  DEFAULT_CONFIG, normalizeConfig, buildThemeTokens, tokensToCss, tokensToJson,
  deriveAccent, hexToRgb, hslToHex, RADIUS_PRESETS,
} from '../app/lib/themeTokens.js';

describe('themeTokens — أدوات الألوان', () => {
  it('hexToRgb يقبل 6 و3 خانات ويرفض غير الصالح', () => {
    expect(hexToRgb('#00a6ef')).toEqual({ r: 0, g: 166, b: 239 });
    expect(hexToRgb('#0af')).toEqual({ r: 0, g: 170, b: 255 });
    expect(hexToRgb('نص')).toBeNull();
  });

  it('hslToHex يعيد قيمة hex صالحة', () => {
    expect(hslToHex(206, 100, 47)).toMatch(/^#[0-9a-f]{6}$/);
  });

  it('deriveAccent يولّد مشتقّات مختلفة للوضعين', () => {
    const light = deriveAccent('#00a6ef', 'light');
    const dark = deriveAccent('#00a6ef', 'dark');
    expect(light.base).toBe('#00a6ef');
    expect(light.ink).toMatch(/^#[0-9a-f]{6}$/);
    expect(light.soft).toMatch(/^#[0-9a-f]{6}$/);
    expect(light.ring).toContain('rgba(0,166,239');
    // الوضع الداكن: tint أغمق ونص أفتح → soft مختلف عن الفاتح
    expect(dark.soft).not.toBe(light.soft);
  });

  it('deriveAccent يتراجع للون افتراضي عند مدخل تالف', () => {
    expect(deriveAccent('#zzz', 'light').base).toMatch(/^#[0-9a-f]{6}$/);
  });
});

describe('themeTokens — normalizeConfig', () => {
  it('يملأ الافتراضيات ويتجاهل المفاتيح غير المعروفة', () => {
    const out = normalizeConfig({ primary: '#fff', bogus: 1 });
    expect(out.primary).toBe('#fff');
    expect(out.mode).toBe(DEFAULT_CONFIG.mode);
    expect('bogus' in out).toBe(false);
  });

  it('يتعامل مع مدخل فارغ', () => {
    expect(normalizeConfig(null)).toEqual(DEFAULT_CONFIG);
  });
});

describe('themeTokens — buildThemeTokens', () => {
  it('الافتراضي يولّد كل المتغيّرات المتوقّعة', () => {
    const { vars, classes } = buildThemeTokens(DEFAULT_CONFIG);
    expect(vars['--brand']).toBe('#00a6ef');
    expect(vars['--radius-md']).toBe('14px');
    expect(vars['--font-ui']).toContain('Thmanyah');
    expect(vars['--dur']).toBe('180ms');
    expect(vars['--tb-pad']).toBe('24px');
    expect(classes).toContain('card-bordered');
    expect(classes).toContain('btn-solid');
    expect(classes).not.toContain('dark');
  });

  it('الوضع الداكن يضيف صنف dark', () => {
    const { classes } = buildThemeTokens({ mode: 'dark' });
    expect(classes).toContain('dark');
  });

  it('نمط الحوافّ الحادّ يطبّق مقياس sharp', () => {
    const { vars } = buildThemeTokens({ radius: 'sharp' });
    expect(vars['--radius-md']).toBe(RADIUS_PRESETS.sharp.md);
    expect(vars['--radius-full']).toBe('8px');
  });

  it('بلا حركة يصفّر المُدد', () => {
    const { vars, classes } = buildThemeTokens({ motion: 'none' });
    expect(vars['--dur']).toBe('0ms');
    expect(classes).toContain('motion-none');
  });
});

describe('themeTokens — المُصدّرات', () => {
  it('tokensToCss يُخرج كتلة ‎:root‎ صالحة بمتغيّرات البراند', () => {
    const css = tokensToCss(DEFAULT_CONFIG);
    expect(css).toContain(':root {');
    expect(css).toContain('--brand: #00a6ef;');
    expect(css).toContain('--accent-2:');
    expect(css.trim().endsWith('}')).toBe(true);
  });

  it('tokensToJson يُخرج JSON صالحًا فيه options وtokens', () => {
    const obj = JSON.parse(tokensToJson({ primary: '#16bd74', mode: 'dark' }));
    expect(obj.options.primary).toBe('#16bd74');
    expect(obj.options.mode).toBe('dark');
    expect(obj.semantic.brand.base).toBe('#16bd74');
    expect(obj.primitive.radius.md).toBe('14px');
    expect(obj.$schema).toBe('m7asmari.theme/v2');
  });
});
