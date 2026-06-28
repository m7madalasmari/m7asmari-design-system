import React from 'react';
import { css } from '../../../app/lib/css.js';
import DashboardLayout from '../../../patterns/DashboardLayout.jsx';
import DashboardCard from '../DashboardCard.jsx';
import StatTile from '../../../components/molecules/StatTile.jsx';
import Breadcrumb from '../../../components/molecules/Breadcrumb.jsx';
import Button from '../../../components/atoms/Button.jsx';
import Icon from '../../../components/atoms/Icon.jsx';
import Badge from '../../../components/atoms/Badge.jsx';
import LineChart from '../../../components/charts/LineChart.jsx';
import RankList from '../../../components/molecules/RankList.jsx';
import DataTable from '../../../components/organisms/DataTable.jsx';
import { STORE_KPIS, SALES_SERIES, TOP_PRODUCTS, ORDERS, STATUS_BADGE } from '../data.js';

/**
 * StoreDashboard — لوحة متجر/طلبات (مجال: تجارة/منتجات).
 * يركّب StatTile · LineChart · RankList · DataTable.
 */
const ORDER_COLS = [
  { key: 'customer', label: 'العميل', sortable: true, render: (r) => <span className="cellname">{r.customer}</span> },
  { key: 'total', label: 'الإجمالي', align: 'center', num: true, sortable: true, render: (r) => r.total.toLocaleString('en-US') + ' ر.س' },
  { key: 'status', label: 'الحالة', align: 'center', render: (r) => <Badge variant={STATUS_BADGE[r.status]}><span className="dot"></span>{r.status}</Badge> },
  { key: 'dateN', label: 'التاريخ', align: 'center', sortable: true, render: (r) => r.date },
];

export default function StoreDashboard() {
  return (
    <DashboardLayout
      className="auto"
      header={(
        <React.Fragment>
          <Breadcrumb variant="dash" leadingIcon="home" items={['المتجر', 'الطلبات']} />
          <div className="dashtop-acts"><Button variant="primary"><Icon name="plus" />طلب جديد</Button></div>
        </React.Fragment>
      )}
    >
      <div className="fx col gap24">
        <div className="grid cols4">
          {STORE_KPIS.map((k, i) => <StatTile key={i} icon={k.icon} value={k.value} label={k.label} delta={k.delta} trend={k.trend} color={k.color} />)}
        </div>
        <div className="grid cols2" style={css('align-items:start')}>
          <DashboardCard title="المبيعات عبر الأسبوع"><LineChart data={SALES_SERIES} ariaLabel="المبيعات عبر الأسبوع" /></DashboardCard>
          <DashboardCard title="أفضل المنتجات"><RankList items={TOP_PRODUCTS} /></DashboardCard>
        </div>
        <DashboardCard title="أحدث الطلبات"><DataTable columns={ORDER_COLS} rows={ORDERS} pageSize={6} ariaLabel="الطلبات" /></DashboardCard>
      </div>
    </DashboardLayout>
  );
}
