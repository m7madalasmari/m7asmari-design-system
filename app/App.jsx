import React from 'react';
import { css } from './lib/css.js';
import { sortRows, nextSortDir, ariaSortFor } from './lib/sort.js';
import { prefersReducedMotion } from './lib/a11y.js';
import { buildMonth } from './lib/calendar.js';
import TopBar from './chrome/TopBar.jsx';
import SideRail from './chrome/SideRail.jsx';
import Hero from './chrome/Hero.jsx';
import CommandPalette from './chrome/CommandPalette.jsx';
import Colors from '../sections/foundations/Colors.jsx';
import Typography from '../sections/foundations/Typography.jsx';
import Spacing from '../sections/foundations/Spacing.jsx';
import Radius from '../sections/foundations/Radius.jsx';
import Shadow from '../sections/foundations/Shadow.jsx';
import Motion from '../sections/foundations/Motion.jsx';
import Elevation from '../sections/foundations/Elevation.jsx';
import Icons from '../sections/foundations/Icons.jsx';
import States from '../sections/foundations/States.jsx';
import ButtonsSection from '../sections/components/ButtonsSection.jsx';
import InputsSection from '../sections/components/InputsSection.jsx';
import OtpSection from '../sections/components/OtpSection.jsx';
import ControlsSection from '../sections/components/ControlsSection.jsx';
import SelectSection from '../sections/components/SelectSection.jsx';
import ComboboxSection from '../sections/components/ComboboxSection.jsx';
import SearchSliderSection from '../sections/components/SearchSliderSection.jsx';
import CalendarSection from '../sections/components/CalendarSection.jsx';
import UploadSection from '../sections/components/UploadSection.jsx';
import CardsSection from '../sections/components/CardsSection.jsx';
import TablesSection from '../sections/components/TablesSection.jsx';
import BadgesSection from '../sections/components/BadgesSection.jsx';
import NumAnimSection from '../sections/components/NumAnimSection.jsx';
import AvatarsSection from '../sections/components/AvatarsSection.jsx';
import KpiSection from '../sections/components/KpiSection.jsx';
import AlertsSection from '../sections/components/AlertsSection.jsx';
import BannerSection from '../sections/components/BannerSection.jsx';
import FeedbackSection from '../sections/components/FeedbackSection.jsx';
import ModalSection from '../sections/components/ModalSection.jsx';
import DrawerSection from '../sections/components/DrawerSection.jsx';
import LoadingSection from '../sections/components/LoadingSection.jsx';
import EmptySection from '../sections/components/EmptySection.jsx';
import TabsSection from '../sections/components/TabsSection.jsx';
import NavSection from '../sections/components/NavSection.jsx';
import StepperSection from '../sections/components/StepperSection.jsx';
import AccordionSection from '../sections/components/AccordionSection.jsx';
import SwipeSection from '../sections/components/SwipeSection.jsx';
import PatternsSection from '../sections/components/PatternsSection.jsx';
import DarkModeSection from '../sections/reference/DarkModeSection.jsx';
import ResponsiveSection from '../sections/reference/ResponsiveSection.jsx';
import GuidelinesSection from '../sections/reference/GuidelinesSection.jsx';


