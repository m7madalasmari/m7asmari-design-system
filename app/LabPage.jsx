import React from 'react';
import { css } from './lib/css.js';
import SectionHeader from '../docs/SectionHeader.jsx';
import AppHeader from './chrome/AppHeader.jsx';
import { useTheme } from './lib/useTheme.js';
import { navCommands } from './lib/navCommands.js';
import Icon from '../components/atoms/Icon.jsx';
import Button from '../components/atoms/Button.jsx';
// Statistics family — تنوّع في عرض البيانات
import StatTile from '../components/molecules/StatTile.jsx';
import CompareStat from '../components/molecules/CompareStat.jsx';
import TrendStat from '../components/molecules/TrendStat.jsx';
import GoalCard from '../components/molecules/GoalCard.jsx';
import RingStat from '../components/molecules/RingStat.jsx';
import DistributionBar from '../components/molecules/DistributionBar.jsx';
import MetricGrid from '../components/molecules/MetricGrid.jsx';
import StackedBarChart from '../components/charts/StackedBarChart.jsx';
import MultiLineChart from '../components/charts/MultiLineChart.jsx';
import BulletChart from '../components/charts/BulletChart.jsx';
import WaterfallChart from '../components/charts/WaterfallChart.jsx';
// Family 1 — viz
import Heatmap from '../components/charts/Heatmap.jsx';
import Gauge from '../components/charts/Gauge.jsx';
import Funnel from '../components/charts/Funnel.jsx';
// Family 2 — media
import CompareSlider from '../components/organisms/CompareSlider.jsx';
import Carousel from '../components/organisms/Carousel.jsx';
import TreeView from '../components/organisms/TreeView.jsx';
// Family 3 — social
import AvatarGroup from '../components/molecules/AvatarGroup.jsx';
import ChatThread from '../components/molecules/ChatThread.jsx';
import ContactCard from '../components/molecules/ContactCard.jsx';
// Family 4 — overlay/micro
import CommandPalette from '../components/organisms/CommandPalette.jsx';
import Popover from '../components/organisms/Popover.jsx';
import Rating from '../components/molecules/Rating.jsx';
import Skeleton from '../components/atoms/Skeleton.jsx';

const AV = 'assets/avatar.jpg';
const HEAT = Array.from({ length: 119 }, (_, i) => (i * 3 + (i % 7) * 2) % 6);
// — statistics demo data —
const KPIS = [
  { icon: 'trending-up', value: '128,400 ر.س', label: 'الإيراد الشهري', delta: '+14%', trend: 'up', color: 'var(--chart-1)' },
  { icon: 'user', value: '8,420', label: 'مستخدمون نشطون', delta: '+6%', trend: 'up', color: 'var(--chart-5)' },
  { icon: 'package-check', value: '1,204', label: 'الطلبات', delta: '+9%', trend: 'up', color: 'var(--chart-2)' },
  { icon: 'star', value: '4.8', label: 'متوسّط التقييم', delta: '+0.2', trend: 'up', color: 'var(--chart-3)' },
];
const TREND_UP = [12, 18, 15, 24, 21, 30, 28, 34];
const TREND_FLAT = [22, 20, 23, 19, 21, 20, 22, 21];
const DIST = [
  { label: 'بحث', value: 48 },
  { label: 'مباشر', value: 26 },
  { label: 'إحالات', value: 16 },
  { label: 'اجتماعي', value: 10 },
];
const STACK_SERIES = [
  { key: 'web', label: 'الويب' },
  { key: 'app', label: 'التطبيق' },
  { key: 'store', label: 'المتجر' },
];
const STACK_DATA = [
  { label: 'يناير', web: 20, app: 14, store: 8 },
  { label: 'فبراير', web: 24, app: 18, store: 10 },
  { label: 'مارس', web: 22, app: 22, store: 12 },
  { label: 'أبريل', web: 30, app: 24, store: 14 },
  { label: 'مايو', web: 28, app: 30, store: 18 },
  { label: 'يونيو', web: 36, app: 34, store: 20 },
];
const MULTI = [
  { label: '٢٠٢٤', data: [{ label: 'ر١', value: 32 }, { label: 'ر٢', value: 40 }, { label: 'ر٣', value: 38 }, { label: 'ر٤', value: 52 }] },
  { label: '٢٠٢٥', data: [{ label: 'ر١', value: 44 }, { label: 'ر٢', value: 50 }, { label: 'ر٣', value: 66 }, { label: 'ر٤', value: 72 }] },
];
const WATERFALL = [
  { label: 'رصيد أوّلي', value: 120, type: 'total' },
  { label: 'مبيعات', value: 64 },
  { label: 'اشتراكات', value: 28 },
  { label: 'مرتجعات', value: -22 },
  { label: 'رسوم', value: -14 },
  { label: 'الصافي', type: 'total' },
];
const METRICS = [
  { label: 'الإيراد', value: 128400, prev: 112500, unit: ' ر.س', data: [20, 24, 22, 30, 28, 34] },
  { label: 'المستخدمون', value: 8420, prev: 7960, data: [40, 44, 43, 52, 58, 60] },
  { label: 'الطلبات', value: 1204, prev: 1310, data: [60, 55, 58, 50, 48, 44] },
  { label: 'الإلغاءات', value: 38, prev: 52, data: [9, 8, 7, 6, 5, 4] },
];
const FUNNEL = [
  { label: 'زيارات', value: 4200, color: 'var(--chart-1)' },
  { label: 'تصفّح المنتج', value: 2600, color: 'var(--chart-5)' },
  { label: 'أضيف للسلّة', value: 1200, color: 'var(--chart-3)' },
  { label: 'إتمام الشراء', value: 540, color: 'var(--chart-2)' },
];
const TREE = [
  { id: 'src', label: 'src', icon: 'folder', children: [
    { id: 'comp', label: 'components', icon: 'folder', children: [
      { id: 'btn', label: 'Button.jsx', icon: 'file-text' },
      { id: 'card', label: 'Card.jsx', icon: 'file-text' },
    ] },
    { id: 'app', label: 'app.jsx', icon: 'file-text' },
  ] },
  { id: 'readme', label: 'README.md', icon: 'file-text' },
];
const CHAT = [
  { from: 'them', name: 'محمد', avatar: AV, text: 'جاهز عرض اللوحة الجديدة؟', time: '9:41' },
  { from: 'me', text: 'نعم، أرسلت الرابط الآن 👌', time: '9:42' },
  { from: 'them', name: 'محمد', avatar: AV, text: 'ممتاز، التنوّع واضح هالمرّة.', time: '9:43' },
];
const TEAM = [{ avatar: AV }, { name: 'سارة' }, { name: 'فهد' }, { avatar: AV }, { name: 'ريم' }, { name: 'ماجد' }, { name: 'هند' }];

