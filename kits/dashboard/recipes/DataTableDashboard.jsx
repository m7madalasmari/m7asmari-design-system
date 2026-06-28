import React from 'react';
import { css } from '../../../app/lib/css.js';
import DashboardLayout from '../../../patterns/DashboardLayout.jsx';
import DashboardCard from '../DashboardCard.jsx';
import StatTile from '../../../components/molecules/StatTile.jsx';
import DataTable from '../../../components/organisms/DataTable.jsx';
import FilterBar from '../../../components/molecules/FilterBar.jsx';
import Breadcrumb from '../../../components/molecules/Breadcrumb.jsx';
import Badge from '../../../components/atoms/Badge.jsx';
import { TABLE_ROWS, STATUS_BADGE, KPIS } from '../data.js';

/**
 * DataTableDashboard — عرض جدول معاملات (مجال: إداري/مالي).
 * يركّب StatTile (KPIs) · FilterBar · DataTable · Badge.
 */
const COLUMNS = [
  { key: 'name', label: 'العميل', sortable: true, render: (r) => <span className="cellname">{r.name}</span> },
  { key: 'amount', label: 'المبلغ', align: 'center', num: true, sortable: true, render: (r) => r.amount.toLocaleString('en-US') + ' ر.س' },
  { key: 'status', label: 'الحالة', align: 'center', render: (r) => <Badge variant={STATUS_BADGE[r.status]}><span className="dot"></span>{r.status}</Badge> },
  { key: 'dateN', label: 'التاريخ', align: 'center', sortable: true, render: (r) => r.date },
];

export default function DataTableDashboard() {
  const [q, setQ] = React.useState('');
  const [status, setStatus] = React.useState('');
  const rows = TABLE_ROWS.filter((r) => (!q || r.name.includes(q.trim())) && (!status || r.status === status));
  return (
    <DashboardLayout className="auto" header={<Breadcrumb variant="dash" leadingIcon="home" items={['المعاملات']} />}>
      <div className="fx col gap24">
        <div className="grid cols4">
          {KPIS.map((k, i) => <StatTile key={i} icon={k.icon} value={k.value} label={k.label} delta={k.delta} trend={k.trend} color={k.color} />)}
        </div>
        <DashboardCard title="سجلّ المعاملات">
          <div style={css('margin-bottom:18px')}>
            <FilterBar
              query={q}
              onQuery={setQ}
              searchPlaceholder="ابحث باسم العميل…"
              filters={[{
                value: status, onChange: setStatus, ariaLabel: 'فلترة الحالة', placeholder: 'كل الحالات',
                options: [{ value: '', label: 'كل الحالات' }, { value: 'مكتمل', label: 'مكتمل' }, { value: 'قيد التنفيذ', label: 'قيد التنفيذ' }, { value: 'متأخّر', label: 'متأخّر' }],
              }]}
            />
          </div>
          <DataTable columns={COLUMNS} rows={rows} pageSize={6} ariaLabel="جدول المعاملات" />
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
}
