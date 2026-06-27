import React from 'react';
import Avatar from '../components/Avatar.jsx';
import Button from '../components/Button.jsx';
import StatTile from '../components/StatTile.jsx';
import FileRow from '../components/FileRow.jsx';
import FolderItem from '../components/FolderItem.jsx';
import ActivityItem from '../components/ActivityItem.jsx';
import NavItem from '../components/NavItem.jsx';
import UserMenu from '../components/UserMenu.jsx';
import NotificationMenu from '../components/NotificationMenu.jsx';
import CollapsibleSection from '../components/CollapsibleSection.jsx';
import SearchField from '../components/SearchField.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';

export default function DashboardShell({ v }) {
  const { dashCats, dashFiles, dashFolders, dashNotifOpen, dashNotifs, dashPinnedFolders, dashRecent, dashSec, dashStats, dashTags, dashUnread, toggleDashNotif, toggleFolders, togglePinned, toggleRecent, toggleTags, toggleTheme } = v;
  return (
<div className="dashframe">
<aside className="dashside">
<div className="dashside-head"><div className="dashlogo"><i data-lucide="layers"></i></div><div><div className="dashside-title">لوحة M7asmari</div><div className="dashside-sub">الإصدار 2.0</div></div></div>
<div className="dashsearch-wrap"><SearchField variant="dash" placeholder="ابحث في كل شيء…" aria-label="بحث في اللوحة" shortcut="⌘K" /></div>
<div className="dashscroll">
{(dashCats || []).map((c) => (<NavItem variant="panel" key={c.id} icon={c.icon} label={c.label} count={c.count} active={c.active} onClick={c.fn} />))}
<div className="dashsep"></div>
<CollapsibleSection open={dashSec.pinned} onToggle={togglePinned} title="مثبّت" titleIcon={<svg className="pinico" viewBox="0 0 24 24"><path d="M12 17v5M9 3h6l-1 7 3 2H7l3-2-1-7z"></path></svg>}>
{(dashPinnedFolders || []).map((f, $index) => (<FolderItem key={$index} {...f} showStar />))}
</CollapsibleSection>
<CollapsibleSection open={dashSec.folders} onToggle={toggleFolders} title="المجلّدات" actions={<div className="dashsec-actions"><button aria-label="ترتيب"><svg viewBox="0 0 24 24"><path d="M11 5h10M11 12h10M11 19h7M3 8l3-3 3 3M6 5v14"></path></svg></button><button aria-label="مجلّد جديد"><svg viewBox="0 0 24 24"><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2zM12 11v4M10 13h4"></path></svg></button></div>}>
{(dashFolders || []).map((f, $index) => (<FolderItem key={$index} {...f} showBar />))}
</CollapsibleSection>
<div className="dashsep"></div>
<CollapsibleSection open={dashSec.recent} onToggle={toggleRecent} title="النشاط الأخير">
{(dashRecent || []).map((a, $index) => (<ActivityItem key={$index} {...a} />))}
</CollapsibleSection>
<div className="dashsep"></div>
<CollapsibleSection open={dashSec.tags} onToggle={toggleTags} title="الوسوم">
<div className="dashtags">{(dashTags || []).map((t, $index) => (<span className="dashtag" key={$index}><i data-lucide="tag"></i>{t}</span>))}</div>
</CollapsibleSection>
</div>
<div className="dashside-foot">
<div className="dashstorage"><div className="dashstorage-top"><b>التخزين</b><span className="numjoin">7.5 / 10 غ.ب</span></div><div className="dashstorage-bar"><span></span></div><Button variant="outline sm w100"><i data-lucide="sparkles"></i>الترقية للنسخة الاحترافية</Button></div>
<UserMenu name="محمد الأسمري" mail="alex@company.com" avatar="assets/avatar.jpg" onToggleTheme={toggleTheme} />
</div>
</aside>
<div className="dashmain">
<div className="dashtop">
<Breadcrumb variant="dash" leadingIcon="home" items={['الرئيسية']} />
<div className="dashtop-acts">
<button className="dashicobtn" aria-label="عوامل التصفية"><i data-lucide="sliders-horizontal"></i></button>
<NotificationMenu open={dashNotifOpen} unread={dashUnread} items={dashNotifs} onToggle={toggleDashNotif} />
<Avatar variant="sm"><img src="assets/avatar.jpg" alt="" /></Avatar>
</div>
</div>
<div className="dashbody">
<div className="dashwelcome"><div><h3>مرحبًا من جديد، محمد!</h3><p>إليك ما يجري في مساحة عملك اليوم.</p></div><Button variant="primary"><i data-lucide="plus"></i>عنصر جديد</Button></div>
<div className="dashstats">{(dashStats || []).map((s, $index) => (<StatTile key={$index} icon={s.icon} value={s.val} label={s.label} delta={s.delta} trend={s.trend} color={s.color} />))}</div>
<div className="dashfiles"><div className="dashfiles-head"><b>أحدث الملفات</b><Button variant="ghost sm">عرض الكل</Button></div>{(dashFiles || []).map((f, $index) => (<FileRow key={$index} icon={f.icon} name={f.name} size={f.size} mod={f.mod} color={f.color} />))}</div>
</div>
</div>
</div>
  );
}
