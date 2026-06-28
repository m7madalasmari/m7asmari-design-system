// kits/dashboard/index.js — سجلّ Dashboard Kit: كتالوج لوحات قابل للقراءة آليًا، مصنّف.
// كل وصفة تركيبة من مكوّنات/widgets M7 core فقط — لا هوية/توكنز/CSS خاصّة.
import AnalyticsDashboard from './recipes/AnalyticsDashboard.jsx';
import ExecutiveDashboard from './recipes/ExecutiveDashboard.jsx';
import DataTableDashboard from './recipes/DataTableDashboard.jsx';
import FilesDashboard from './recipes/FilesDashboard.jsx';
import SettingsDashboard from './recipes/SettingsDashboard.jsx';
import StoreDashboard from './recipes/StoreDashboard.jsx';
import ProfileDashboard from './recipes/ProfileDashboard.jsx';
import CrmDashboard from './recipes/CrmDashboard.jsx';
import KanbanDashboard from './recipes/KanbanDashboard.jsx';

export const CATEGORIES = [
  { id: 'analytics', title: 'تحليلات' },
  { id: 'data', title: 'جداول وبيانات' },
  { id: 'entities', title: 'كيانات وملفّات' },
  { id: 'workflow', title: 'مهام وإعدادات' },
];

export const RECIPES = [
  { id: 'analytics', title: 'لمحة تحليلية', category: 'analytics', domain: 'SaaS', component: AnalyticsDashboard, uses: ['StatTile', 'LineChart', 'RingStat', 'DonutChart', 'Legend', 'BarChart', 'ActivityItem', 'DashboardLayout'] },
  { id: 'executive', title: 'لمحة تنفيذية', category: 'analytics', domain: 'إدارة عليا', component: ExecutiveDashboard, uses: ['StatTile', 'MultiLineChart', 'WaterfallChart', 'BulletChart', 'MetricGrid', 'DistributionBar', 'DashboardLayout'] },
  { id: 'store', title: 'المتجر والطلبات', category: 'analytics', domain: 'تجارة', component: StoreDashboard, uses: ['StatTile', 'LineChart', 'RankList', 'DataTable', 'Badge', 'DashboardLayout'] },
  { id: 'table', title: 'جدول بيانات', category: 'data', domain: 'إداري/مالي', component: DataTableDashboard, uses: ['StatTile', 'FilterBar', 'DataTable', 'Badge', 'Pagination', 'DashboardLayout'] },
  { id: 'crm', title: 'CRM / عملاء', category: 'data', domain: 'مبيعات', component: CrmDashboard, uses: ['StatTile', 'Sparkline', 'Timeline', 'DataTable', 'Badge', 'DashboardLayout'] },
  { id: 'profile', title: 'ملف شخصي', category: 'entities', domain: 'تعليم/HR', component: ProfileDashboard, uses: ['ProfileHeader', 'StatTile', 'GoalCard', 'Timeline'] },
  { id: 'files', title: 'مدير ملفات', category: 'entities', domain: 'محتوى', component: FilesDashboard, uses: ['NavItem', 'CollapsibleSection', 'FolderItem', 'FileRow', 'UserMenu', 'SearchField', 'DashboardLayout'] },
  { id: 'kanban', title: 'لوحة مهام', category: 'workflow', domain: 'مهام/إدارة', component: KanbanDashboard, uses: ['Kanban', 'PageHeader', 'Badge', 'Avatar'] },
  { id: 'settings', title: 'الإعدادات', category: 'workflow', domain: 'حساب', component: SettingsDashboard, uses: ['Tabs', 'Field', 'Input', 'Textarea', 'Switch', 'Select', 'RadioGroup', 'DashboardLayout'] },
];

export const DASHBOARD_KIT = {
  id: 'dashboard',
  title: 'Dashboard Kit',
  description: 'لوحات تحكّم عربية RTL من كتالوج widgets محايد للمجال (رسوم/جداول/تخطيط/كيانات) — بلا هوية أو توكنز خاصّة.',
  categories: CATEGORIES,
  recipes: RECIPES,
};

export default DASHBOARD_KIT;
