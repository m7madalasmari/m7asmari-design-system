import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import OtpInput from '../components/OtpInput.jsx';

describe('OtpInput', () => {
  it('يعرض length خانات ضمن مجموعة معنونة', () => {
    render(<OtpInput length={6} label="الرمز" />);
    expect(screen.getByRole('group', { name: 'الرمز' })).toBeTruthy();
    expect(screen.getAllByRole('textbox')).toHaveLength(6);
  });

  it('الكتابة تقدّم التركيز وتستدعي onComplete عند الاكتمال', () => {
    const onComplete = vi.fn();
    render(<OtpInput length={6} onComplete={onComplete} />);
    const boxes = screen.getAllByRole('textbox');
    '123456'.split('').forEach((ch, i) => fireEvent.change(boxes[i], { target: { value: ch } }));
    expect(onComplete).toHaveBeenCalledWith('123456');
  });

  it('Backspace في خانة فارغة يرجع للخانة السابقة', () => {
    render(<OtpInput length={6} />);
    const boxes = screen.getAllByRole('textbox');
    fireEvent.change(boxes[0], { target: { value: '1' } }); // focus -> box1
    fireEvent.keyDown(boxes[1], { key: 'Backspace' });
    expect(boxes[0]).toHaveFocus();
  });

  it('اللصق يملأ الخانات', () => {
    const onComplete = vi.fn();
    render(<OtpInput length={6} onComplete={onComplete} />);
    const group = screen.getByRole('group');
    fireEvent.paste(group, { clipboardData: { getData: () => '654321' } });
    expect(onComplete).toHaveBeenCalledWith('654321');
    expect(screen.getAllByRole('textbox')[0]).toHaveValue('6');
  });

  it('status=error يضيف صنف err', () => {
    const { container } = render(<OtpInput length={6} status="error" />);
    expect(container.querySelector('.otpwrap.err')).toBeTruthy();
  });
});
