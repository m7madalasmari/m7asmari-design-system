import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Input from '../components/atoms/Input.jsx';
import Textarea from '../components/atoms/Textarea.jsx';
import FieldMessage from '../components/atoms/FieldMessage.jsx';
import Field from '../components/molecules/Field.jsx';

describe('Input', () => {
  it('status=error → is-error + aria-invalid', () => {
    render(<Input status="error" aria-label="x" />);
    const i = screen.getByRole('textbox', { name: 'x' });
    expect(i.className).toContain('is-error');
    expect(i).toHaveAttribute('aria-invalid', 'true');
  });
  it('status=disabled → disabled + is-disabled', () => {
    render(<Input status="disabled" aria-label="y" />);
    const i = screen.getByLabelText('y');
    expect(i).toBeDisabled();
    expect(i.className).toContain('is-disabled');
  });
});

describe('Textarea', () => {
  it('يحمل صنفي input و textarea', () => {
    render(<Textarea aria-label="t" />);
    const t = screen.getByLabelText('t');
    expect(t.tagName).toBe('TEXTAREA');
    expect(t.className).toContain('input');
    expect(t.className).toContain('textarea');
  });
});

describe('FieldMessage', () => {
  it('status يضبط الصنف (err/ok)', () => {
    const { rerender } = render(<FieldMessage status="error">e</FieldMessage>);
    expect(screen.getByText('e').className).toContain('err');
    rerender(<FieldMessage status="success">s</FieldMessage>);
    expect(screen.getByText('s').className).toContain('ok');
  });
});

describe('Field', () => {
  it('يربط الوصولية: label/htmlFor + aria-describedby + aria-invalid + aria-required', () => {
    const { container } = render(
      <Field label="البريد" status="error" message="بريد غير صالح" required>
        <Input />
      </Field>
    );
    const input = screen.getByRole('textbox');
    const label = container.querySelector('label');
    expect(label.getAttribute('for')).toBe(input.id);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-required', 'true');
    const describedby = input.getAttribute('aria-describedby');
    expect(describedby).toBeTruthy();
    expect(document.getElementById(describedby)).toHaveTextContent('بريد غير صالح');
    expect(input.className).toContain('is-error');
  });
});
