import React from 'react';
import { css } from '../lib/css.js';

export default function TopBar({ themeLabel, toggleCmd, toggleTheme }) {
  return (
    <div className="topbar"><div className="topbar-in"><div className="brandmark"><span className="logo">M</span>M7asmari</div><div className="topnav"><span>الأسس</span><span>المكوّنات</span><a href="#patterns" style={css('color:inherit;text-decoration:none')}>الأنماط</a><button className="themetoggle" aria-label="تبديل السمة" onClick={toggleTheme}><i data-lucide="moon"></i>{themeLabel}</button><button className="cmdtrigger" aria-label="فتح لوحة الأوامر" onClick={toggleCmd}><i data-lucide="search"></i>بحث<span className="cmdkbd">⌘K</span></button><span className="badge brand"><span className="dot"></span>v1.0</span></div></div></div>
  );
}
