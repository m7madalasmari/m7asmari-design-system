import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Sparkline from '../components/charts/Sparkline.jsx';
import BarChart from '../components/charts/BarChart.jsx';
import LineChart from '../components/charts/LineChart.jsx';
import DonutChart from '../components/charts/DonutChart.jsx';
import Legend from '../components/charts/Legend.jsx';

describe('Sparkline', () => {
  it('يرسم SVG بـrole=img وaria-label ومسار واحد على الأقل', () => {
    const { container } = render(<Sparkline data={[1, 4, 2, 8, 5]} ariaLabel="اتجاه" />);
    const svg = container.querySelector('svg[role="img"]');
    expect(svg).toBeTruthy();
    expect(svg.getAttribute('aria-label')).toBe('اتجاه');
    expect(container.querySelectorAll('path').length).toBeGreaterThanOrEqual(1);
  });
  it('يُرجع null لأقل من نقطتين', () => {
    const { container } = render(<Sparkline data={[1]} />);
    expect(container.querySelector('svg')).toBeNull();
  });
});

describe('BarChart', () => {
  it('يرسم عمودًا وتسمية لكل عنصر', () => {
    const data = [{ label: 'أ', value: 10 }, { label: 'ب', value: 20 }, { label: 'ج', value: 5 }];
    const { container } = render(<BarChart data={data} />);
    expect(container.querySelectorAll('.chartbar').length).toBe(3);
    expect(container.querySelectorAll('.chartbar-lbl').length).toBe(3);
  });
});

describe('LineChart', () => {
  it('يرسم مسارين (مساحة + خط) وتسمية س لكل نقطة', () => {
    const data = [{ label: '1', value: 3 }, { label: '2', value: 7 }, { label: '3', value: 5 }];
    const { container } = render(<LineChart data={data} />);
    expect(container.querySelector('svg[role="img"]')).toBeTruthy();
    expect(container.querySelectorAll('path').length).toBe(2);
    expect(container.querySelectorAll('circle').length).toBe(3); // نقطة لكل قيمة
    expect(container.querySelectorAll('.chart-xlabels span').length).toBe(3);
  });
});

describe('Legend', () => {
  it('يرسم مدخلًا (نقطة + تسمية) لكل عنصر', () => {
    const items = [{ label: 'مكتمل', value: '62%', color: 'var(--chart-2)' }, { label: 'متأخّر', value: '12%', color: 'var(--chart-4)' }];
    const { container, getByText } = render(<Legend items={items} />);
    expect(container.querySelectorAll('.chart-leg').length).toBe(2);
    expect(container.querySelectorAll('.chart-legdot').length).toBe(2);
    expect(getByText('مكتمل')).toBeTruthy();
  });
});

describe('DonutChart', () => {
  it('يرسم خلفية + قطاعًا لكل عنصر + قيمة مركزية', () => {
    const segs = [{ label: 'a', value: 60 }, { label: 'b', value: 40 }];
    const { container } = render(<DonutChart segments={segs} centerLabel="60%" centerSub="x" />);
    expect(container.querySelectorAll('circle').length).toBe(3); // خلفية + قطاعان
    expect(container.querySelector('.donut-center b').textContent).toBe('60%');
  });
});
