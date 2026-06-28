import React from 'react';
import { css } from '../lib/css.js';
import Icon from '../../components/atoms/Icon.jsx';
import Popover from '../../components/organisms/Popover.jsx';

/**
 * DocsMenu — قائمة «التوثيق» المنسدلة في الهيدر: تربط التقارير والمراجع القائمة في المستودع.
 * مرحلة أولى: روابط GitHub خارجية (تُفتح في تبويب جديد) — عارض داخل التطبيق مؤجَّل.
 * تعيد استخدام Popover + .cmdk-item القائمَين بلا CSS جديد.
 */
const BASE = 'https://github.com/m7madalasmari/m7asmari-design-system/blob/main/';
const DOCS = [
  { label: 'معمارية النظام', path: 'ARCHITECTURE.md', icon: 'layers' },
  { label: 'مرجع التوكنز', path: 'TOKENS.md', icon: 'palette' },
  { label: 'مرجع الودجت', path: 'kits/WIDGETS.md', icon: 'layout-grid' },
  { label: 'تقرير Form Kit', path: 'kits/form/REPORT.md', icon: 'file-text' },
  { label: 'تقرير Dashboard Kit', path: 'kits/dashboard/REPORT.md', icon: 'file-text' },
  { label: 'سجلّ التغييرات', path: 'CHANGELOG.md', icon: 'clock' },
];

export default function DocsMenu() {
  return (
    <Popover
      ariaLabel="التوثيق"
      trigger={
        <span style={css('display:inline-flex;align-items:center;gap:6px;cursor:pointer;color:inherit')}>
          التوثيق<Icon name="chevron-down" size={15} />
        </span>
      }
    >
      {({ close }) => (
        <div className="fx col" style={css('gap:2px')}>
          {DOCS.map((d) => (
            <a
              key={d.path}
              className="cmdk-item"
              href={BASE + d.path}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              style={css('text-decoration:none')}
            >
              <Icon name={d.icon} size={16} />
              <span className="cmdk-item-label">{d.label}</span>
            </a>
          ))}
        </div>
      )}
    </Popover>
  );
}
