import React from 'react';
import { css } from '../../../app/lib/css.js';
import DashboardLayout from '../../../patterns/DashboardLayout.jsx';
import DashboardCard from '../DashboardCard.jsx';
import StatTile from '../../../components/molecules/StatTile.jsx';
import Breadcrumb from '../../../components/molecules/Breadcrumb.jsx';
import Select from '../../../components/organisms/Select.jsx';
import MultiLineChart from '../../../components/charts/MultiLineChart.jsx';
import WaterfallChart from '../../../components/charts/WaterfallChart.jsx';
import BulletChart from '../../../components/charts/BulletChart.jsx';
import MetricGrid from '../../../components/molecules/MetricGrid.jsx';
import DistributionBar from '../../../components/molecules/DistributionBar.jsx';
import { EXEC_KPIS, EXEC_REVENUE_MULTI, EXEC_WATERFALL, EXEC_TARGETS, EXEC_METRICS, EXEC_SEGMENTS } from '../data.js';

/**
 * ExecutiveDashboard — لمحة تنفيذية (مجال: إدارة عليا/عام).
 * يركّب StatTile · MultiLineChart · WaterfallChart · BulletChart · MetricGrid · DistributionBar.
 * طبقة تشغيل فوق M7 — مكوّنات/توكنز core فقط، بلا هوية خاصّة.
 */
export default function ExecutiveDashboard() {
  const [period, setPeriod] = React.useState('year');
  return (
    <DashboardLayout
      className="auto"
      header={(
        <React.Fragment>
          <Breadcrumb variant="dash" leadingIcon="home" items={['الإدارة', 'لمحة تنفيذية']} />
          <div className="dashtop-acts">
            <Select ariaLabel="الفترة" value={period} onChange={setPeriod}
              options={[{ value: 'quarter', label: 'هذا الربع' }, { value: 'year', label: 'هذا العام' }, { value: 'all', label: 'كل الفترات' }]} />
          </div>
        </React.Fragment>
      )}
    >
      <div className="fx col gap24">
        <div className="grid cols4">
          {EXEC_KPIS.map((k, i) => <StatTile key={i} icon={k.icon} value={k.value} label={k.label} delta={k.delta} trend={k.trend} color={k.color} />)}
        </div>

        <div className="grid cols2" style={css('align-items:start')}>
          <DashboardCard title="الإيراد: ٢٠٢٥ مقابل ٢٠٢٤"><MultiLineChart series={EXEC_REVENUE_MULTI} ariaLabel="مقارنة الإيراد بين عامين" /></DashboardCard>
          <DashboardCard title="تفكيك صافي الإيراد"><WaterfallChart data={EXEC_WATERFALL} ariaLabel="مساهمات صافي الإيراد" /></DashboardCard>
        </div>

        <div className="grid cols2" style={css('align-items:start')}>
          <DashboardCard title="الأداء مقابل الأهداف">
            <div className="fx col gap24">
              {EXEC_TARGETS.map((t, i) => <BulletChart key={i} label={t.label} value={t.value} target={t.target} max={t.max} ranges={t.ranges} valueColor={t.color} />)}
            </div>
          </DashboardCard>
          <DashboardCard title="مؤشّرات رئيسية"><MetricGrid rows={EXEC_METRICS} ariaLabel="المؤشّرات التنفيذية" /></DashboardCard>
        </div>

        <DashboardCard title="الإيراد حسب الشريحة">
          <DistributionBar segments={EXEC_SEGMENTS} ariaLabel="الإيراد حسب شريحة العملاء" />
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
}
