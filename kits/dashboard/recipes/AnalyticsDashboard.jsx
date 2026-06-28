import React from 'react';
import { css } from '../../../app/lib/css.js';
import DashboardLayout from '../../../patterns/DashboardLayout.jsx';
import DashboardCard from '../DashboardCard.jsx';
import StatTile from '../../../components/molecules/StatTile.jsx';
import ActivityItem from '../../../components/molecules/ActivityItem.jsx';
import RingStat from '../../../components/molecules/RingStat.jsx';
import Breadcrumb from '../../../components/molecules/Breadcrumb.jsx';
import Select from '../../../components/organisms/Select.jsx';
import LineChart from '../../../components/charts/LineChart.jsx';
import BarChart from '../../../components/charts/BarChart.jsx';
import DonutChart from '../../../components/charts/DonutChart.jsx';
import Legend from '../../../components/charts/Legend.jsx';
import { KPIS, REVENUE_SERIES, CHANNELS, ORDER_SPLIT, ACTIVITY, ANALYTICS_RING } from '../data.js';

/**
 * AnalyticsDashboard — لمحة تحليلية (مجال: SaaS/عام).
 * يركّب StatTile · LineChart · RingStat · DonutChart + Legend · BarChart · ActivityItem.
 */
export default function AnalyticsDashboard() {
  const [period, setPeriod] = React.useState('week');
  return (
    <DashboardLayout
      className="auto"
      header={(
        <React.Fragment>
          <Breadcrumb variant="dash" leadingIcon="home" items={['التحليلات', 'لمحة عامة']} />
          <div className="dashtop-acts">
            <Select ariaLabel="الفترة" value={period} onChange={setPeriod}
              options={[{ value: 'week', label: 'هذا الأسبوع' }, { value: 'month', label: 'هذا الشهر' }, { value: 'quarter', label: 'هذا الربع' }]} />
          </div>
        </React.Fragment>
      )}
    >
      <div className="fx col gap24">
        <div className="grid cols4">
          {KPIS.map((k, i) => <StatTile key={i} icon={k.icon} value={k.value} label={k.label} delta={k.delta} trend={k.trend} color={k.color} />)}
        </div>

        <div className="grid cols2" style={css('align-items:start')}>
          <DashboardCard title="الإيراد عبر الأسبوع"><LineChart data={REVENUE_SERIES} ariaLabel="الإيراد عبر أيام الأسبوع" /></DashboardCard>
          <DashboardCard title="تحقيق الهدف الشهري">
            <div className="fx ac jc" style={css('padding:8px 0')}>
              <RingStat value={ANALYTICS_RING.value} max={ANALYTICS_RING.max} label={ANALYTICS_RING.label} color={ANALYTICS_RING.color} />
            </div>
          </DashboardCard>
        </div>

        <div className="grid cols2" style={css('align-items:start')}>
          <DashboardCard title="توزيع الطلبات">
            <div className="fx ac gap24 wrap">
              <DonutChart segments={ORDER_SPLIT} centerLabel="62%" centerSub="مكتمل" ariaLabel="توزيع حالات الطلبات" />
              <Legend column items={ORDER_SPLIT.map((s) => ({ label: s.label, value: s.value + '%', color: s.color }))} />
            </div>
          </DashboardCard>
          <DashboardCard title="مصادر الزيارات"><BarChart data={CHANNELS} ariaLabel="مصادر الزيارات حسب القناة" /></DashboardCard>
        </div>

        <DashboardCard title="النشاط الأخير">
          {ACTIVITY.map((a, i) => <ActivityItem key={i} icon={a.icon} action={a.action} file={a.file} time={a.time} />)}
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
}
