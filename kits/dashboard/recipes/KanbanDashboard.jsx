import React from 'react';
import PageHeader from '../../../components/molecules/PageHeader.jsx';
import Button from '../../../components/atoms/Button.jsx';
import Icon from '../../../components/atoms/Icon.jsx';
import Kanban from '../../../components/organisms/Kanban.jsx';
import { KANBAN_COLUMNS } from '../data.js';

/**
 * KanbanDashboard — لوحة سير عمل بالأعمدة (مجال: مهام/إدارة).
 * تخطيط بلا إطار محاط (تباين). يركّب PageHeader · Kanban.
 */
export default function KanbanDashboard() {
  return (
    <div className="fx col gap24">
      <PageHeader
        title="لوحة المهام"
        subtitle="تتبّع سير العمل عبر المراحل"
        actions={<Button variant="primary"><Icon name="plus" />مهمة جديدة</Button>}
      />
      <Kanban columns={KANBAN_COLUMNS} />
    </div>
  );
}