function Demo({ title, children, className = '' }) {
  return (
    <div className={('panel panel-pad ' + className).trim()}>
      <p className="subhead" style={css('margin:0 0 16px')}>{title}</p>
      {children}
    </div>
  );
}

export default function LabPage() {
  const [dark, toggleTheme] = useTheme();
  const [rating, setRating] = React.useState(4);
  const [cmdOpen, setCmdOpen] = React.useState(false);
  const rootClass = 'ds' + (dark ? ' dark' : '');

  React.useEffect(() => {
    const onKey = (e) => { if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); setCmdOpen(true); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const COMMANDS = [
    ...navCommands({ toggleTheme, dark }),
    { id: 'new', label: 'إنشاء عنصر جديد', icon: 'plus', hint: 'N', action: () => {} },
    { id: 'settings', label: 'الإعدادات', icon: 'settings', action: () => {} },
  ];

  return (
    <div className={rootClass} dir="rtl" lang="ar">
      <AppHeader
        active="lab"
        dark={dark}
        themeLabel={dark ? 'فاتح' : 'داكن'}
        toggleTheme={toggleTheme}
        onOpenCmd={() => setCmdOpen(true)}
        breadcrumb={[{ label: 'الرئيسية', href: '/' }, 'المختبر']}
      />

      <main className="page">
        <section className="hero" data-screen-label="Hero">
          <span className="eyebrow">M7 · Component Lab</span>
          <h1 className="h1">مكتبة مكوّنات M7</h1>
          <p className="lead">تنوّع في عرض الإحصاء وأفكار التصوّر البياني، فوق توكنز النظام نفسها — RTL، فاتح وداكن، وإتاحة كاملة. التنوّع في البيانات والفكرة، لا في المؤثّرات.</p>
        </section>

        {/* Statistics — تنوّع في عرض الإحصاء */}
        <section className="section" data-screen-label="Statistics">
          <SectionHeader kicker="تنوّع الإحصاء" title="أفكار متعدّدة لعرض البيانات" desc="من المؤشّر البسيط إلى المقارنة والاتجاه والتركيب — كل فكرة تجيب سؤالًا مختلفًا عن البيانات." />
          <div className="grid cols4">
            {KPIS.map((k, i) => <StatTile key={i} icon={k.icon} value={k.value} label={k.label} delta={k.delta} trend={k.trend} color={k.color} />)}
          </div>
          <div className="grid cols3" style={css('align-items:start;margin-top:20px')}>
            <Demo title="مقارنة بالفترة السابقة">
              <CompareStat label="الإيراد هذا الشهر" value={128400} prev={112500} unit=" ر.س" color="var(--chart-1)" />
            </Demo>
            <Demo title="رقم باتجاه مدمج">
              <div className="fx col gap24">
                <TrendStat label="الزيارات" value="8,420" delta="+6%" trend="up" data={TREND_UP} color="var(--chart-5)" />
                <TrendStat label="معدّل الارتداد" value="38%" delta="ثابت" trend="flat" data={TREND_FLAT} color="var(--chart-3)" />
              </div>
            </Demo>
            <Demo title="تقدّم نحو هدف">
              <div className="fx col gap24">
                <GoalCard label="هدف المبيعات" value={82000} target={100000} unit=" ر.س" icon="trending-up" color="var(--chart-1)" />
                <GoalCard label="اكتمال الملفّات" value={37} target={50} icon="check" color="var(--chart-2)" />
              </div>
            </Demo>
          </div>
          <div className="grid cols3" style={css('align-items:start;margin-top:20px')}>
            <Demo title="نسبة دائرية (مقياس واحد)"><div className="fx jc"><RingStat value={68} max={100} label="نسبة الإشغال" color="var(--chart-5)" /></div></Demo>
            <Demo title="مقياس نصف-دائري"><div className="fx jc"><Gauge value={72} max={100} label="الأداء العام" color="var(--chart-1)" /></div></Demo>
            <Demo title="توزيع نِسَب (تركيب 100%)"><DistributionBar segments={DIST} ariaLabel="مصادر الزيارات" /></Demo>
          </div>
          <div className="grid cols2" style={css('align-items:start;margin-top:20px')}>
            <Demo title="أعمدة متراكمة (تركيب عبر الفئات)"><StackedBarChart series={STACK_SERIES} data={STACK_DATA} ariaLabel="الإيراد حسب القناة شهريًا" /></Demo>
            <Demo title="خريطة حرارية (كثافة عبر الزمن)"><Heatmap data={HEAT} color="var(--chart-2)" /></Demo>
          </div>
        </section>

        {/* Deeper analytics */}
        <section className="section" data-screen-label="Deeper analytics">
          <SectionHeader kicker="تحليلات أعمق" title="مقارنة، هدف، ومسار التغيّر" desc="أفكار تحليلية تتجاوز المؤشّر الواحد: مقارنة سلاسل، أداء مقابل هدف، وتفكيك أسباب التغيّر." />
          <div className="grid cols2" style={css('align-items:start')}>
            <Demo title="خطّ متعدّد السلاسل (مقارنة فترتين)"><MultiLineChart series={MULTI} ariaLabel="مقارنة الإيراد بين عامين" /></Demo>
            <Demo title="مخطط شلّالي (تفكيك التغيّر)"><WaterfallChart data={WATERFALL} ariaLabel="مساهمات صافي الإيراد" /></Demo>
          </div>
          <div className="grid cols2" style={css('align-items:start;margin-top:20px')}>
            <Demo title="مؤشّرات هدف (Bullet)">
              <div className="fx col gap24">
                <BulletChart label="الإيراد" value={86} target={90} max={120} ranges={[{ value: 50 }, { value: 30 }, { value: 40 }]} valueColor="var(--chart-1)" />
                <BulletChart label="رضا العملاء" value={94} target={85} max={100} ranges={[{ value: 60 }, { value: 20 }, { value: 20 }]} valueColor="var(--chart-2)" />
                <BulletChart label="زمن الاستجابة" value={42} target={30} max={80} ranges={[{ value: 30 }, { value: 25 }, { value: 25 }]} valueColor="var(--chart-3)" />
              </div>
            </Demo>
            <Demo title="جدول مقارنة مؤشّرات (MetricGrid)"><MetricGrid rows={METRICS} ariaLabel="مؤشّرات الأداء" /></Demo>
          </div>
        </section>

        {/* Family 1 — viz */}
        <section className="section" data-screen-label="Novel viz">
          <SectionHeader kicker="تصوّر بياني مبتكر" title="رسوم تتجاوز الخط والأعمدة" />
          <div className="grid cols2" style={css('align-items:start')}>
            <Demo title="قمع تحويل"><Funnel stages={FUNNEL} /></Demo>
            <Demo title="مقاييس متعدّدة">
              <div className="grid cols2" style={css('gap:8px;align-items:start')}>
                <div className="fx jc"><Gauge value={43} max={100} label="استخدام السعة" color="var(--chart-3)" size={150} /></div>
                <div className="fx jc"><Gauge value={90} max={100} label="رضا العملاء" color="var(--chart-2)" size={150} /></div>
              </div>
            </Demo>
          </div>
        </section>

        {/* Family 2 — media */}
        <section className="section" data-screen-label="Media">
          <SectionHeader kicker="وسائط ومحتوى" title="عائلة كانت غائبة تمامًا" />
          <div className="grid cols2" style={css('align-items:start')}>
            <Demo title="مقارنة قبل/بعد (اسحب المقبض)">
              <CompareSlider
                beforeLabel="قبل" afterLabel="بعد"
                before={<img src={AV} alt="" style={css('filter:grayscale(1) contrast(.95)')} />}
                after={<img src={AV} alt="" />}
              />
            </Demo>
            <Demo title="معرض شرائح">
              <Carousel slides={[
                <div style={css('height:220px;display:grid;place-items:center;color:#fff;font-size:24px;font-weight:800;background:linear-gradient(135deg,var(--brand),var(--chart-5))')}>الشريحة الأولى</div>,
                <div style={css('height:220px;display:grid;place-items:center;color:#fff;font-size:24px;font-weight:800;background:linear-gradient(135deg,var(--chart-2),var(--chart-7))')}>الشريحة الثانية</div>,
                <div style={css('height:220px;display:grid;place-items:center;color:#fff;font-size:24px;font-weight:800;background:linear-gradient(135deg,var(--chart-3),var(--chart-4))')}>الشريحة الثالثة</div>,
              ]} />
            </Demo>
          </div>
          <div style={css('margin-top:20px')}>
            <Demo title="شجرة ملفّات (TreeView)"><TreeView nodes={TREE} defaultExpanded={['src', 'comp']} /></Demo>
          </div>
        </section>

        {/* Family 3 — social */}
        <section className="section" data-screen-label="Social">
          <SectionHeader kicker="تواصل واجتماعي" title="مكوّنات الكيانات والمحادثة" />
          <div className="grid cols3" style={css('align-items:start')}>
            <Demo title="مجموعة أفاتارات">
              <div className="fx col gap16">
                <AvatarGroup items={TEAM} max={4} />
                <span className="t-sm">٧ أعضاء في الفريق</span>
              </div>
            </Demo>
            <Demo title="بطاقة جهة اتصال">
              <ContactCard name="محمد الأسمري" role="مدير المنتج" avatar={AV}
                meta={[{ icon: 'user', label: 'الفريق: التصميم' }, { icon: 'clock', label: 'المنطقة: الرياض' }]}
                actions={<><Button variant="brand sm">مراسلة</Button><Button variant="secondary sm">ملف</Button></>} />
            </Demo>
            <Demo title="محادثة (RTL)"><ChatThread messages={CHAT} /></Demo>
          </div>
        </section>

        {/* Family 4 — overlay/micro */}
        <section className="section" data-screen-label="Overlay & micro">
          <SectionHeader kicker="تراكب وتفاعل ولمسات" title="تفاعلات حديثة" />
          <div className="grid cols2" style={css('align-items:start')}>
            <Demo title="لوحة الأوامر (⌘K)">
              <div className="fx col gap16">
                <Button variant="secondary" onClick={() => setCmdOpen(true)}><Icon name="search" />افتح لوحة الأوامر</Button>
                <span className="t-sm">أو اضغط ⌘K / Ctrl+K</span>
              </div>
            </Demo>
            <Demo title="Popover (قائمة سياق)">
              <Popover trigger={<Button variant="secondary"><Icon name="sliders-horizontal" />خيارات</Button>}>
                {({ close }) => (
                  <div className="fx col" style={css('gap:2px')}>
                    <button className="cmdk-item" onClick={close}><Icon name="copy" size={16} />نسخ</button>
                    <button className="cmdk-item" onClick={close}><Icon name="share-2" size={16} />مشاركة</button>
                    <button className="cmdk-item" onClick={close}><Icon name="trash-2" size={16} />حذف</button>
                  </div>
                )}
              </Popover>
            </Demo>
            <Demo title="تقييم نجوم (تفاعلي)">
              <div className="fx col gap16">
                <Rating value={rating} onChange={setRating} />
                <span className="t-sm">قيّمت بـ {rating} من ٥</span>
                <Rating value={3} readOnly />
              </div>
            </Demo>
            <Demo title="هياكل تحميل (Skeleton)">
              <div className="fx ac gap16">
                <Skeleton circle height={48} />
                <div style={css('flex:1')}><Skeleton lines={3} /></div>
              </div>
            </Demo>
          </div>
        </section>
      </main>

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} commands={COMMANDS} />
    </div>
  );
}
