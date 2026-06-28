import React from 'react';
import { css } from '../lib/css.js';
import Icon from '../../components/atoms/Icon.jsx';
import Breadcrumb from '../../components/molecules/Breadcrumb.jsx';
import KitsMenu from './KitsMenu.jsx';
import DocsMenu from './DocsMenu.jsx';

/**
 * AppHeader — هيدر M7 الموحّد عبر كل صفحات MPA (النواة/المجموعات/المختبر).
 * طبقة تنقّل واحدة بديلًا عن الهيدرات المنفصلة inline: الشعار → الرئيسية دائمًا،
 * قائمة المجموعات (تنقّل جانبي)، رابط المختبر، تبديل السمة، و⌘K في كل الصفحات.
 * يعيد استخدام أصناف الهيدر القائمة (.topbar/.topnav/.themetoggle/.cmdtrigger) بلا تصميم جديد.
 *
 * props:
 *  - active: 'core'|'form'|'dashboard'|'lab' — لإبراز موقع المستخدم.
 *  - dark: boolean · themeLabel · toggleTheme — حالة السمة المشتركة.
 *  - onOpenCmd: fn — فتح لوحة الأوامر (إن غابت لا يُعرض زر ⌘K).
 *  - breadcrumb: مصفوفة عناصر فتات (نص أو {label, href}) للصفحات العميقة.
 */
const link = (on) => css('color:' + (on ? 'var(--text-primary)' : 'inherit') + ';text-decoration:none');

export default function AppHeader({ active, dark, themeLabel, toggleTheme, onOpenCmd, breadcrumb }) {
  return (
    <>
      <header className="topbar">
        <div className="topbar-in">
          <a className="brandmark" href="/" aria-label="الانتقال إلى الرئيسية — نظام M7" style={css('color:inherit;text-decoration:none')}>
            <span className="logo">M</span>M7asmari
          </a>
          <nav className="topnav" aria-label="التنقّل الرئيسي">
            <a href="/core.html" style={link(active === 'core')} aria-current={active === 'core' ? 'page' : undefined}>النواة</a>
            <KitsMenu active={active} />
            <a href="/catalog.html" style={link(active === 'catalog')} aria-current={active === 'catalog' ? 'page' : undefined}>الكتالوج</a>
            <a href="/lab.html" style={link(active === 'lab')} aria-current={active === 'lab' ? 'page' : undefined}>المختبر</a>
            <DocsMenu />
            <button className="themetoggle" onClick={toggleTheme} aria-label={dark ? 'الوضع الفاتح' : 'الوضع الداكن'}>
              <Icon name={dark ? 'sun' : 'moon'} /><span className="tb-lbl">{themeLabel}</span>
            </button>
            {onOpenCmd ? (
              <button className="cmdtrigger" onClick={onOpenCmd} aria-label="فتح لوحة الأوامر">
                <Icon name="search" /><span className="tb-lbl">بحث</span><span className="cmdkbd">⌘K</span>
              </button>
            ) : null}
            <span className="badge brand"><span className="dot"></span>v1.0</span>
          </nav>
        </div>
      </header>
      {breadcrumb && breadcrumb.length ? (
        <div style={css('max-width:var(--page-max);margin:0 auto;padding:18px var(--space-page) 0')}>
          <Breadcrumb items={breadcrumb} />
        </div>
      ) : null}
    </>
  );
}
