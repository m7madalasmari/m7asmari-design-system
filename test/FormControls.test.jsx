import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Checkbox from '../components/atoms/Checkbox.jsx';
import Switch from '../components/atoms/Switch.jsx';
import RadioGroup from '../components/molecules/RadioGroup.jsx';

describe('Checkbox', () => {
  it('النقر و Space يبدّلان ويستدعيان onChange', () => {
    const onChange = vi.fn();
    render(<Checkbox checked={false} onChange={onChange}>أوافق</Checkbox>);
    const cb = screen.getByRole('checkbox');
    fireEvent.click(cb);
    expect(onChange).toHaveBeenLastCalledWith(true);
    fireEvent.keyDown(cb, { key: ' ' });
    expect(onChange).toHaveBeenLastCalledWith(true);
  });
  it('indeterminate → aria-checked=mixed', () => {
    render(<Checkbox indeterminate onChange={() => {}}>x</Checkbox>);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');
  });
  it('المعطّل لا يستدعي onChange', () => {
    const onChange = vi.fn();
    render(<Checkbox checked={false} disabled onChange={onChange}>x</Checkbox>);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('Switch', () => {
  it('يبدّل عند النقر', () => {
    const onChange = vi.fn();
    render(<Switch checked={false} onChange={onChange}>إشعارات</Switch>);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenLastCalledWith(true);
  });
});

describe('RadioGroup', () => {
  const opts = [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }, { value: 'c', label: 'C' }];
  it('السهم للأسفل ينتقل للتالي (RTL)', () => {
    const onChange = vi.fn();
    render(<RadioGroup value="a" onChange={onChange} ariaLabel="g" options={opts} />);
    fireEvent.keyDown(screen.getByRole('radiogroup'), { key: 'ArrowDown' });
    expect(onChange).toHaveBeenLastCalledWith('b');
  });
  it('النقر يختار الخيار', () => {
    const onChange = vi.fn();
    render(<RadioGroup value="a" onChange={onChange} ariaLabel="g" options={opts} />);
    fireEvent.click(screen.getByRole('radio', { name: 'B' }));
    expect(onChange).toHaveBeenCalledWith('b');
  });
});
