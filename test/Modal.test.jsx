import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Modal from '../components/organisms/Modal.jsx';

function Demo({ start = false }) {
  const [open, setOpen] = React.useState(start);
  return (
    <div>
      <button onClick={() => setOpen(true)}>افتح</button>
      <Modal open={open} onClose={() => setOpen(false)} labelledBy="t">
        <h2 id="t">عنوان</h2>
        <button>إجراء</button>
      </Modal>
    </div>
  );
}

describe('Modal', () => {
  it('يعرض role=dialog و aria-modal عند الفتح', () => {
    render(<Modal open onClose={() => {}} ariaLabel="حوار"><button>زر</button></Modal>);
    const dlg = screen.getByRole('dialog');
    expect(dlg).toHaveAttribute('aria-modal', 'true');
    expect(dlg).toHaveAttribute('aria-label', 'حوار');
  });

  it('ينقل التركيز لأول عنصر داخل النافذة عند الفتح', () => {
    render(<Modal open onClose={() => {}} ariaLabel="حوار"><button>الأول</button></Modal>);
    expect(screen.getByText('الأول')).toHaveFocus();
  });

  it('Escape يستدعي onClose', () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} ariaLabel="حوار"><button>زر</button></Modal>);
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('النقر على الخلفية يستدعي onClose، والنقر داخل النافذة لا', () => {
    const onClose = vi.fn();
    const { container } = render(<Modal open onClose={onClose} ariaLabel="حوار"><button>زر</button></Modal>);
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.click(container.querySelector('.mscrim'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('يضيف inert على الخلفية عند الإغلاق ويرجع التركيز للزر الفاتح', () => {
    const { container } = render(<Demo />);
    const opener = screen.getByText('افتح');
    expect(container.querySelector('.mscrim')).toHaveAttribute('inert');
    opener.focus();
    fireEvent.click(opener);
    expect(container.querySelector('.mscrim')).not.toHaveAttribute('inert');
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(opener).toHaveFocus();
  });
});
