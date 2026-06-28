import React from 'react';
import { css } from '../../../app/lib/css.js';
import DashboardLayout from '../../../patterns/DashboardLayout.jsx';
import DashboardCard from '../DashboardCard.jsx';
import StatTile from '../../../components/molecules/StatTile.jsx';
import Breadcrumb from '../../../components/molecules/Breadcrumb.jsx';
import Badge from '../../../components/atoms/Badge.jsx';
import Sparkline from '../../../components/charts/Sparkline.jsx';
import Timeline from '../../../components/molecules/Timeline.jsx';
import DataTable from '../../../components/organisms/DataTable.jsx';
import { CRM_KPIS, CUSTOMERS, CRM_TIMELINE, DEALS, DEAL_STATUS_BADGE } from '../data.js';

/**
 * CrmDashboard — إدارة علاقات العملاء (مجال: مبيعات).
 * يركّب StatTile · Sparkline · Timeline · DataTable.
 */
const DEAL_COLS = [
  { key: 'name', label: 'الصفقة', sortable: true, render: (r) => <span className="cellname">{r.name}</span> },
  { key: 'customer', label: 'العميل', render: (r) => r.customer },
  { key: 'amount', label: 'القيمة', align: 'center', num: true, sortable: true, render: (r) => r.amount.toLocaleString('en-US') + ' ر.س' },
  { key: 'status', label: 'الحالة', align: 'center', render: (r) => <Badge variant={DEAL_STATUS_BADGE[r.status]}><span className="dot"></span>{r.status}</Badge> },
];

export default function CrmDashboard() {
  return (
    <DashboardLayout className="auto" header={<Breadcrumb variant="dash" leadingIcon="home" items={['CRM', 'نظرة عامة']} />}>
      <div className="fx col gap24">
        <div className="grid cols3">
          {CRM_KPIS.map((k, i) => <StatTile key={i} icon={k.icon} value={k.value} label={k.label} delta={k.delta} trend={k.trend} color={k.color} />)}
        </div>
        <div className="grid cols2" style={css('align-items:start')}>
          <DashboardCard title="أبرز العملاء">
            <div className="fx col gap16">
              {CUSTOMERS.map((c, i) => (
                <div className="fx ac jb gap16" key={i}>
                  <div style={css('min-width:0')}>
                    <div style={css('font-weight:600')}>{c.name}</div>
                    <div className="t-sm">{c.sub}</div>
                  </div>
                  <div style={css('width:84px;flex:none')}><Sparkline data={c.trend} color={c.color} ariaLabel={'اتجاه ' + c.name} /></div>
                  <div className="numjoin" style={css('font-weight:700;flex:none')}>{c.value}</div>
                </div>
              ))}
            </div>
          </DashboardCard>
          <DashboardCard title="آخر الأنشطة"><Timeline items={CRM_TIMELINE} /></DashboardCard>
        </div>
        <DashboardCard title="الصفقات"><DataTable columns={DEAL_COLS} rows={DEALS} pageSize={6} ariaLabel="الصفقات" /></DashboardCard>
      </div>
    </DashboardLayout>
  );
}
