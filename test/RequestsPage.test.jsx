import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RequestsPage from '../app/RequestsPage.jsx';

describe('RequestsPage — صفحة خدمة الطلبات', () => {
  it('تعرض هيكل ‎.ds‎ RTL مع Hero والترويسة', () => {
    const { container } = render(<RequestsPage />);
    const root = container.querySelector('.ds.reqsvc');
    expect(root).toBeTruthy();
    expect(root.getAttribute('dir')).toBe('rtl');
    expect(container.querySelector('.hero')).toBeTruthy();
    expect(screen.getByText('قدّم طلبك، وتابِع حالته في مكان واحد')).toBeTruthy();
  });

  it('فيها رابط رجوع إلى نظام التصميم', () => {
    render(<RequestsPage />);
    const back = screen.getByRole('link', { name: 'العودة إلى نظام التصميم' });
    expect(back.getAttribute('href')).toBe('/');
  });

  it('تعرض ثلاث مزايا بالضبط', () => {
    const { container } = render(<RequestsPage />);
    expect(container.querySelectorAll('.feat-card')).toHaveLength(3);
  });

  it('تبدأ بحالة فارغة قبل أي طلب', () => {
    render(<RequestsPage />);
    expect(screen.getByText('لا طلبات بعد')).toBeTruthy();
  });

  it('تمنع الإرسال دون عنوان وتُظهر رسالة الخطأ', () => {
    render(<RequestsPage />);
    fireEvent.click(screen.getByRole('button', { name: 'إرسال الطلب' }));
    expect(screen.getByText('العنوان مطلوب لإرسال الطلب.')).toBeTruthy();
    expect(screen.getByText('لا طلبات بعد')).toBeTruthy(); // ما زالت الحالة فارغة
  });

  it('إرسال طلب صالح يستبدل الحالة الفارغة بعنصر في القائمة', () => {
    render(<RequestsPage />);
    fireEvent.change(screen.getByLabelText(/عنوان الطلب/), { target: { value: 'تعطّل تسجيل الدخول' } });
    fireEvent.click(screen.getByRole('button', { name: 'إرسال الطلب' }));

    expect(screen.queryByText('لا طلبات بعد')).toBeNull();
    const item = screen.getByText('تعطّل تسجيل الدخول').closest('.req-item');
    expect(item).toBeTruthy();
    expect(within(item).getByText('جديد')).toBeTruthy(); // شارة الحالة
    expect(screen.getByText('طلباتك', { exact: false })).toBeTruthy();
  });

  it('تفرّغ الحقول بعد إرسال ناجح', () => {
    render(<RequestsPage />);
    const titleInput = screen.getByLabelText(/عنوان الطلب/);
    fireEvent.change(titleInput, { target: { value: 'طلب تجريبي' } });
    fireEvent.click(screen.getByRole('button', { name: 'إرسال الطلب' }));
    expect(titleInput.value).toBe('');
  });

  it('فيها دعوة واضحة للإجراء (CTA)', () => {
    const { container } = render(<RequestsPage />);
    expect(container.querySelector('.req-cta')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'قدّم طلبًا الآن' })).toBeTruthy();
  });
});
