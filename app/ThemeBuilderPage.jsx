import React from 'react';
import { css } from './lib/css.js';
import ThemeBuilderSection from '../sections/reference/ThemeBuilderSection.jsx';

/**
 * ThemeBuilderPage — صفحة مستقلة لمُخصِّص السمة (Vite MPA · entry: app/theme-builder.jsx).
 * تعيد استخدام نفس ThemeBuilderSection داخل هيكل صفحة خفيف (ترويسة + حاوية ‎.page‎)،
 * مع رابط رجوع إلى نظام التصميم. لا تعتمد على lucide (ماركب نصّي + SVG ضمنيّ).
 */
export default function ThemeBuilderPage() {
  return (
    <div className="ds" dir="rtl" lang="ar">
      <header className="topbar">
        <div className="topbar-in">
          <a className="brandmark" href="/" style={css('color:inherit;text-decoration:none')}>
            <span className="logo">M</span>M7asmari
          </a>
          <div className="topnav">
            <span className="badge brand"><span className="dot"></span>محرّك التخصيص</span>
            <a className="themetoggle" href="/" aria-label="العودة إلى نظام التصميم">
              <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M12 5l7 7-7 7"></path></svg>
              <span className="tb-lbl">العودة للنظام</span>
            </a>
          </div>
        </div>
      </header>
      <div className="page">
        <ThemeBuilderSection />
      </div>
    </div>
  );
}
