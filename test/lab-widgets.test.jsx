import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Heatmap from '../components/charts/Heatmap.jsx';
import Gauge from '../components/charts/Gauge.jsx';
import Funnel from '../components/charts/Funnel.jsx';
import TreeView from '../components/organisms/TreeView.jsx';
import Carousel from '../components/organisms/Carousel.jsx';
import CommandPalette from '../components/organisms/CommandPalette.jsx';
import Popover from '../components/organisms/Popover.jsx';
import Rating from '../components/molecules/Rating.jsx';
import AvatarGroup from '../components/molecules/AvatarGroup.jsx';

describe('Heatmap', () => {
  it('يرسم خليّة لكل قيمة', () => {
    const { container } = render(<Heatmap data={[0, 1, 2, 3, 4]} />);
    expect(container.querySelectorAll('.heatcell').length).toBe(5);
  });
});

describe('Gauge', () => {
  it('يرسم قوسًا ويعرض النسبة', () => {
    const { container, getByText } = render(<Gauge value={72} max={100} label="الأداء" />);
    expect(container.querySelector('svg[role="img"]')).toBeTruthy();
    expect(getByText('72%')).toBeTruthy();
  });
});

describe('Funnel', () => {
  it('يرسم صفًّا لكل مرحلة', () => {
    const { container } = render(<Funnel stages={[{ label: 'a', value: 100 }, { label: 'b', value: 40 }]} />);
    expect(container.querySelectorAll('.funnel-row').length).toBe(2);
  });
});

describe('TreeView', () => {
  it('يطوي/يوسّع الأبناء عند النقر', () => {
    const nodes = [{ id: 'a', label: 'A', children: [{ id: 'b', label: 'B' }] }];
    const { container, queryByText } = render(<TreeView nodes={nodes} />);
    expect(queryByText('B')).toBeNull();
    fireEvent.click(container.querySelector('.tree-row'));
    expect(queryByText('B')).toBeTruthy();
  });
});

describe('Carousel', () => {
  it('التالي يغيّر الشريحة النشطة', () => {
    const { container } = render(<Carousel slides={[<div key="1">1</div>, <div key="2">2</div>]} />);
    expect(container.querySelectorAll('.carousel-slide').length).toBe(2);
    fireEvent.click(container.querySelector('.carousel-arrow.next'));
    expect(container.querySelectorAll('.carousel-slide.on').length).toBe(1);
    expect(container.querySelectorAll('.carousel-dot.on').length).toBe(1);
  });
});

describe('Rating', () => {
  it('يعرض النجوم والنقر يستدعي onChange', () => {
    const onChange = vi.fn();
    const { container } = render(<Rating value={2} onChange={onChange} />);
    const stars = container.querySelectorAll('.rating-star');
    expect(stars.length).toBe(5);
    expect(container.querySelectorAll('.rating-star.on').length).toBe(2);
    fireEvent.click(stars[3]);
    expect(onChange).toHaveBeenCalledWith(4);
  });
});

describe('AvatarGroup', () => {
  it('يعرض حتى max + شارة +N', () => {
    const items = [{ name: 'a' }, { name: 'b' }, { name: 'c' }, { name: 'd' }, { name: 'e' }];
    const { container, getByText } = render(<AvatarGroup items={items} max={2} />);
    expect(container.querySelectorAll('.avgroup-item').length).toBe(3);
    expect(getByText('+3')).toBeTruthy();
  });
});

describe('CommandPalette', () => {
  it('يفلتر الأوامر بالبحث ويختفي عند الإغلاق', () => {
    const cmds = [{ id: '1', label: 'إنشاء' }, { id: '2', label: 'بحث' }];
    const { container, getByPlaceholderText } = render(<CommandPalette open onClose={() => {}} commands={cmds} />);
    expect(container.querySelectorAll('.cmdk-item').length).toBe(2);
    fireEvent.change(getByPlaceholderText('ابحث عن أمر…'), { target: { value: 'بحث' } });
    expect(container.querySelectorAll('.cmdk-item').length).toBe(1);
    const { container: c2 } = render(<CommandPalette open={false} commands={cmds} />);
    expect(c2.querySelector('.cmdk')).toBeNull();
  });
});

describe('Popover', () => {
  it('يفتح المحتوى عند النقر على المُطلِق', () => {
    const { getByText, queryByText } = render(<Popover trigger={<button>افتح</button>}><div>المحتوى</div></Popover>);
    expect(queryByText('المحتوى')).toBeNull();
    fireEvent.click(getByText('افتح'));
    expect(queryByText('المحتوى')).toBeTruthy();
  });
});
