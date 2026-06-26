import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Drawer from '../components/Drawer.jsx';

describe('Drawer', () => {
  it('يطبّق صنف الاتجاه و open', () => {
    const { container } = render(
      <Drawer open placement="left" onClose={() => {}} ariaLabel="قائمة"><button>عنصر</button></Drawer>
    );
    const panel = screen.getByRole('dialog');
    expect(panel.className).toContain('drawer2');
    expect(panel.className).toContain('left');
    expect(panel.className).toContain('open');
    expect(container.querySelector('.scrim2.open')).toBeTruthy();
  });

  it('الورقة السفلية تستخدم sheet2', () => {
    render(<Drawer open placement="bottom" onClose={() => {}} ariaLabel="ورقة"><button>عنصر</button></Drawer>);
    expect(screen.getByRole('dialog').className).toContain('sheet2');
  });

  it('Escape والنقر على الخلفية يغلقان', () => {
    const onClose = vi.fn();
    const { container } = render(<Drawer open onClose={onClose} ariaLabel="قائمة"><button>عنصر</button></Drawer>);
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    fireEvent.click(container.querySelector('.scrim2'));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('inert + aria-hidden على اللوح عند الإغلاق (مخفي عن شجرة الوصولية)', () => {
    render(<Drawer open={false} onClose={() => {}} ariaLabel="قائمة"><button>عنصر</button></Drawer>);
    const panel = screen.getByRole('dialog', { hidden: true });
    expect(panel).toHaveAttribute('inert');
    expect(panel).toHaveAttribute('aria-hidden', 'true');
  });
});
