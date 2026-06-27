import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Slider from '../components/organisms/Slider.jsx';

describe('Slider', () => {
  it('role=slider مع قيم aria صحيحة', () => {
    render(<Slider value={40} onChange={() => {}} ariaLabel="الرسوم" />);
    const s = screen.getByRole('slider');
    expect(s).toHaveAttribute('aria-valuenow', '40');
    expect(s).toHaveAttribute('aria-valuemin', '0');
    expect(s).toHaveAttribute('aria-valuemax', '100');
    expect(s).toHaveAttribute('aria-label', 'الرسوم');
  });

  it('السهم لليسار يزيد القيمة (RTL) والسهم لليمين يقلّلها', () => {
    const onChange = vi.fn();
    render(<Slider value={40} step={5} onChange={onChange} ariaLabel="x" />);
    const s = screen.getByRole('slider');
    fireEvent.keyDown(s, { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenLastCalledWith(45);
    fireEvent.keyDown(s, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenLastCalledWith(35);
  });

  it('Home/End ينتقلان للحدّين', () => {
    const onChange = vi.fn();
    render(<Slider value={40} onChange={onChange} min={0} max={100} ariaLabel="x" />);
    const s = screen.getByRole('slider');
    fireEvent.keyDown(s, { key: 'Home' });
    expect(onChange).toHaveBeenLastCalledWith(0);
    fireEvent.keyDown(s, { key: 'End' });
    expect(onChange).toHaveBeenLastCalledWith(100);
  });

  it('لا يتجاوز الحدود', () => {
    const onChange = vi.fn();
    render(<Slider value={100} onChange={onChange} ariaLabel="x" />);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowLeft' });
    expect(onChange).not.toHaveBeenCalled(); // 100 هو الحد الأقصى
  });
});
