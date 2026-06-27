import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Select from '../components/organisms/Select.jsx';
import Combobox from '../components/organisms/Combobox.jsx';

const OPTS = [{ value: 'sa', label: 'السعودية' }, { value: 'eg', label: 'مصر' }];

describe('Select', () => {
  it('يفتح بالنقر ويختار خيارًا', () => {
    const onChange = vi.fn();
    render(<Select value="" onChange={onChange} ariaLabel="الدولة" options={OPTS} />);
    const box = screen.getByRole('combobox', { name: 'الدولة' });
    expect(box).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(box);
    expect(box).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(screen.getByRole('option', { name: 'مصر' }));
    expect(onChange).toHaveBeenCalledWith('eg');
  });
  it('كيبورد: سهم لأسفل يفتح ثم Enter يختار', () => {
    const onChange = vi.fn();
    render(<Select value="" onChange={onChange} ariaLabel="د" options={OPTS} />);
    const box = screen.getByRole('combobox');
    fireEvent.keyDown(box, { key: 'ArrowDown' });
    fireEvent.keyDown(box, { key: 'ArrowDown' });
    fireEvent.keyDown(box, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('eg');
  });
});

describe('Combobox', () => {
  it('يفلتر بالنص ويختار', () => {
    const onChange = vi.fn();
    render(<Combobox value="" onChange={onChange} ariaLabel="الدولة" options={OPTS} />);
    const input = screen.getByRole('combobox', { name: 'الدولة' });
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'مص' } });
    expect(screen.queryByRole('option', { name: 'السعودية' })).toBeNull();
    fireEvent.click(screen.getByRole('option', { name: 'مصر' }));
    expect(onChange).toHaveBeenCalledWith('eg');
  });
});
