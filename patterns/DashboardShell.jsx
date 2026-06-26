import React from 'react';
import { css } from '../app/lib/css.js';
import Avatar from '../components/Avatar.jsx';
import Button from '../components/Button.jsx';

export default function DashboardShell({ v }) {
  const { dashCats, dashFiles, dashFolders, dashFoldersCls, dashNotifCls, dashNotifs, dashPinnedCls, dashPinnedFolders, dashRecent, dashRecentCls, dashStats, dashTags, dashTagsCls, dashUnread, toggleDashNotif, toggleFolders, togglePinned, toggleRecent, toggleTags, toggleTheme } = v;
  return (
<div className="dashframe">
<aside className="dashside">
<div className="dashside-head"><div className="dashlogo"><i data-lucide="layers"></i></div><div><div className="dashside-title">لوحة M7asmari</div><div className="dashside-sub">الإصدار 2.0</div></div></div>
<div className="dashsearch-wrap"><div className="dashsearch"><i data-lucide="search"></i><input placeholder="ابحث في كل شيء…" /><span className="dashkbd">⌘K</span></div></div>
<div className="dashscroll">
{(dashCats || []).map((c, $index) => (<React.Fragment key={$index}><button className={c.cls} onClick={c.fn}><i data-lucide={c.icon}></i><span className="dashcat-label">{c.label}</span><span className="dashcat-count">{c.count}</span></button></React.Fragment>))}
<div className="dashsep"></div>
<div className={`dashsecwrap ${dashPinnedCls}`}><div className="dashsec-head"><div className="dashsec-title" onClick={togglePinned}><svg className="chev" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"></path></svg><svg className="pinico" viewBox="0 0 24 24"><path d="M12 17v5M9 3h6l-1 7 3 2H7l3-2-1-7z"></path></svg>مثبّت</div></div><div className="dashsec-body"><div className="dashsec-inner">{(dashPinnedFolders || []).map((f, $index) => (<React.Fragment key={$index}><div className="dashfolder"><div className="dashfolder-ic" style={css(f.boxStyle)}><i data-lucide="folder"></i></div><div className="dashfolder-main"><div className="dashfolder-name">{f.label}</div><div className="dashfolder-meta">{f.items} عنصر • {f.size}</div></div><i data-lucide="star" style={css('width:14px;height:14px;fill:var(--amber-400);stroke:var(--amber-500)')}></i><div className="dashfolder-acts"><button className={f.pinCls} onClick={f.togglePin}><svg viewBox="0 0 24 24"><path d="M12 17v5M9 3h6l-1 7 3 2H7l3-2-1-7z"></path></svg></button><button><svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button></div></div></React.Fragment>))}</div></div></div>
<div className={`dashsecwrap ${dashFoldersCls}`}><div className="dashsec-head"><div className="dashsec-title" onClick={toggleFolders}><svg className="chev" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"></path></svg>المجلّدات</div><div className="dashsec-actions"><button><svg viewBox="0 0 24 24"><path d="M11 5h10M11 12h10M11 19h7M3 8l3-3 3 3M6 5v14"></path></svg></button><button><svg viewBox="0 0 24 24"><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2zM12 11v4M10 13h4"></path></svg></button></div></div><div className="dashsec-body"><div className="dashsec-inner">{(dashFolders || []).map((f, $index) => (<React.Fragment key={$index}><div className="dashfolder"><div className="dashfolder-ic" style={css(f.boxStyle)}><i data-lucide="folder"></i></div><div className="dashfolder-main"><div className="dashfolder-name">{f.label}{(f.pinned) ? (<React.Fragment><svg className="pinico" viewBox="0 0 24 24"><path d="M12 17v5M9 3h6l-1 7 3 2H7l3-2-1-7z"></path></svg></React.Fragment>) : null}</div><div className="dashfolder-meta">{f.items} عنصر • {f.size}</div><div className="dashfolder-bar"><span style={css(f.fillStyle)}></span></div></div><div className="dashfolder-acts"><button className={f.pinCls} onClick={f.togglePin}><svg viewBox="0 0 24 24"><path d="M12 17v5M9 3h6l-1 7 3 2H7l3-2-1-7z"></path></svg></button><button><svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button></div></div></React.Fragment>))}</div></div></div>
<div className="dashsep"></div>
<div className={`dashsecwrap ${dashRecentCls}`}><div className="dashsec-head"><div className="dashsec-title" onClick={toggleRecent}><svg className="chev" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"></path></svg>النشاط الأخير</div></div><div className="dashsec-body"><div className="dashsec-inner">{(dashRecent || []).map((a, $index) => (<React.Fragment key={$index}><div className="dashact"><i data-lucide={a.icon}></i><div className="dashact-main"><div className="dashact-text"><span>{a.action}</span> <b>{a.file}</b></div><div className="dashact-time">{a.time}</div></div></div></React.Fragment>))}</div></div></div>
<div className="dashsep"></div>
<div className={`dashsecwrap ${dashTagsCls}`}><div className="dashsec-head"><div className="dashsec-title" onClick={toggleTags}><svg className="chev" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"></path></svg>الوسوم</div></div><div className="dashsec-body"><div className="dashsec-inner"><div className="dashtags">{(dashTags || []).map((t, $index) => (<React.Fragment key={$index}><span className="dashtag"><i data-lucide="tag"></i>{t}</span></React.Fragment>))}</div></div></div></div>
</div>
<div className="dashside-foot">
<div className="dashstorage"><div className="dashstorage-top"><b>التخزين</b><span className="numjoin">7.5 / 10 غ.ب</span></div><div className="dashstorage-bar"><span></span></div><Button variant="outline sm w100"><i data-lucide="sparkles"></i>الترقية للنسخة الاحترافية</Button></div>
<div className="dashuser"><Avatar variant=""><img src="assets/avatar.jpg" alt="" /></Avatar><div className="dashuser-main"><div className="dashuser-name">محمد الأسمري</div><div className="dashuser-mail">alex@company.com</div></div><div className="dashuser-acts"><button onClick={toggleTheme}><i data-lucide="moon"></i></button><button><i data-lucide="settings"></i></button></div></div>
</div>
</aside>
<div className="dashmain">
<div className="dashtop">
<div className="dashcrumb"><i data-lucide="home"></i><svg viewBox="0 0 24 24" style={css('width:13px;height:13px')}><path d="M9 6l6 6-6 6"></path></svg><span className="here">الرئيسية</span></div>
<div className="dashtop-acts">
<button className="dashicobtn" aria-label="عوامل التصفية"><i data-lucide="sliders-horizontal"></i></button>
<div className={`dashnotif ${dashNotifCls}`}><button className="dashicobtn" aria-label="الإشعارات" onClick={toggleDashNotif}><i data-lucide="bell"></i>{(dashUnread) ? (<React.Fragment><span className="dashbell-badge">{dashUnread}</span></React.Fragment>) : null}</button><div className="dashnotif-pop"><div className="dashnotif-head"><b>الإشعارات</b><button>تعليم الكل كمقروء</button></div>{(dashNotifs || []).map((n, $index) => (<React.Fragment key={$index}><div className={n.cls}><span className="dashnotif-dot"></span><div><div className="dashnotif-b">{n.title}</div><div className="dashnotif-m">{n.msg}</div><div className="dashnotif-t">{n.time}</div></div></div></React.Fragment>))}</div></div>
<Avatar variant="sm"><img src="assets/avatar.jpg" alt="" /></Avatar>
</div>
</div>
<div className="dashbody">
<div className="dashwelcome"><div><h3>مرحبًا من جديد، محمد!</h3><p>إليك ما يجري في مساحة عملك اليوم.</p></div><Button variant="primary"><i data-lucide="plus"></i>عنصر جديد</Button></div>
<div className="dashstats">{(dashStats || []).map((s, $index) => (<React.Fragment key={$index}><div className="dashstat"><div className="dashstat-top"><div className="dashstat-ic" style={css(s.iconStyle)}><i data-lucide={s.icon}></i></div><svg className={`dashstat-trend ${s.trend}`} viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8M21 7v6M21 7h-6"></path></svg></div><div className="dashstat-v">{s.val}</div><div className="dashstat-l">{s.label}</div><div className={s.deltaCls}><i data-lucide="trending-up"></i><span className="numjoin">{s.delta}</span></div></div></React.Fragment>))}</div>
<div className="dashfiles"><div className="dashfiles-head"><b>أحدث الملفات</b><Button variant="ghost sm">عرض الكل</Button></div>{(dashFiles || []).map((f, $index) => (<React.Fragment key={$index}><div className="dashfile"><div className="dashfile-ic" style={css(f.iconStyle)}><i data-lucide={f.icon}></i></div><div className="dashfile-main"><div className="dashfile-name">{f.name}</div><div className="dashfile-meta">{f.size} • عُدّل {f.mod}</div></div><button className="dashfile-more" aria-label="خيارات الملف"><svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button></div></React.Fragment>))}</div>
</div>
</div>
</div>
  );
}