class App extends React.Component {
  // الحالة المركزية المتبقّية تخصّ الأقسام غير المُستخرَجة بعد (أزرار، ضوابط، رفع، جدول،
  // تقويم، سحب، لوحة، إشعارات، لوحة أوامر). المكوّنات المُستخرَجة تدير حالتها داخليًا.
  state = { theme: this.props.theme ?? 'light', cbTerms: true, cbUpdates: false, swNotif: true, radioPlan: 'pro', upVariant: 'centered', toasts: [], toastPos: 'bottom-right', btnOk: 'idle', btnErr: 'idle', badgeIdx: 0, files: [], swItems: [], swOpen: null, swSide: null, swLast: 'جاهز', calMonth: 5, calYear: 2026, calSel: 14, sortKey: null, sortDir: 1, activeSection: 'colors', cmdOpen: false, cmdQuery: '', dashSec: { pinned: true, folders: true, recent: true, tags: true }, dashCat: 'all', dashNotif: false, dashPinned: ['العمل'], exportFmt: 'tailwind' };
  _filesInit = false;
  _tid = 0;
  _tos = {};
  _numRefs = { mrr: React.createRef(), users: React.createRef(), conv: React.createRef() };
  _numFmt = {
    mrr: (n) => '$' + Math.round(n).toLocaleString('en-US'),
    users: (n) => Math.round(n).toLocaleString('en-US'),
    conv: (n) => n.toFixed(1) + '%'
  };
  _runNums() {
    clearInterval(this._numRAF);
    const targets = { mrr: 129480, users: 8420, conv: 3.8 };
    if (prefersReducedMotion()) { // احترام تقليل الحركة: اعرض القيم النهائية فورًا بلا عدّ
      for (const k in targets) { const el = this._numRefs[k].current; if (el) el.textContent = this._numFmt[k](targets[k]); }
      return;
    }
    const start = performance.now(), dur = 1500;
    const tick = () => {
      const p = Math.min(1, (performance.now() - start) / dur);
      const e = p >= 1 ? 1 : 1 - Math.pow(2, -10 * p);
      for (const k in targets) {
        const el = this._numRefs[k].current;
        if (el) el.textContent = this._numFmt[k](targets[k] * e);
      }
      if (p >= 1) clearInterval(this._numRAF);
    };
    this._numRAF = setInterval(tick, 16);
    tick();
  }
  _watchNums() {
    const el = document.getElementById('numanim');
    if (!el || !window.IntersectionObserver) { this._runNums(); return; }
    this._numIO = new IntersectionObserver((ents) => {
      ents.forEach(en => { if (en.isIntersecting) { this._runNums(); this._numIO.disconnect(); } });
    }, { threshold: 0.4 });
    this._numIO.observe(el);
  }
  runStateful(which) {
    const key = which === 'ok' ? 'btnOk' : 'btnErr';
    if (this.state[key] !== 'idle') return;
    this.setState({ [key]: 'loading' });
    setTimeout(() => {
      this.setState({ [key]: which === 'ok' ? 'success' : 'error' });
      setTimeout(() => this.setState({ [key]: 'idle' }), 1800);
    }, 1400);
  }
  _upTimers = {};
  _swRefs = {};
  _swInit() {
    return [
      { id: 'brief', title: 'موجز الإطلاق', desc: 'إنهاء نصّ الإعلان', meta: '9:41', icon: 'file' },
      { id: 'feedback', title: 'ملاحظات العميل', desc: 'ثلاثة تعليقات تنتظر الرد', meta: '11:08', icon: 'mail' },
      { id: 'review', title: 'مراجعة التصميم', desc: 'تحقّق من المسافات قبل التسليم', meta: '13:20', icon: 'user' },
      { id: 'incident', title: 'تشغيل مُعلَّم', desc: 'طابور الإعادة فيه مهمّة فاشلة', meta: 'الآن', icon: 'flag' }
    ];
  }
  _getSwRef(id) { if (!this._swRefs[id]) this._swRefs[id] = React.createRef(); return this._swRefs[id]; }
  _swAction(id, actId) {
    const labels = { done: 'تم', pin: 'تثبيت', later: 'لاحقًا', trash: 'حذف' };
    const item = this.state.swItems.find(i => i.id === id); if (!item) return;
    const tone = actId === 'trash' ? 'error' : actId === 'done' ? 'success' : 'info';
    this._add({ status: tone, title: labels[actId], description: item.title });
    const fg = this._swRefs[id] && this._swRefs[id].current; if (fg) fg.style.transform = '';
    this.setState(s => ({ swItems: actId === 'trash' ? s.swItems.filter(i => i.id !== id) : s.swItems, swLast: labels[actId] + ' · ' + item.title, swOpen: null, swSide: null }));
  }
  swDown(id) { return (e) => {
    const fg = this._swRefs[id] && this._swRefs[id].current; if (!fg) return;
    this._drag = { id, startX: e.clientX, dx: 0, fg };
    fg.style.transition = 'none';
    if (fg.setPointerCapture && e.pointerId != null) { try { fg.setPointerCapture(e.pointerId); } catch (_) {} }
  }; }
  swMove(e) { const d = this._drag; if (!d) return; let dx = e.clientX - d.startX; dx = Math.max(-150, Math.min(150, dx)); d.dx = dx; d.fg.style.transform = 'translateX(' + dx + 'px)'; }
  swUp() {
    const d = this._drag; if (!d) return; this._drag = null;
    const fg = d.fg; fg.style.transition = ''; const dx = d.dx, trig = 118, reveal = 50;
    if (dx >= trig) { this._swAction(d.id, 'done'); }
    else if (dx <= -trig) { this._swAction(d.id, 'trash'); }
    else if (dx >= reveal) { fg.style.transform = ''; this.setState({ swOpen: d.id, swSide: 'left' }); }
    else if (dx <= -reveal) { fg.style.transform = ''; this.setState({ swOpen: d.id, swSide: 'right' }); }
    else { fg.style.transform = ''; this.setState({ swOpen: null, swSide: null }); }
  }
  resetSwipe() { this.setState({ swItems: this._swInit(), swLast: 'تمت الاستعادة', swOpen: null, swSide: null }); }
  _initialFiles() {
    return [
      { id: 'brand', name: 'brand-assets.zip', sizeLabel: '18.4 MB', ext: 'ZIP', kind: 'zip', progress: 100, status: 'success', error: null },
      { id: 'release', name: 'release-cut.mov', sizeLabel: '84.2 MB', ext: 'MOV', kind: 'mov', progress: 58, status: 'uploading', error: null },
      { id: 'contract', name: 'vendor-contract.pdf', sizeLabel: '2.8 MB', ext: 'PDF', kind: 'pdf', progress: 32, status: 'error', error: 'انقطع الاتصال' }
    ];
  }
  _stopUpload(id) { if (this._upTimers[id]) { clearInterval(this._upTimers[id]); delete this._upTimers[id]; } }
  _startUpload(id) {
    this._stopUpload(id);
    this._upTimers[id] = setInterval(() => {
      const cur = this.state.files, tg = cur.find(f => f.id === id);
      if (!tg || tg.status !== 'uploading') { this._stopUpload(id); return; }
      const np = Math.min(100, (tg.progress || 0) + 7 + Math.random() * 12), done = np >= 100;
      this.setState({ files: cur.map(f => f.id === id ? { ...f, progress: np, status: done ? 'success' : 'uploading', error: null } : f) });
      if (done) { this._stopUpload(id); this._add({ status: 'success', title: 'اكتمل الرفع', description: tg.name }); }
    }, 520);
  }
  retryFile(id) {
    this.setState(s => ({ files: s.files.map(f => f.id === id ? { ...f, status: 'uploading', error: null } : f) }));
    setTimeout(() => this._startUpload(id), 0);
  }
  resetUpload() {
    Object.keys(this._upTimers).forEach(id => this._stopUpload(id));
    this.setState({ files: this._initialFiles() });
    setTimeout(() => this._startUpload('release'), 0);
  }
  copyToken(v) { try { navigator.clipboard && navigator.clipboard.writeText(v); } catch (_) {} this._add({ status: 'success', title: 'تم النسخ', description: v }); }
  calPrev() { this.setState(s => { let m = s.calMonth - 1, y = s.calYear; if (m < 0) { m = 11; y--; } return { calMonth: m, calYear: y }; }); }
  calNext() { this.setState(s => { let m = s.calMonth + 1, y = s.calYear; if (m > 11) { m = 0; y++; } return { calMonth: m, calYear: y }; }); }
  calSelect(d) { this.setState({ calSel: d }); }
  setSort(key) { this.setState(s => ({ sortKey: key, sortDir: nextSortDir(s.sortKey, s.sortDir, key) })); }
  toggleCmd() { this.setState(s => ({ cmdOpen: !s.cmdOpen, cmdQuery: '' })); }
  _scaleDefs() {
    return {
      sky: ['#ecf9ff','#d3f0ff','#b1e6ff','#7dd6ff','#38c0fb','#00a6ef','#0084c4','#0a6a9e','#115a82','#15496c','#0d2f47'],
      neutral: ['#fbfaf9','#f3f1ed','#eae7e1','#dcd7ce','#b8b2a8','#8f8d86','#6e6c66','#54534e','#3a3833','#1b1b19','#121210'],
      emerald: ['#e6f9f0','#c7f2dd','#93e6bf','#57d59c','#28c885','#16bd74','#0e9a5d','#0c7c4c','#0c623d','#0a4f33','#042c1c'],
      amber: ['#fef7e7','#fdedc4','#fbdb8c','#f9c652','#f7b332','#f5a623','#c97f06','#a3640a','#854f0f','#6f4210','#3f2305'],
      red: ['#ffeee9','#ffd6cb','#ffb3a1','#ff8a6e','#fd5e3a','#fb3d18','#d22d0d','#ad2410','#8e2113','#761f14','#400b05']
    };
  }
  _exportText(fmt) {
    const steps = [50,100,200,300,400,500,600,700,800,900,950];
    const sc = this._scaleDefs();
    const radii = { sm: '10px', md: '14px', lg: '20px', xl: '28px', full: '999px' };
    const space = { 1: '4px', 2: '8px', 3: '12px', 4: '16px', 6: '24px', 8: '32px', 12: '48px', 16: '64px' };
    if (fmt === 'tailwind') {
      let c = '';
      for (const k in sc) { c += '        ' + k + ': {\n'; steps.forEach((s, i) => { c += '          ' + s + ": '" + sc[k][i] + "',\n"; }); c += '        },\n'; }
      let r = ''; for (const k in radii) r += "        '" + k + "': '" + radii[k] + "',\n";
      return '// tailwind.config.js — M7asmari\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n' + c + '      },\n      borderRadius: {\n' + r + '      },\n    },\n  },\n};';
    }
    if (fmt === 'css') {
      let v = ':root {\n';
      for (const k in sc) { steps.forEach((s, i) => { v += '  --' + k + '-' + s + ': ' + sc[k][i] + ';\n'; }); }
      for (const k in radii) v += '  --r-' + k + ': ' + radii[k] + ';\n';
      for (const k in space) v += '  --space-' + k + ': ' + space[k] + ';\n';
      return v + '}';
    }
    const obj = { color: {}, radius: radii, spacing: {} };
    for (const k in sc) { obj.color[k] = {}; steps.forEach((s, i) => obj.color[k][s] = sc[k][i]); }
    for (const k in space) obj.spacing[k] = space[k];
    return JSON.stringify(obj, null, 2);
  }
  copyExport() { const t = this._exportText(this.state.exportFmt); try { navigator.clipboard && navigator.clipboard.writeText(t); } catch (_) {} this._add({ status: 'success', title: 'نُسخت الرموز', description: 'صيغة ' + this.state.exportFmt + ' في الحافظة.' }); }
  closeCmd() { this.setState({ cmdOpen: false }); }
  cmdGo(id) { this.setState({ cmdOpen: false }); const el = document.getElementById(id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: prefersReducedMotion() ? 'auto' : 'smooth' }); }
  _tableVals() {
    const rows = [
      { name: 'إيثيريوم', av: 'E', avc: '#627eea', bal: '2.40 ETH', balN: 2.40, price: '$3,180', priceN: 3180, chg: '+4.2%', chgN: 4.2, chgCls: 'badge green numjoin', status: 'مكتمل', statusCls: 'badge green' },
      { name: 'USDC', av: 'U', avc: '#16bd74', avtx: '#042c1c', bal: '820.00', balN: 820, price: '$1.00', priceN: 1, chg: '0.0%', chgN: 0, chgCls: 'badge neutral numjoin', status: 'قيد الانتظار', statusCls: 'badge gold' },
      { name: 'أربيتروم', av: 'A', avc: '#f5a623', avtx: '#3f2305', bal: '145.5 ARB', balN: 145.5, price: '$0.92', priceN: 0.92, chg: '−3.1%', chgN: -3.1, chgCls: 'badge red numjoin', status: 'فشل', statusCls: 'badge red' },
      { name: 'أوبتيميزم', av: 'O', avc: '#fb3d18', bal: '60.00 OP', balN: 60, price: '$2.14', priceN: 2.14, chg: '+1.8%', chgN: 1.8, chgCls: 'badge green numjoin', status: 'مُرسَل', statusCls: 'badge brand' }
    ];
    const sorted = sortRows(rows, this.state.sortKey, this.state.sortDir);
    const arrow = (key) => this.state.sortKey === key ? (this.state.sortDir > 0 ? ' ↑' : ' ↓') : '';
    const col = (key, label, align) => ({
      key, label: label + arrow(key), align,
      ariaSort: ariaSortFor(this.state.sortKey, this.state.sortDir, key),
      onSort: () => this.setSort(key),
    });
    return {
      tblRows: sorted,
      tblCols: [col('name', 'الأصل', 'start'), col('balN', 'الرصيد', 'center'), col('priceN', 'السعر', 'center'), col('chgN', '24س', 'center')],
    };
  }
  toggleDash(key) { this.setState(s => ({ dashSec: { ...s.dashSec, [key]: !s.dashSec[key] } })); }
  setDashCat(id) { this.setState({ dashCat: id }); }
  toggleDashNotif() { this.setState(s => ({ dashNotif: !s.dashNotif })); }
  closeDashNotif() { this.setState({ dashNotif: false }); }
  toggleDashPin(label) { this.setState(s => ({ dashPinned: s.dashPinned.includes(label) ? s.dashPinned.filter(f => f !== label) : [...s.dashPinned, label] })); }
  _dashVals() {
    const secCls = (k) => this.state.dashSec[k] ? 'dashsec open' : 'dashsec';
    const cats = [['all', 'كل العناصر', 'layout-grid', 48], ['favorites', 'المفضّلة', 'star', 12], ['recent', 'الأخيرة', 'clock', 8], ['shared', 'المشتركة', 'share-2', 5]];
    const folders = [
      ['العمل', 'var(--sky-500)', 24, '2.4 غ.ب', 65],
      ['شخصي', 'var(--emerald-500)', 15, '1.2 غ.ب', 35],
      ['الأرشيف', 'var(--neutral-500)', 9, '850 م.ب', 20],
      ['أعمال العملاء', 'var(--cat-5)', 32, '3.1 غ.ب', 85]
    ];
    const mkFolder = (f) => {
      const [label, color, items, size, prog] = f;
      const pinned = this.state.dashPinned.includes(label);
      return { label, color, items, size, prog, pinned,
        boxStyle: { background: 'color-mix(in srgb, ' + color + ' 13%, transparent)', color },
        fillStyle: { width: prog + '%', background: color },
        pinCls: pinned ? 'dashpin on' : 'dashpin',
        togglePin: () => this.toggleDashPin(label) };
    };
    const notifs = [
      ['ملف جديد مُشارك', 'شاركت سارة «ميزانية 2024»', 'قبل 5 دقائق', true],
      ['تنبيه التخزين', 'تستخدم 85% من المساحة', 'قبل ساعة', true],
      ['تحديث متاح', 'صدر Dashboard Pro v2.1', 'قبل ساعتين', false]
    ].map(([title, msg, time, unread]) => ({ title, msg, time, unread, cls: unread ? 'dashnotif-item unread' : 'dashnotif-item' }));
    const files = [
      ['مقترح_المشروع.pdf', '2.4 م.ب', 'قبل ساعتين', 'file-text', 'var(--red-500)'],
      ['نظام_التصميم.fig', '5.1 م.ب', 'قبل 5 ساعات', 'palette', 'var(--cat-5)'],
      ['ملاحظات_الاجتماع.docx', '124 ك.ب', 'قبل يوم', 'file-text', 'var(--sky-500)'],
      ['الميزانية_2024.xlsx', '856 ك.ب', 'قبل يومين', 'bar-chart-2', 'var(--emerald-500)']
    ].map(([name, size, mod, icon, color]) => ({ name, size, mod, icon, iconStyle: { background: 'color-mix(in srgb, ' + color + ' 13%, transparent)', color } }));
    const stats = [
      ['48', 'إجمالي الملفات', '+12% هذا الأسبوع', 'folder', 'var(--sky-500)', 'up'],
      ['24', 'العناصر المشتركة', '+8% هذا الأسبوع', 'share-2', 'var(--cat-5)', 'up'],
      ['7.5 غ.ب', 'التخزين المستخدم', '75% من 10 غ.ب', 'hard-drive', 'var(--amber-500)', 'flat']
    ].map(([val, label, delta, icon, color, trend]) => ({ val, label, delta, icon, trend,
      iconStyle: { background: 'color-mix(in srgb, ' + color + ' 13%, transparent)', color },
      deltaCls: trend === 'up' ? 'dashstat-d up' : 'dashstat-d flat' }));
    return {
      dashCats: cats.map(([id, label, icon, count]) => ({ id, label, icon, count, cls: this.state.dashCat === id ? 'dashcat on' : 'dashcat', fn: () => this.setDashCat(id) })),
      dashPinnedCls: secCls('pinned'), dashFoldersCls: secCls('folders'), dashRecentCls: secCls('recent'), dashTagsCls: secCls('tags'),
      togglePinned: () => this.toggleDash('pinned'), toggleFolders: () => this.toggleDash('folders'), toggleRecent: () => this.toggleDash('recent'), toggleTags: () => this.toggleDash('tags'),
      dashPinnedFolders: folders.filter(f => this.state.dashPinned.includes(f[0])).map(mkFolder),
      dashFolders: folders.map(mkFolder),
      dashRecent: [['رفع', 'Design_v2.fig', 'قبل دقيقتين', 'upload'], ['تعديل', 'Presentation.pptx', 'قبل 15 دقيقة', 'pencil'], ['مشاركة', 'Q4_Report.pdf', 'قبل ساعة', 'share-2']].map(([action, file, time, icon]) => ({ action, file, time, icon })),
      dashTags: ['تصميم', 'تطوير', 'تسويق', 'مبيعات', 'دعم'],
      dashNotifs: notifs,
      dashUnread: notifs.filter(n => n.unread).length,
      dashNotifCls: this.state.dashNotif ? 'dashnotif open' : 'dashnotif',
      toggleDashNotif: () => this.toggleDashNotif(), closeDashNotif: () => this.closeDashNotif(),
      dashFiles: files,
      dashStats: stats
    };
  }
  _cmdVals() {
    const all = [['colors', 'الألوان', 'الأسس'], ['type', 'الطباعة', 'الأسس'], ['buttons', 'الأزرار', 'مكوّنات'], ['inputs', 'الحقول', 'مكوّنات'], ['cards', 'البطاقات', 'مكوّنات'], ['tabs', 'التبويبات', 'مكوّنات'], ['badges', 'الشارات', 'مكوّنات'], ['tables', 'الجداول', 'مكوّنات'], ['otp', 'رمز التحقّق', 'مكوّنات'], ['numanim', 'الأرقام المتحرّكة', 'مكوّنات'], ['calendar', 'التقويم', 'مكوّنات'], ['swipe', 'قائمة قابلة للسحب', 'مكوّنات'], ['modal', 'النوافذ المنبثقة', 'مكوّنات'], ['icons', 'الأيقونات', 'الأسس'], ['motion', 'الحركة', 'الأسس'], ['darkmode', 'الوضع الداكن', 'الأسس'], ['guidelines', 'دليل الاستخدام', 'الأسس']];
    const q = this.state.cmdQuery.trim();
    const list = q ? all.filter(x => x[1].includes(q)) : all;
    return {
      cmdScrimCls: this.state.cmdOpen ? 'cmdscrim open' : 'cmdscrim',
      cmdQuery: this.state.cmdQuery,
      onCmdInput: (e) => this.setState({ cmdQuery: e.target.value }),
      closeCmd: () => this.closeCmd(),
      cmdResults: list.map(([id, label, cat]) => ({ label, cat, go: () => this.cmdGo(id) }))
    };
  }
  ripple(e) {
    const b = e.currentTarget, r = b.getBoundingClientRect(), d = Math.max(r.width, r.height);
    const s = document.createElement('span');
    s.className = 'rippledot';
    s.style.width = s.style.height = d + 'px';
    s.style.left = (e.clientX - r.left) + 'px';
    s.style.top = (e.clientY - r.top) + 'px';
    b.appendChild(s);
    setTimeout(() => s.remove(), 600);
  }
  componentDidMount() {
    // النوافذ/الأدراج المُستخرَجة تغلق نفسها بـ Escape داخليًا؛ هنا لوحة الأوامر فقط.
    this._esc = (e) => { if (e.key === 'Escape') this.setState({ cmdOpen: false }); if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); this.toggleCmd(); } };
    window.addEventListener('keydown', this._esc);
    this._copyClick = (e) => { const c = e.target.closest && e.target.closest('[data-copy]'); if (c) { this.copyToken(c.getAttribute('data-copy')); return; } const a = e.target.closest && e.target.closest('[data-action]'); if (a) this._add({ status: a.getAttribute('data-tone') || 'info', title: a.getAttribute('data-action') }); };
    document.addEventListener('click', this._copyClick);
    // إتاحة خانات النسخ بلوحة المفاتيح: قابلة للتركيز + تفعيل بـ Enter/Space (حلقة التركيز عبر قاعدة [tabindex] العامّة)
    document.querySelectorAll('[data-copy]').forEach((el) => {
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
      if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
      if (!el.hasAttribute('aria-label')) el.setAttribute('aria-label', 'نسخ ' + el.getAttribute('data-copy'));
    });
    this._copyKey = (e) => { if (e.key !== 'Enter' && e.key !== ' ') return; const c = e.target.closest && e.target.closest('[data-copy]'); if (c) { e.preventDefault(); this.copyToken(c.getAttribute('data-copy')); } };
    document.addEventListener('keydown', this._copyKey);
    if (window.IntersectionObserver) {
      this._spy = new IntersectionObserver((ents) => {
        ents.forEach(en => { if (en.isIntersecting && en.target.id) this.setState({ activeSection: en.target.id }); });
      }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 });
      document.querySelectorAll('.section[id]').forEach(s => this._spy.observe(s));
    }
    this._renderIcons();
    this._watchNums();
    this.setState({ files: this._initialFiles(), swItems: this._swInit() });
    setTimeout(() => this._startUpload('release'), 300);
    this._badgeTimer = setInterval(() => this.setState(s => ({ badgeIdx: (s.badgeIdx + 1) % 4 })), 1600);
  }
  componentDidUpdate() {
    this._renderIcons();
    if (this.state.theme !== this._lastTheme) {
      this._lastTheme = this.state.theme;
      const root = document.querySelector('.ds');
      if (root) { root.style.display = 'none'; void root.offsetHeight; root.style.display = ''; }
    }
  }
  _renderIcons() {
    if (window.lucide && window.lucide.createIcons) {
      if (document.querySelector('i[data-lucide]')) window.lucide.createIcons();
    } else { clearTimeout(this._lt); this._lt = setTimeout(() => this._renderIcons(), 150); }
  }
  componentWillUnmount() { window.removeEventListener('keydown', this._esc); clearTimeout(this._lt); clearInterval(this._numRAF); if (this._numIO) this._numIO.disconnect(); Object.keys(this._upTimers).forEach(id => this._stopUpload(id)); clearInterval(this._badgeTimer); document.removeEventListener('click', this._copyClick); document.removeEventListener('keydown', this._copyKey); if (this._spy) this._spy.disconnect(); }
  _scls(s){ return s === 'loading' ? 'load' : s === 'success' ? 'ok' : s === 'error' ? 'err' : 'info'; }
  _add(input){ const id = ++this._tid; this.setState(s => ({ toasts: [...s.toasts, { id, ...input }].slice(-5) })); const dur = input.duration === undefined ? 3600 : input.duration; if (dur > 0) this._tos[id] = setTimeout(() => this.dismiss(id), dur); return id; }
  dismiss(id){ clearTimeout(this._tos[id]); delete this._tos[id]; this.setState(s => ({ toasts: s.toasts.filter(t => t.id !== id) })); }
  toastPromise(){ const id = this._add({ status: 'loading', title: 'جارٍ نشر المكوّن', description: 'حزم المصدر والمعاينة وبيانات السجل.', duration: 0 }); setTimeout(() => { this.setState(s => ({ toasts: s.toasts.map(t => t.id === id ? { ...t, status: 'success', title: 'اكتمل النشر', description: 'تم تحديث الإشعار في مكانه من تحميل إلى نجاح.' } : t) })); this._tos[id] = setTimeout(() => this.dismiss(id), 3200); }, 1800); }
  toastSuccess(){ this._add({ status: 'success', title: 'تم نشر المكوّن', description: 'نقطة السجل والمصدر الخام متاحان الآن.' }); }
  toastError(){ this._add({ status: 'error', title: 'فشل الالتقاط', description: 'أعد المحاولة بعد استقرار المتصفّح.' }); }
  clearToasts(){ Object.values(this._tos).forEach(clearTimeout); this._tos = {}; this.setState({ toasts: [] }); }
  moveStack(pos, label){ this.setState({ toastPos: pos }); this._add({ status: 'info', title: 'تغيّر الموضع', description: 'الإشعارات الجديدة تفتح من ' + label + '.' }); }
  renderVals() {
    const acc = this.props.accent ?? 'blue';
    const corners = this.props.corners ?? 'rounded';
    const accClass = acc === 'blue' ? '' : 'acc-' + acc;
    const radClass = corners === 'rounded' ? '' : 'sharp';
    const theme = this.state.theme;
    const posDefs = [['top-left','أعلى يسار','tl'],['top-center','أعلى وسط','tc'],['top-right','أعلى يمين','tr'],['bottom-left','أسفل يسار','bl'],['bottom-center','أسفل وسط','bc'],['bottom-right','أسفل يمين','br']];
    const posMap = {};
    posDefs.forEach(([id, , k]) => { posMap[id] = k; });
    const posList = posDefs.map(([id, label]) => ({ id, label, cls: this.state.toastPos === id ? 'posbtn on' : 'posbtn', fn: () => this.moveStack(id, label) }));
    const toasts = this.state.toasts.slice(-4).map(t => ({ id: t.id, title: t.title, desc: t.description, cls: 'toast2 ' + this._scls(t.status), dismiss: () => this.dismiss(t.id) }));
    return {
      posList, toasts,
      stackCls: 'tstack ' + posMap[this.state.toastPos],
      toastPromise: () => this.toastPromise(),
      toastSuccess: () => this.toastSuccess(),
      toastError: () => this.toastError(),
      clearToasts: () => this.clearToasts(),
      rootClass: ['ds', accClass, radClass, theme === 'dark' ? 'dark' : ''].filter(Boolean).join(' '),
      toggleTheme: () => this.setState(s => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
      themeLabel: theme === 'dark' ? 'فاتح' : 'داكن',
      cbTermsCls: this.state.cbTerms ? 'cbx on' : 'cbx',
      cbUpdatesCls: this.state.cbUpdates ? 'cbx on' : 'cbx',
      cbTermsOn: this.state.cbTerms,
      cbUpdatesOn: this.state.cbUpdates,
      toggleTerms: () => this.setState(s => ({ cbTerms: !s.cbTerms })),
      toggleUpdates: () => this.setState(s => ({ cbUpdates: !s.cbUpdates })),
      swNotifCls: this.state.swNotif ? 'switch on' : 'switch',
      swNotifOn: this.state.swNotif,
      toggleNotif: () => this.setState(s => ({ swNotif: !s.swNotif })),
      radioPlan: this.state.radioPlan,
      rStarterCls: this.state.radioPlan === 'starter' ? 'radio on' : 'radio',
      rProCls: this.state.radioPlan === 'pro' ? 'radio on' : 'radio',
      rTeamCls: this.state.radioPlan === 'team' ? 'radio on' : 'radio',
      pickStarter: () => this.setState({ radioPlan: 'starter' }),
      pickPro: () => this.setState({ radioPlan: 'pro' }),
      pickTeam: () => this.setState({ radioPlan: 'team' }),
      upCenteredCls: this.state.upVariant === 'centered' ? 'on' : '',
      upRowCls: this.state.upVariant === 'row' ? 'on' : '',
      dzCls: this.state.upVariant === 'row' ? 'dropzone row' : 'dropzone',
      setUpC: () => this.setState({ upVariant: 'centered' }),
      setUpR: () => this.setState({ upVariant: 'row' }),
      upFiles: this.state.files.map(f => {
        const pct = Math.round(f.progress);
        return {
          id: f.id, name: f.name, ext: f.ext, icoCls: 'fileico fico-' + f.kind,
          meta: f.status === 'success' ? f.sizeLabel + ' · مكتمل' : f.status === 'uploading' ? f.sizeLabel + ' · جارٍ الرفع · ' + pct + '%' : (f.error || 'خطأ') + ' — ' + f.sizeLabel,
          metaCls: 'filemeta' + (f.status === 'error' ? ' err' : ''),
          showBar: f.status === 'uploading', progPct: pct + '%',
          showCheck: f.status === 'success', showRetry: f.status === 'error',
          retry: () => this.retryFile(f.id)
        };
      }),
      upCounter: this.state.files.filter(f => f.status === 'success').length + ' من ' + this.state.files.length + ' جاهز',
      resetUpload: () => this.resetUpload(),
      toggleCmd: () => this.toggleCmd(),
      stop: (e) => e.stopPropagation(),
      ...((() => {
        const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
        const y = this.state.calYear, m = this.state.calMonth;
        const calDays = buildMonth(y, m, this.state.calSel, { year: 2026, month: 5, day: 8 }).map((c) => ({
          label: c.label,
          cls: 'cal-day' + (c.muted ? ' muted' : c.selected ? ' sel' : c.today ? ' today' : ''),
          muted: c.muted, day: c.day, selected: !!c.selected, today: !!c.today,
          fn: c.muted ? () => {} : () => this.calSelect(c.day),
        }));
        return { calTitle: months[m] + ' ' + y, calMonthLabel: months[m], calDays, calPrev: () => this.calPrev(), calNext: () => this.calNext() };
      })()),
      navItems: [['colors', 'الألوان'], ['type', 'الطباعة'], ['motion', 'الحركة'], ['icons', 'الأيقونات'], ['states', 'الحالات'], ['buttons', 'الأزرار'], ['inputs', 'الحقول'], ['otp', 'رمز التحقّق'], ['calendar', 'التقويم'], ['cards', 'البطاقات'], ['tables', 'الجداول'], ['badges', 'الشارات'], ['numanim', 'الأرقام'], ['alerts', 'التنبيهات'], ['modal', 'النوافذ'], ['tabs', 'التبويبات'], ['swipe', 'السحب'], ['patterns', 'الأنماط'], ['darkmode', 'الوضع الداكن']].map(([id, label]) => ({ id, label, href: '#' + id, cls: this.state.activeSection === id ? 'nvi on' : 'nvi' })),
      ...this._tableVals(),
      ...this._cmdVals(),
      ...this._dashVals(),
      exportText: this._exportText(this.state.exportFmt),
      exportTwCls: this.state.exportFmt === 'tailwind' ? 'expfmt on' : 'expfmt',
      exportCssCls: this.state.exportFmt === 'css' ? 'expfmt on' : 'expfmt',
      exportJsonCls: this.state.exportFmt === 'json' ? 'expfmt on' : 'expfmt',
      setExpTw: () => this.setState({ exportFmt: 'tailwind' }),
      setExpCss: () => this.setState({ exportFmt: 'css' }),
      setExpJson: () => this.setState({ exportFmt: 'json' }),
      copyExport: () => this.copyExport(),
      swRows: this.state.swItems.map(it => ({
        title: it.title, desc: it.desc, meta: it.meta, ref: this._getSwRef(it.id),
        rowCls: 'swrow' + (this.state.swOpen === it.id ? ' open-' + this.state.swSide : ''),
        down: this.swDown(it.id),
        isFile: it.icon === 'file', isMail: it.icon === 'mail', isUser: it.icon === 'user', isFlag: it.icon === 'flag',
        actDone: () => this._swAction(it.id, 'done'), actPin: () => this._swAction(it.id, 'pin'),
        actLater: () => this._swAction(it.id, 'later'), actTrash: () => this._swAction(it.id, 'trash')
      })),
      swMove: (e) => this.swMove(e),
      swUp: () => this.swUp(),
      swLast: this.state.swLast,
      swCount: this.state.swItems.length + ' مفتوح',
      resetSwipe: () => this.resetSwipe(),
      ...((() => { const bs = [['loading', 'تتم المزامنة'], ['success', 'تمت المزامنة'], ['warning', 'مراجعة'], ['danger', 'فشل']][this.state.badgeIdx % 4]; return { heroCls: 'abadge lg ab-' + bs[0], heroLabel: bs[1], heroLoading: bs[0] === 'loading', heroSuccess: bs[0] === 'success', heroWarning: bs[0] === 'warning', heroDanger: bs[0] === 'danger' }; })()),
      numMrrRef: this._numRefs.mrr,
      numUsersRef: this._numRefs.users,
      numConvRef: this._numRefs.conv,
      replayNums: () => this._runNums(),
      ripple: (e) => this.ripple(e),
      okBtnCls: 'btn primary' + (this.state.btnOk === 'success' ? ' is-ok' : '') + (this.state.btnOk === 'loading' ? ' is-load' : ''),
      okLabel: this.state.btnOk === 'loading' ? 'جارٍ الحفظ' : this.state.btnOk === 'success' ? 'تم الحفظ' : 'حفظ التغييرات',
      okSpin: this.state.btnOk === 'loading',
      okCheck: this.state.btnOk === 'success',
      okArrow: this.state.btnOk === 'idle',
      runOk: () => this.runStateful('ok'),
      errBtnCls: 'btn secondary' + (this.state.btnErr === 'error' ? ' is-err' : '') + (this.state.btnErr === 'loading' ? ' is-load' : ''),
      errLabel: this.state.btnErr === 'loading' ? 'جارٍ الإرسال' : this.state.btnErr === 'error' ? 'فشل' : 'إرسال',
      errSpin: this.state.btnErr === 'loading',
      errX: this.state.btnErr === 'error',
      runErr: () => this.runStateful('err')
    };
  }

  render() {
    const V = Object.assign({}, this.props, this.renderVals());
    const { closeCmd, cmdQuery, cmdResults, cmdScrimCls, navItems, onCmdInput, rootClass, stop, themeLabel, toggleCmd, toggleTheme } = V;
    return (

<div className={rootClass} dir="rtl" lang="ar">
<TopBar themeLabel={themeLabel} toggleCmd={toggleCmd} toggleTheme={toggleTheme} />
<SideRail navItems={navItems} />
<div className="page">

<Hero />


<Colors v={V} />

<Typography v={V} />

<Spacing v={V} />

<div className="grid cols2 section" style={css('align-items:start')}>
<Radius v={V} />
<Shadow v={V} />
</div>

<Motion v={V} />

<Elevation v={V} />

<Icons v={V} />

<States v={V} />

<ButtonsSection v={V} />

<InputsSection />

<OtpSection />

<ControlsSection v={V} />

<SelectSection />

<ComboboxSection />

<SearchSliderSection />

<CalendarSection v={V} />

<UploadSection v={V} />

<CardsSection v={V} />

<TablesSection v={V} />

<BadgesSection v={V} />

<NumAnimSection v={V} />

<AvatarsSection v={V} />

<KpiSection v={V} />

<AlertsSection v={V} />

<BannerSection v={V} />

<FeedbackSection v={V} />

<ModalSection />

<DrawerSection />

<LoadingSection v={V} />

<EmptySection v={V} />

<TabsSection />

<NavSection />

<StepperSection v={V} />

<AccordionSection />

<SwipeSection v={V} />

<PatternsSection v={V} />

<DarkModeSection v={V} />

<ResponsiveSection v={V} />

<GuidelinesSection v={V} />

<CommandPalette closeCmd={closeCmd} cmdQuery={cmdQuery} cmdResults={cmdResults} cmdScrimCls={cmdScrimCls} onCmdInput={onCmdInput} stop={stop} />

</div>
</div>

    );
  }
}

export default App;
