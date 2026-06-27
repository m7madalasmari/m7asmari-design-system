import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PasswordInput from '../components/atoms/PasswordInput.jsx';

describe('PasswordInput', () => {
  it('زرّ الإظهار يبدّل نوع الحقل بين password و text', () => {
    const { container } = render(<PasswordInput value="abc" onChange={() => {}} />);
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('type', 'password');
    fireEvent.click(screen.getByRole('button', { name: 'إظهار كلمة المرور' }));
    expect(input).toHaveAttribute('type', 'text');
  });
  it('meter يعرض مقياس القوّة عند وجود قيمة', () => {
    const { container } = render(<PasswordInput value="Abcd1234!" meter onChange={() => {}} />);
    expect(container.querySelector('.pwmeter')).toBeTruthy();
    expect(container.querySelectorAll('.pwseg.strong').length).toBeGreaterThan(0);
  });
});
