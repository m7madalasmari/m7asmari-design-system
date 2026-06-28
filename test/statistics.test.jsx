import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CompareStat from '../components/molecules/CompareStat.jsx';
import TrendStat from '../components/molecules/TrendStat.jsx';
import DistributionBar from '../components/molecules/DistributionBar.jsx';
import MetricGrid from '../components/molecules/MetricGrid.jsx';
import StackedBarChart from '../components/charts/StackedBarChart.jsx';
import MultiLineChart from '../components/charts/MultiLineChart.jsx';
import BulletChart from '../components/charts/BulletChart.jsx';
import WaterfallChart from '../components/charts/WaterfallChart.jsx';

describe('CompareStat', () => {
  it('يحسب نسبة التغيّر بين الحالي والسابق ويرسم شريطَي مقارنة', () => {
    const { container } = render(<CompareStat label="الإيراد" value={128400} prev={112500} unit=" ر.س" />);
    expect(container.querySelector('.comparestat-delta.up')).toBeTruthy();
    // (128400-112500)/112500 ≈ 14%
    expect(container.querySelector('.comparestat-delta').textContent).toContain('14');
    expect(container.querySelectorAll('.comparestat-bar').length).toBe(2);
  });

  it('يخفي التغيّر عند غياب القيمة السابقة', () => {
    const { container } = render(<CompareStat label="جديد" value={50} prev={0} />);
    expect(container.querySelector('.comparestat-delta')).toBeNull();
  });
});

describe('TrendStat', () => {
  it('يعرض القيمة والتسمية ويدمج خطّ الاتجاه (Sparkline)', () => {
    const { container, getByText } = render(
      <TrendStat label="الزيارات" value="8,420" delta="+6%" trend="up" data={[3, 5, 4, 8, 6, 9]} />
    );
    expect(getByText('8,420')).toBeTruthy();
    expect(container.querySelector('.trendstat-delta.up')).toBeTruthy();
    expect(container.querySelector('svg.spark2')).toBeTruthy();
  });
});

describe('DistributionBar', () => {
  it('يرسم شريحة لكل قسم + وسيلة إيضاح بالنِّسَب', () => {
    const segments = [{ label: 'بحث', value: 48 }, { label: 'مباشر', value: 26 }, { label: 'إحالات', value: 26 }];
    const { container } = render(<DistributionBar segments={segments} />);
    expect(container.querySelectorAll('.distbar-seg').length).toBe(3);
    expect(container.querySelectorAll('.chart-leg').length).toBe(3);
  });
});

describe('StackedBarChart', () => {
  it('يرسم عمودًا لكل صف وشريحة لكل سلسلة + وسيلة إيضاح', () => {
    const series = [{ key: 'web', label: 'الويب' }, { key: 'app', label: 'التطبيق' }];
    const data = [{ label: 'يناير', web: 20, app: 14 }, { label: 'فبراير', web: 24, app: 18 }];
    const { container } = render(<StackedBarChart series={series} data={data} />);
    expect(container.querySelectorAll('.chartbar-col').length).toBe(2);
    expect(container.querySelectorAll('.stackbar-seg').length).toBe(4);
    expect(container.querySelectorAll('.chart-leg').length).toBe(2);
  });

  it('يعيد null عند غياب البيانات أو السلاسل', () => {
    const { container } = render(<StackedBarChart series={[]} data={[]} />);
    expect(container.firstChild).toBeNull();
  });
});

describe('MultiLineChart', () => {
  it('يرسم خطًّا لكل سلسلة + وسيلة إيضاح', () => {
    const series = [
      { label: 'أ', data: [{ label: '١', value: 10 }, { label: '٢', value: 20 }, { label: '٣', value: 15 }] },
      { label: 'ب', data: [{ label: '١', value: 5 }, { label: '٢', value: 12 }, { label: '٣', value: 30 }] },
    ];
    const { container } = render(<MultiLineChart series={series} />);
    expect(container.querySelectorAll('svg > g').length).toBe(2);
    expect(container.querySelectorAll('.chart-leg').length).toBe(2);
  });

  it('يتجاهل السلاسل الأقصر من نقطتين ويعيد null إن لم يبقَ شيء', () => {
    const { container } = render(<MultiLineChart series={[{ label: 'x', data: [{ label: '١', value: 1 }] }]} />);
    expect(container.firstChild).toBeNull();
  });
});

describe('BulletChart', () => {
  it('يرسم نطاقًا لكل مقطع + شريط قياس + علامة هدف', () => {
    const { container } = render(<BulletChart label="الإيراد" value={70} target={90} max={120} ranges={[{ value: 50 }, { value: 30 }, { value: 40 }]} />);
    expect(container.querySelectorAll('.bullet-band').length).toBe(3);
    expect(container.querySelector('.bullet-measure')).toBeTruthy();
    expect(container.querySelector('.bullet-target')).toBeTruthy();
  });

  it('يخفي علامة الهدف عند غيابه', () => {
    const { container } = render(<BulletChart value={40} ranges={[{ value: 100 }]} />);
    expect(container.querySelector('.bullet-target')).toBeNull();
  });
});

describe('WaterfallChart', () => {
  it('يرسم عمودًا عائمًا لكل خطوة', () => {
    const data = [
      { label: 'بداية', value: 100, type: 'total' },
      { label: 'زيادة', value: 40 },
      { label: 'نقص', value: -25 },
      { label: 'صافي', type: 'total' },
    ];
    const { container } = render(<WaterfallChart data={data} />);
    expect(container.querySelectorAll('.chartbar-col').length).toBe(4);
    expect(container.querySelectorAll('.wf-bar').length).toBe(4);
  });

  it('يعيد null عند غياب البيانات', () => {
    const { container } = render(<WaterfallChart data={[]} />);
    expect(container.firstChild).toBeNull();
  });
});

describe('MetricGrid', () => {
  it('يرسم صفًّا لكل مؤشّر مع لون التغيّر الصحيح', () => {
    const rows = [
      { label: 'إيراد', value: 120, prev: 100, data: [1, 2, 3] },
      { label: 'إلغاءات', value: 30, prev: 50, data: [5, 4, 3] },
    ];
    const { container } = render(<MetricGrid rows={rows} />);
    expect(container.querySelectorAll('tbody tr').length).toBe(2);
    expect(container.querySelector('.mg-delta.up')).toBeTruthy();
    expect(container.querySelector('.mg-delta.down')).toBeTruthy();
  });

  it('يعيد null عند غياب الصفوف', () => {
    const { container } = render(<MetricGrid rows={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
