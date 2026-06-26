import React from 'react';
import Button from '../../components/Button.jsx';
import SectionHeader from '../../docs/SectionHeader.jsx';
import ShowcasePanel from '../../docs/ShowcasePanel.jsx';

export default function ModalSection({ v }) {
  const { closeModal, modalScrimCls, openModal, stop } = v;
  return (
<section className="section" id="modal" data-screen-label="Modal">
<SectionHeader kicker={"02 — المكوّنات"} title={"النوافذ المنبثقة"} desc={"نافذة حوار مرتفعة فوق خلفية معتمة — فتح/إغلاق فعلي، إغلاق بالنقر خارجها أو Esc."} />
<ShowcasePanel><Button variant="danger" onClick={openModal}><i data-lucide="trash-2"></i>حذف المحفظة</Button></ShowcasePanel>
<div className={modalScrimCls} onClick={closeModal}><div className="mdialog" onClick={stop}><div className="dialog-ico">!</div><div className="dialog-title">حذف المحفظة؟</div><p className="dialog-text">سيؤدي هذا إلى إزالة المحفظة نهائيًا من جهازك، ولا يمكن التراجع عن هذا الإجراء.</p><div className="dialog-foot"><Button variant="danger" onClick={closeModal}>حذف نهائي</Button><Button variant="secondary" onClick={closeModal}>إلغاء</Button></div></div></div>
</section>
  );
}
