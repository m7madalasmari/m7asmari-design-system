import React from 'react';
import Button from '../../components/atoms/Button.jsx';
import Modal from '../../components/organisms/Modal.jsx';
import SectionHeader from '../../docs/SectionHeader.jsx';
import ShowcasePanel from '../../docs/ShowcasePanel.jsx';
import Icon from '../../components/atoms/Icon.jsx';

export default function ModalSection() {
  const [open, setOpen] = React.useState(false);
  return (
<section className="section" id="modal" data-screen-label="Modal">
<SectionHeader kicker={"02 — المكوّنات"} title={"النوافذ المنبثقة"} desc={"نافذة حوار مرتفعة فوق خلفية معتمة — فتح/إغلاق فعلي، إغلاق بالنقر خارجها أو Esc."} />
<ShowcasePanel><Button variant="danger" onClick={() => setOpen(true)}><Icon name="trash-2" />حذف المحفظة</Button></ShowcasePanel>
<Modal open={open} onClose={() => setOpen(false)} labelledBy="modal-demo-title" describedBy="modal-demo-text">
<div className="dialog-ico">!</div>
<div className="dialog-title" id="modal-demo-title">حذف المحفظة؟</div>
<p className="dialog-text" id="modal-demo-text">سيؤدي هذا إلى إزالة المحفظة نهائيًا من جهازك، ولا يمكن التراجع عن هذا الإجراء.</p>
<div className="dialog-foot"><Button variant="danger" onClick={() => setOpen(false)}>حذف نهائي</Button><Button variant="secondary" onClick={() => setOpen(false)}>إلغاء</Button></div>
</Modal>
</section>
  );
}
