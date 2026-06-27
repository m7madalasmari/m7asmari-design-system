import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Accordion from '../components/organisms/Accordion.jsx';

const ITEMS = [
  { id: 'a', icon: 'file', title: 'الأول', body: 'محتوى الأول' },
  { id: 'b', icon: 'file', title: 'الثاني', body: 'محتوى الثاني' },
  { id: 'c', icon: 'file', title: 'الثالث', body: 'محتوى الثالث' },
];

describe('Accordion', () => {
  it('الترويسات أزرار مع aria-expanded و aria-controls', () => {
    render(<Accordion items={ITEMS} />);
    const btn = screen.getByRole('button', { name: /الأول/ });
    expect(btn).toHaveAttribute('aria-expanded', 'false');
    expect(btn).toHaveAttribute('aria-controls', 'acc-panel-a');
  });

  it('defaultOpen يفتح البند المحدّد', () => {
    render(<Accordion items={ITEMS} defaultOpen="b" />);
    expect(screen.getByRole('button', { name: /الثاني/ })).toHaveAttribute('aria-expanded', 'true');
  });

  it('النقر يفتح بندًا واحدًا فقط (single-open)', () => {
    render(<Accordion items={ITEMS} />);
    fireEvent.click(screen.getByRole('button', { name: /الأول/ }));
    expect(screen.getByRole('button', { name: /الأول/ })).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(screen.getByRole('button', { name: /الثاني/ }));
    expect(screen.getByRole('button', { name: /الأول/ })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByRole('button', { name: /الثاني/ })).toHaveAttribute('aria-expanded', 'true');
  });

  it('النقر مجددًا يطوي البند المفتوح', () => {
    render(<Accordion items={ITEMS} defaultOpen="a" />);
    fireEvent.click(screen.getByRole('button', { name: /الأول/ }));
    expect(screen.getByRole('button', { name: /الأول/ })).toHaveAttribute('aria-expanded', 'false');
  });

  it('السهم لأسفل ينقل التركيز للترويسة التالية', () => {
    render(<Accordion items={ITEMS} />);
    const first = screen.getByRole('button', { name: /الأول/ });
    first.focus();
    fireEvent.keyDown(first, { key: 'ArrowDown' });
    expect(screen.getByRole('button', { name: /الثاني/ })).toHaveFocus();
  });
});
