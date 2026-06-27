import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PhoneInput from '../components/molecules/PhoneInput.jsx';

describe('PhoneInput', () => {
  it('يعرض مفتاح الدولة وحقل رقم LTR من نوع tel', () => {
    render(<PhoneInput dial="+966" onDial={() => {}} value="" onChange={() => {}} />);
    expect(screen.getByRole('combobox', { name: 'مفتاح الدولة' })).toBeTruthy();
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('dir', 'ltr');
    expect(input).toHaveAttribute('type', 'tel');
  });
  it('الكتابة في الرقم تستدعي onChange', () => {
    const onChange = vi.fn();
    render(<PhoneInput dial="+966" onDial={() => {}} value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '512345678' } });
    expect(onChange).toHaveBeenCalled();
  });
  it('اختيار مفتاح دولة آخر يستدعي onDial', () => {
    const onDial = vi.fn();
    render(<PhoneInput dial="+966" onDial={onDial} value="" onChange={() => {}} />);
    fireEvent.click(screen.getByRole('combobox', { name: 'مفتاح الدولة' }));
    fireEvent.click(screen.getByRole('option', { name: /\+971/ }));
    expect(onDial).toHaveBeenCalledWith('+971');
  });
  it('status=error يضيف is-error على الحاوية و aria-invalid على الرقم', () => {
    const { container } = render(<PhoneInput dial="+966" onDial={() => {}} value="" onChange={() => {}} status="error" />);
    expect(container.querySelector('.fk-phone').className).toContain('is-error');
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });
});
