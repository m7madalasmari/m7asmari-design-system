import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TagsInput from '../components/TagsInput.jsx';

describe('TagsInput', () => {
  it('يعرض الوسوم الابتدائية كقائمة', () => {
    render(<TagsInput defaultTags={['أ', 'ب']} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('Enter يضيف وسماً ويستدعي onChange', () => {
    const onChange = vi.fn();
    render(<TagsInput defaultTags={[]} onChange={onChange} ariaLabel="وسوم" />);
    const input = screen.getByRole('textbox', { name: 'وسوم' });
    fireEvent.change(input, { target: { value: 'جديد' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(['جديد']);
    expect(screen.getByText('جديد')).toBeTruthy();
  });

  it('زر × يحذف الوسم المقابل', () => {
    render(<TagsInput defaultTags={['أ', 'ب']} />);
    fireEvent.click(screen.getByRole('button', { name: 'حذف الوسم أ' }));
    expect(screen.queryByText('أ')).toBeNull();
    expect(screen.getByText('ب')).toBeTruthy();
  });

  it('Backspace في حقل فارغ يحذف آخر وسم', () => {
    render(<TagsInput defaultTags={['أ', 'ب']} ariaLabel="وسوم" />);
    const input = screen.getByRole('textbox', { name: 'وسوم' });
    fireEvent.keyDown(input, { key: 'Backspace' });
    expect(screen.queryByText('ب')).toBeNull();
  });
});
