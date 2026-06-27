import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Stepper from '../components/molecules/Stepper.jsx';

describe('Stepper', () => {
  it('يعرض الخطوات بحالات done/active الصحيحة', () => {
    render(<Stepper steps={['أ', 'ب', 'ج']} current={1} />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(3);
    expect(items[0].className).toContain('done');
    expect(items[1].className).toContain('active');
    expect(items[1]).toHaveAttribute('aria-current', 'step');
    expect(items[2].className).not.toContain('active');
  });
});
