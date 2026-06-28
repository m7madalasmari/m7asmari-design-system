import React from 'react';
import { css } from '../../../app/lib/css.js';
import DashboardLayout from '../../../patterns/DashboardLayout.jsx';
import DashboardCard from '../DashboardCard.jsx';
import Icon from '../../../components/atoms/Icon.jsx';
import Button from '../../../components/atoms/Button.jsx';
import Breadcrumb from '../../../components/molecules/Breadcrumb.jsx';
import SearchField from '../../../components/molecules/SearchField.jsx';
import NavItem from '../../../components/molecules/NavItem.jsx';
import CollapsibleSection from '../../../components/molecules/CollapsibleSection.jsx';
import FolderItem from '../../../components/molecules/FolderItem.jsx';
import FileRow from '../../../components/molecules/FileRow.jsx';
import UserMenu from '../../../components/molecules/UserMenu.jsx';
import { NAV, FOLDERS, FILES } from '../data.js';

/**
 * FilesDashboard — مدير ملفات: شريط جانبي (تنقّل + مجلّدات + مستخدم) + رأس + قائمة ملفات.
 * يركّب DashboardLayout (sidebar slot) + NavItem/CollapsibleSection/FolderItem/FileRow/UserMenu.
 */
export default function FilesDashboard() {
  const [cat, setCat] = React.useState('all');
  const [openFolders, setOpenFolders] = React.useState(true);

  const sidebar = (
    <React.Fragment>
      <div className="dashside-head">
        <div className="dashlogo"><Icon name="folder" /></div>
        <div>
          <div className="dashside-title">مساحتي</div>
          <div className="dashside-sub">10 غ.ب · مستخدم 64%</div>
        </div>
      </div>
      <div className="dashsearch-wrap"><SearchField variant="dash" placeholder="ابحث في الملفّات…" aria-label="بحث في الملفّات" shortcut="⌘K" /></div>
      <div className="dashscroll">
        {NAV.map((n) => (
          <NavItem key={n.id} variant="panel" icon={n.icon} label={n.label} count={n.count} active={cat === n.id} onClick={() => setCat(n.id)} />
        ))}
        <div className="dashsep"></div>
        <CollapsibleSection open={openFolders} onToggle={() => setOpenFolders((o) => !o)} title="المجلّدات">
          {FOLDERS.map((f, i) => (<FolderItem key={i} {...f} showBar />))}
        </CollapsibleSection>
      </div>
      <div className="dashside-foot">
        <UserMenu name="محمد الأسمري" mail="m@company.com" avatar="assets/avatar.jpg" />
      </div>
    </React.Fragment>
  );

  const header = (
    <React.Fragment>
      <Breadcrumb variant="dash" leadingIcon="home" items={['ملفّاتي', 'كل الملفّات']} />
      <div className="dashtop-acts">
        <button className="dashicobtn" aria-label="عوامل التصفية"><Icon name="sliders-horizontal" /></button>
        <Button variant="primary"><Icon name="plus" />رفع ملف</Button>
      </div>
    </React.Fragment>
  );

  return (
    <DashboardLayout className="auto" sidebar={sidebar} header={header}>
      <div className="dashwelcome">
        <div>
          <h3>كل الملفّات</h3>
          <p>128 عنصرًا · آخر تحديث قبل دقيقتين.</p>
        </div>
      </div>
      <DashboardCard title="أحدث الملفّات" action={<Button variant="ghost sm">عرض الكل</Button>}>
        <div style={css('margin:-6px -4px')}>
          {FILES.map((f, i) => (<FileRow key={i} icon={f.icon} name={f.name} size={f.size} mod={f.mod} color={f.color} />))}
        </div>
      </DashboardCard>
    </DashboardLayout>
  );
}
