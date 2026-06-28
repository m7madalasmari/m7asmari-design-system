import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Timeline from '../components/molecules/Timeline.jsx';
import RankList from '../components/molecules/RankList.jsx';
import GoalCard from '../components/molecules/GoalCard.jsx';
import RingStat from '../components/molecules/RingStat.jsx';
import ProfileHeader from '../components/molecules/ProfileHeader.jsx';
import Kanban from '../components/organisms/Kanban.jsx';

describe('Timeline', () => {
  it('يرسم عنصرًا لكل حدث + العناوين', () => {
    const items = [{ title: 'استُلم', time: '9:00' }, { title: 'قيد التجهيز' }, { title: 'تم الشحن', icon: 'check' }];
    const { container, getByText } = render(<Timeline items={items} />);
    expect(container.querySelectorAll('.timeline-item').length).toBe(3);
    expect(getByText('تم الشحن')).toBeTruthy();
  });
});

describe('RankList', () => {
  it('يرسم صفوفًا مرقّمة 1..N مع أشرطة', () => {
    const items = [{ name: 'أ', value: 100 }, { name: 'ب', value: 60 }, { name: 'ج', value: 30 }];
    const { container } = render(<RankList items={items} />);
    const rows = container.querySelectorAll('.rank-row');
    expect(rows.length).toBe(3);
    expect(container.querySelectorAll('.rank-num')[0].textContent).toBe('1');
    expect(container.querySelectorAll('.rank-bar').length).toBe(3);
  });
});

describe('GoalCard', () => {
  it('يحسب النسبة من القيمة/الهدف', () => {
    const { container } = render(<GoalCard label="هدف" value={72} target={100} />);
    expect(container.querySelector('.goalcard-pct').textContent).toBe('72%');
    expect(container.querySelector('.progress .bar')).toBeTruthy();
  });
});

describe('RingStat', () => {
  it('يعرض النسبة في المركز ويرسم حلقة', () => {
    const { container } = render(<RingStat value={68} max={100} label="إشغال" />);
    expect(container.querySelector('.donut-center b').textContent).toBe('68%');
    expect(container.querySelector('svg[role="img"]')).toBeTruthy();
  });
});

describe('ProfileHeader', () => {
  it('يعرض الاسم ووسوم meta', () => {
    const { container, getByText } = render(
      <ProfileHeader name="محمد" subtitle="طالب" meta={[{ label: 'الرقم 1' }, { label: 'منتظم' }]} />
    );
    expect(getByText('محمد')).toBeTruthy();
    expect(container.querySelectorAll('.profilehead-chip').length).toBe(2);
  });
});

describe('Kanban', () => {
  it('يرسم أعمدة وبطاقات بعددها', () => {
    const columns = [
      { id: 'a', title: 'قيد', cards: [{ title: 'م1' }, { title: 'م2' }] },
      { id: 'b', title: 'تم', cards: [{ title: 'م3' }] },
    ];
    const { container } = render(<Kanban columns={columns} />);
    expect(container.querySelectorAll('.kanban-col').length).toBe(2);
    expect(container.querySelectorAll('.kanban-card').length).toBe(3);
    expect(container.querySelectorAll('.kanban-colcount')[0].textContent).toBe('2');
  });
});
