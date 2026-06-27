import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import StatTile from '../components/StatTile.jsx';
import NavItem from '../components/NavItem.jsx';
import FolderItem from '../components/FolderItem.jsx';
import NotificationMenu from '../components/NotificationMenu.jsx';
import CollapsibleSection from '../components/CollapsibleSection.jsx';
import FileRow from '../components/FileRow.jsx';

describe('StatTile', () => {
  it('يعرض القيمة والتسمية والتغيّر', () => {
    render(<StatTile icon="folder" value="48" label="الملفات" delta="+12%" trend="up" />);
    expect(screen.getByText('48')).toBeTruthy();
    expect(screen.getByText('الملفات')).toBeTruthy();
    expect(screen.getByText('+12%')).toBeTruthy();
  });
  it('trend=up يعطي صنف الدلتا الصاعد', () => {
    const { container } = render(<StatTile icon="x" value="1" label="l" delta="+1%" trend="up" />);
    expect(container.querySelector('.dashstat-d.up')).toBeTruthy();
  });
  it('trend=flat يعطي صنف مسطّح', () => {
    const { container } = render(<StatTile icon="x" value="1" label="l" delta="0%" trend="flat" />);
    expect(container.querySelector('.dashstat-d.flat')).toBeTruthy();
  });
});

describe('NavItem (panel)', () => {
  it('active يضيف on و aria-current، والنقر يستدعي onClick', () => {
    const onClick = vi.fn();
    const { container } = render(<NavItem variant="panel" icon="x" label="الكل" count={5} active onClick={onClick} />);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('on');
    expect(btn).toHaveAttribute('aria-current', 'true');
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalled();
    expect(container.querySelector('.dashcat-count').textContent).toBe('5');
  });
});

describe('NavItem (rail)', () => {
  it('يعرض .sideitem بنقطة وتسمية؛ active يضيف on', () => {
    const { container } = render(<NavItem variant="rail" active label="المحفظة" />);
    const el = container.querySelector('.sideitem');
    expect(el).toBeTruthy();
    expect(el.className).toContain('on');
    expect(container.querySelector('.sideicon')).toBeTruthy();
    expect(el.textContent).toContain('المحفظة');
  });
});

describe('FolderItem', () => {
  it('showBar يعرض شريط التقدّم؛ showStar يعرض النجمة', () => {
    const { container: a } = render(<FolderItem label="العمل" color="var(--sky-500)" items={24} size="2 غ.ب" prog={65} showBar />);
    expect(a.querySelector('.dashfolder-bar')).toBeTruthy();
    expect(a.querySelector('[data-lucide="star"]')).toBeNull();
    const { container: b } = render(<FolderItem label="العمل" color="var(--sky-500)" items={24} size="2 غ.ب" prog={65} showStar />);
    expect(b.querySelector('[data-lucide="star"]')).toBeTruthy();
    expect(b.querySelector('.dashfolder-bar')).toBeNull();
  });
  it('زرّ التثبيت يستدعي onTogglePin', () => {
    const onTogglePin = vi.fn();
    render(<FolderItem label="x" color="var(--sky-500)" items={1} size="1" prog={1} showBar onTogglePin={onTogglePin} />);
    fireEvent.click(screen.getByRole('button', { name: 'تثبيت' }));
    expect(onTogglePin).toHaveBeenCalled();
  });
});

describe('NotificationMenu', () => {
  const items = [{ title: 'أ', msg: 'm', time: 't', unread: true }, { title: 'ب', msg: 'm', time: 't', unread: false }];
  it('يعرض عدّاد غير المقروء ويستدعي onToggle', () => {
    const onToggle = vi.fn();
    const { container } = render(<NotificationMenu open unread={1} items={items} onToggle={onToggle} />);
    expect(container.querySelector('.dashbell-badge').textContent).toBe('1');
    fireEvent.click(screen.getByRole('button', { name: 'الإشعارات' }));
    expect(onToggle).toHaveBeenCalled();
    expect(container.querySelectorAll('.dashnotif-item.unread')).toHaveLength(1);
  });
});

describe('CollapsibleSection', () => {
  it('open يضيف الصنف، والنقر على الترويسة يستدعي onToggle', () => {
    const onToggle = vi.fn();
    const { container } = render(<CollapsibleSection open title="المجلّدات" onToggle={onToggle}><div>محتوى</div></CollapsibleSection>);
    expect(container.querySelector('.dashsecwrap.dashsec.open')).toBeTruthy();
    expect(screen.getByText('محتوى')).toBeTruthy();
    fireEvent.click(container.querySelector('.dashsec-title'));
    expect(onToggle).toHaveBeenCalled();
  });
});

describe('FileRow', () => {
  it('يعرض الاسم والبيانات وزرّ الخيارات', () => {
    render(<FileRow icon="file-text" name="ملف.pdf" size="2 م.ب" mod="أمس" color="var(--red-500)" />);
    expect(screen.getByText('ملف.pdf')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'خيارات الملف' })).toBeTruthy();
  });
});
