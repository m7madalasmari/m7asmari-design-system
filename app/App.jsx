import React from 'react';
import { css } from './lib/css.js';
import TopBar from './chrome/TopBar.jsx';
import SideRail from './chrome/SideRail.jsx';
import Hero from './chrome/Hero.jsx';
import CommandPalette from './chrome/CommandPalette.jsx';
import CodeBlock from '../docs/CodeBlock.jsx';
import ColorScale from '../docs/ColorScale.jsx';
import ColorSwatch from '../docs/ColorSwatch.jsx';
import SectionHeader from '../docs/SectionHeader.jsx';
import ShowcasePanel from '../docs/ShowcasePanel.jsx';
import TokenTable from '../docs/TokenTable.jsx';
import TypeSpecimen from '../docs/TypeSpecimen.jsx';
import Alert from '../components/Alert.jsx';
import Avatar from '../components/Avatar.jsx';
import Badge from '../components/Badge.jsx';
import Banner from '../components/Banner.jsx';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import EmptyState from '../components/EmptyState.jsx';
import StatCard from '../components/StatCard.jsx';
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
  state = { tab: 0, theme: this.props.theme ?? 'light', cbTerms: true, cbUpdates: false, swNotif: true, radioPlan: 'pro', sheetOpen: false, drawerOpen: false, drawerSide: 'right', accOpen: 'calendar', upVariant: 'centered', toasts: [], toastPos: 'bottom-right', tabPill: 'overview', tabSeg: 'day', tabUnder: 'all', btnOk: 'idle', btnErr: 'idle', badgeIdx: 0, otp: ['', '', '', '', '', ''], otpStatus: 'idle', ensVal: '', ensStatus: 'idle', amtVal: '', amtStatus: 'idle', files: [], swItems: [], swOpen: null, swSide: null, swLast: 'جاهز', modalOpen: false, sliderVal: 65, calMonth: 5, calYear: 2026, calSel: 14, pageActive: 1, tags: ['تصميم', 'واجهات', 'عربي'], sortKey: null, sortDir: 1, activeSection: 'colors', cmdOpen: false, cmdQuery: '', dashSec: { pinned: true, folders: true, recent: true, tags: true }, dashCat: 'all', dashNotif: false, dashPinned: ['العمل'], exportFmt: 'tailwind' };
  _filesInit = false;
  _sliderRef = React.createRef();
  _tid = 0;
  _tos = {};
  _undBtns = {};
  _undInd = React.createRef();
  _numRefs = { mrr: React.createRef(), users: React.createRef(), conv: React.createRef() };
  _otpRefs = [0, 1, 2, 3, 4, 5].map(() => React.createRef());
  _otpSetChar(i, ch) {
    const otp = [...this.state.otp]; otp[i] = ch;
    this.setState({ otp, otpStatus: 'idle' });
    if (otp.every(d => d !== '')) setTimeout(() => this.setState({ otpStatus: otp.join('') === '123456' ? 'success' : 'error' }), 20);
  }
  onOtpInput(i) { return (e) => {
    const v = (e.target.value || '').replace(/\D/g, '');
    if (!v) { this._otpSetChar(i, ''); return; }
    this._otpSetChar(i, v[v.length - 1]);
    if (i < 5) { const n = this._otpRefs[i + 1].current; if (n) n.focus(); }
  }; }
  onOtpKey(i) { return (e) => {
    if (e.key === 'Backspace' && !this.state.otp[i] && i > 0) { const p = this._otpRefs[i - 1].current; if (p) p.focus(); this._otpSetChar(i - 1, ''); }
  }; }
  onOtpPaste(e) {
    e.preventDefault();
    const t = ((e.clipboardData || window.clipboardData).getData('text') || '').replace(/\D/g, '').slice(0, 6);
    if (!t) return;
    const otp = ['', '', '', '', '', ''];
    for (let k = 0; k < t.length; k++) otp[k] = t[k];
    this.setState({ otp, otpStatus: 'idle' });
    const idx = Math.min(t.length, 5); const el = this._otpRefs[idx].current; if (el) el.focus();
    if (t.length === 6) setTimeout(() => this.setState({ otpStatus: t === '123456' ? 'success' : 'error' }), 20);
  }
  resetOtp() { this.setState({ otp: ['', '', '', '', '', ''], otpStatus: 'idle' }); const el = this._otpRefs[0].current; if (el) el.focus(); }
  onEns(e) {
    const v = e.target.value; let st = 'idle';
    if (v) { const taken = ['admin', 'satoshi', 'vitalik', 'm7asmari']; if (v.length < 3) st = 'short'; else if (taken.includes(v.toLowerCase())) st = 'taken'; else st = 'ok'; }
    this.setState({ ensVal: v, ensStatus: st });
  }
  onAmt(e) {
    const v = e.target.value; let st = 'idle';
    if (v !== '') { const n = parseFloat(v); if (isNaN(n) || n <= 0) st = 'bad'; else if (n > 2.4) st = 'over'; else st = 'ok'; }
    this.setState({ amtVal: v, amtStatus: st });
  }
  _numFmt = {
    mrr: (n) => '$' + Math.round(n).toLocaleString('en-US'),
    users: (n) => Math.round(n).toLocaleString('en-US'),
    conv: (n) => n.toFixed(1) + '%'
  };
  _runNums() {
    clearInterval(this._numRAF);
    const targets = { mrr: 129480, users: 8420, conv: 3.8 };
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
  _posUnder() {
    const el = this._undBtns[this.state.tabUnder], ind = this._undInd.current;
    if (el && ind) { ind.style.width = el.offsetWidth + 'px'; ind.style.left = el.offsetLeft + 'px'; }
  }
  setUndRef = (id) => (el) => { if (el) this._undBtns[id] = el; };
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
  openModal() { this.setState({ modalOpen: true }); }
  closeModal() { this.setState({ modalOpen: false }); }
  sliderDown(e) { this._sliding = true; this.sliderMove(e); if (e.currentTarget.setPointerCapture && e.pointerId != null) { try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {} } }
  sliderMove(e) {
    if (!this._sliding) return;
    const t = this._sliderRef && this._sliderRef.current; if (!t) return;
    const r = t.getBoundingClientRect();
    let pct = Math.round((r.right - e.clientX) / r.width * 100);
    pct = Math.max(0, Math.min(100, pct));
    this.setState({ sliderVal: pct });
  }
  sliderUp() { this._sliding = false; }
  calPrev() { this.setState(s => { let m = s.calMonth - 1, y = s.calYear; if (m < 0) { m = 11; y--; } return { calMonth: m, calYear: y }; }); }
  calNext() { this.setState(s => { let m = s.calMonth + 1, y = s.calYear; if (m > 11) { m = 0; y++; } return { calMonth: m, calYear: y }; }); }
  calSelect(d) { this.setState({ calSel: d }); }
  setPage(p) { if (p >= 1 && p <= 5) this.setState({ pageActive: p }); }
  addTag(e) { if (e.key === 'Enter') { e.preventDefault(); const v = e.target.value.trim(); if (v) { this.setState(s => ({ tags: [...s.tags, v] })); e.target.value = ''; } } }
  removeTag(i) { this.setState(s => ({ tags: s.tags.filter((_, k) => k !== i) })); }
  setSort(key) { this.setState(s => ({ sortKey: key, sortDir: s.sortKey === key ? -s.sortDir : 1 })); }
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
  cmdGo(id) { this.setState({ cmdOpen: false }); const el = document.getElementById(id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' }); }
  _tableVals() {
    const rows = [
      { name: 'إيثيريوم', av: 'E', avc: '#627eea', bal: '2.40 ETH', balN: 2.40, price: '$3,180', priceN: 3180, chg: '+4.2%', chgN: 4.2, chgCls: 'badge green numjoin', status: 'مكتمل', statusCls: 'badge green' },
      { name: 'USDC', av: 'U', avc: '#16bd74', bal: '820.00', balN: 820, price: '$1.00', priceN: 1, chg: '0.0%', chgN: 0, chgCls: 'badge neutral numjoin', status: 'قيد الانتظار', statusCls: 'badge gold' },
      { name: 'أربيتروم', av: 'A', avc: '#f5a623', bal: '145.5 ARB', balN: 145.5, price: '$0.92', priceN: 0.92, chg: '−3.1%', chgN: -3.1, chgCls: 'badge red numjoin', status: 'فشل', statusCls: 'badge red' },
      { name: 'أوبتيميزم', av: 'O', avc: '#fb3d18', bal: '60.00 OP', balN: 60, price: '$2.14', priceN: 2.14, chg: '+1.8%', chgN: 1.8, chgCls: 'badge green numjoin', status: 'مُرسَل', statusCls: 'badge brand' }
    ];
    const k = this.state.sortKey;
    if (k) { const d = this.state.sortDir; rows.sort((a, b) => { const av = a[k], bv = b[k]; return (typeof av === 'number' ? av - bv : String(av).localeCompare(bv, 'ar')) * d; }); }
    const arrow = (key) => this.state.sortKey === key ? (this.state.sortDir > 0 ? ' ↑' : ' ↓') : '';
    return {
      tblRows: rows,
      thName: 'الأصل' + arrow('name'), thBal: 'الرصيد' + arrow('balN'), thPrice: 'السعر' + arrow('priceN'), thChg: '24س' + arrow('chgN'),
      sortName: () => this.setSort('name'), sortBal: () => this.setSort('balN'), sortPrice: () => this.setSort('priceN'), sortChg: () => this.setSort('chgN')
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
    this._esc = (e) => { if (e.key === 'Escape') this.setState({ drawerOpen: false, sheetOpen: false, modalOpen: false, cmdOpen: false }); if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); this.toggleCmd(); } };
    window.addEventListener('keydown', this._esc);
    this._copyClick = (e) => { const c = e.target.closest && e.target.closest('[data-copy]'); if (c) { this.copyToken(c.getAttribute('data-copy')); return; } const a = e.target.closest && e.target.closest('[data-action]'); if (a) this._add({ status: a.getAttribute('data-tone') || 'info', title: a.getAttribute('data-action') }); };
    document.addEventListener('click', this._copyClick);
    if (window.IntersectionObserver) {
      this._spy = new IntersectionObserver((ents) => {
        ents.forEach(en => { if (en.isIntersecting && en.target.id) this.setState({ activeSection: en.target.id }); });
      }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 });
      document.querySelectorAll('.section[id]').forEach(s => this._spy.observe(s));
    }
    this._renderIcons();
    this._posUnder();
    this._watchNums();
    this.setState({ files: this._initialFiles(), swItems: this._swInit() });
    setTimeout(() => this._startUpload('release'), 300);
    this._badgeTimer = setInterval(() => this.setState(s => ({ badgeIdx: (s.badgeIdx + 1) % 4 })), 1600);
    window.addEventListener('resize', this._rz = () => this._posUnder());
  }
  componentDidUpdate() {
    this._renderIcons(); this._posUnder();
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
  componentWillUnmount() { window.removeEventListener('keydown', this._esc); clearTimeout(this._lt); clearInterval(this._numRAF); if (this._numIO) this._numIO.disconnect(); Object.keys(this._upTimers).forEach(id => this._stopUpload(id)); clearInterval(this._badgeTimer); document.removeEventListener('click', this._copyClick); if (this._spy) this._spy.disconnect(); }
  _scls(s){ return s === 'loading' ? 'load' : s === 'success' ? 'ok' : s === 'error' ? 'err' : 'info'; }
  _add(input){ const id = ++this._tid; this.setState(s => ({ toasts: [...s.toasts, { id, ...input }].slice(-5) })); const dur = input.duration === undefined ? 3600 : input.duration; if (dur > 0) this._tos[id] = setTimeout(() => this.dismiss(id), dur); return id; }
  dismiss(id){ clearTimeout(this._tos[id]); delete this._tos[id]; this.setState(s => ({ toasts: s.toasts.filter(t => t.id !== id) })); }
  toastPromise(){ const id = this._add({ status: 'loading', title: 'جارٍ نشر المكوّن', description: 'حزم المصدر والمعاينة وبيانات السجل.', duration: 0 }); setTimeout(() => { this.setState(s => ({ toasts: s.toasts.map(t => t.id === id ? { ...t, status: 'success', title: 'اكتمل النشر', description: 'تم تحديث الإشعار في مكانه من تحميل إلى نجاح.' } : t) })); this._tos[id] = setTimeout(() => this.dismiss(id), 3200); }, 1800); }
  toastSuccess(){ this._add({ status: 'success', title: 'تم نشر المكوّن', description: 'نقطة السجل والمصدر الخام متاحان الآن.' }); }
  toastError(){ this._add({ status: 'error', title: 'فشل الالتقاط', description: 'أعد المحاولة بعد استقرار المتصفّح.' }); }
  clearToasts(){ Object.values(this._tos).forEach(clearTimeout); this._tos = {}; this.setState({ toasts: [] }); }
  moveStack(pos, label){ this.setState({ toastPos: pos }); this._add({ status: 'info', title: 'تغيّر الموضع', description: 'الإشعارات الجديدة تفتح من ' + label + '.' }); }
  _tabVals() {
    const idx = (arr, v) => arr.indexOf(v);
    const pillItems = [['overview', 'نظرة عامة'], ['activity', 'النشاط'], ['settings', 'الإعدادات']];
    const segItems = [['day', 'يوم'], ['week', 'أسبوع'], ['month', 'شهر']];
    const undItems = [['all', 'الكل'], ['open', 'مفتوحة'], ['closed', 'مغلقة']];
    const pillText = { overview: 'ملخّص عام لأهم المؤشّرات والأرصدة في لمحة واحدة.', activity: 'أحدث الأحداث والمعاملات على محفظتك مرتّبة زمنيًا.', settings: 'التفضيلات وخيارات الأمان والشبكة الافتراضية.' };
    const pi = idx(pillItems.map(x => x[0]), this.state.tabPill);
    const si = idx(segItems.map(x => x[0]), this.state.tabSeg);
    return {
      pillTabs: pillItems.map(([v, label]) => ({ v, label, cls: this.state.tabPill === v ? 'ttab on' : 'ttab', fn: () => this.setState({ tabPill: v }) })),
      segTabs: segItems.map(([v, label]) => ({ v, label, cls: this.state.tabSeg === v ? 'ttab on' : 'ttab', fn: () => this.setState({ tabSeg: v }) })),
      undTabs: undItems.map(([v, label]) => ({ v, label, cls: this.state.tabUnder === v ? 'ttab on' : 'ttab', fn: () => this.setState({ tabUnder: v }), ref: this.setUndRef(v) })),
      pillIndStyle: { transform: 'translateX(' + (pi * -100) + '%)' },
      segIndStyle: { transform: 'translateX(' + (si * -100) + '%)' },
      undIndRef: this._undInd,
      pillText: pillText[this.state.tabPill]
    };
  }
  renderVals() {
    const acc = this.props.accent ?? 'blue';
    const corners = this.props.corners ?? 'rounded';
    const accClass = acc === 'blue' ? '' : 'acc-' + acc;
    const radClass = corners === 'rounded' ? '' : 'sharp';
    const theme = this.state.theme;
    const accIds = ['brief', 'launch', 'campaign', 'calendar', 'ship', 'archive'];
    const accCls = {}, accH = {};
    accIds.forEach(id => {
      accCls[id] = this.state.accOpen === id ? 'acc-item open' : 'acc-item';
      accH[id] = () => this.setState(s => ({ accOpen: s.accOpen === id ? null : id }));
    });
    const posDefs = [['top-left','أعلى يسار','tl'],['top-center','أعلى وسط','tc'],['top-right','أعلى يمين','tr'],['bottom-left','أسفل يسار','bl'],['bottom-center','أسفل وسط','bc'],['bottom-right','أسفل يمين','br']];
    const posMap = {};
    posDefs.forEach(([id, , k]) => { posMap[id] = k; });
    const posList = posDefs.map(([id, label]) => ({ id, label, cls: this.state.toastPos === id ? 'posbtn on' : 'posbtn', fn: () => this.moveStack(id, label) }));
    const toasts = this.state.toasts.slice(-4).map(t => ({ id: t.id, title: t.title, desc: t.description, cls: 'toast2 ' + this._scls(t.status), dismiss: () => this.dismiss(t.id) }));
    return {
      accCls, accH, posList, toasts,
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
      toggleTerms: () => this.setState(s => ({ cbTerms: !s.cbTerms })),
      toggleUpdates: () => this.setState(s => ({ cbUpdates: !s.cbUpdates })),
      swNotifCls: this.state.swNotif ? 'switch on' : 'switch',
      toggleNotif: () => this.setState(s => ({ swNotif: !s.swNotif })),
      rStarterCls: this.state.radioPlan === 'starter' ? 'radio on' : 'radio',
      rProCls: this.state.radioPlan === 'pro' ? 'radio on' : 'radio',
      rTeamCls: this.state.radioPlan === 'team' ? 'radio on' : 'radio',
      pickStarter: () => this.setState({ radioPlan: 'starter' }),
      pickPro: () => this.setState({ radioPlan: 'pro' }),
      pickTeam: () => this.setState({ radioPlan: 'team' }),
      scrimCls: this.state.sheetOpen ? 'scrim2 open' : 'scrim2',
      sheetCls: this.state.sheetOpen ? 'sheet2 open' : 'sheet2',
      openSheet: () => this.setState({ sheetOpen: true }),
      closeSheet: () => this.setState({ sheetOpen: false }),
      drawerScrimCls: this.state.drawerOpen ? 'scrim2 open' : 'scrim2',
      drawerCls: 'drawer2 ' + this.state.drawerSide + (this.state.drawerOpen ? ' open' : ''),
      drawerHint: this.state.drawerSide === 'left' ? 'ينزلق من اليسار. اضغط Esc أو انقر خارجه للإغلاق.' : 'ينزلق من اليمين. اضغط Esc أو انقر خارجه للإغلاق.',
      openLeft: () => this.setState({ drawerOpen: true, drawerSide: 'left' }),
      openRight: () => this.setState({ drawerOpen: true, drawerSide: 'right' }),
      closeDrawer: () => this.setState({ drawerOpen: false }),
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
      modalScrimCls: this.state.modalOpen ? 'mscrim open' : 'mscrim',
      modalCls: this.state.modalOpen ? 'mdialog open' : 'mdialog',
      openModal: () => this.openModal(), closeModal: () => this.closeModal(),
      toggleCmd: () => this.toggleCmd(),
      stop: (e) => e.stopPropagation(),
      sliderRef: this._sliderRef,
      sliderVal: this.state.sliderVal,
      sliderFill: { width: this.state.sliderVal + '%' },
      sliderKnob: { right: this.state.sliderVal + '%' },
      sliderPct: this.state.sliderVal + '%',
      sliderDown: (e) => this.sliderDown(e), sliderMove: (e) => this.sliderMove(e), sliderUp: () => this.sliderUp(),
      ...((() => {
        const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
        const y = this.state.calYear, m = this.state.calMonth;
        const first = new Date(y, m, 1).getDay(), dim = new Date(y, m + 1, 0).getDate(), pdim = new Date(y, m, 0).getDate();
        const cells = [];
        for (let i = first - 1; i >= 0; i--) cells.push({ label: pdim - i, cls: 'cal-day muted', fn: () => {} });
        for (let d = 1; d <= dim; d++) {
          const isToday = (y === 2026 && m === 5 && d === 8), isSel = (d === this.state.calSel);
          cells.push({ label: d, cls: 'cal-day' + (isSel ? ' sel' : isToday ? ' today' : ''), fn: () => this.calSelect(d) });
        }
        let t = 1; while (cells.length % 7 !== 0) cells.push({ label: t++, cls: 'cal-day muted', fn: () => {} });
        return { calTitle: months[m] + ' ' + y, calDays: cells, calPrev: () => this.calPrev(), calNext: () => this.calNext() };
      })()),
      pageItems: [1, 2, 3, 4, 5].map(p => ({ n: p, cls: p === this.state.pageActive ? 'btn brand sm' : 'btn ghost sm', fn: () => this.setPage(p) })),
      pagePrev: () => this.setPage(this.state.pageActive - 1), pageNext: () => this.setPage(this.state.pageActive + 1),
      tagList: this.state.tags.map((t, i) => ({ label: t, remove: () => this.removeTag(i) })),
      addTag: (e) => this.addTag(e),
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
      otpBoxes: this.state.otp.map((d, i) => ({ d, ref: this._otpRefs[i], onInput: this.onOtpInput(i), onKey: this.onOtpKey(i) })),
      otpWrapCls: 'otpwrap' + (this.state.otpStatus === 'success' ? ' ok' : '') + (this.state.otpStatus === 'error' ? ' err' : ''),
      otpPaste: (e) => this.onOtpPaste(e),
      otpMsg: this.state.otpStatus === 'success' ? 'تم التحقّق ✓' : this.state.otpStatus === 'error' ? 'رمز خاطئ، حاول مجددًا.' : 'أدخل 123456 للتحقّق.',
      otpMsgCls: 'hint' + (this.state.otpStatus === 'success' ? ' ok' : '') + (this.state.otpStatus === 'error' ? ' err' : ''),
      resetOtp: () => this.resetOtp(),
      ensVal: this.state.ensVal,
      onEns: (e) => this.onEns(e),
      ensInputCls: 'input' + (this.state.ensStatus === 'ok' ? ' is-success' : (this.state.ensStatus === 'short' || this.state.ensStatus === 'taken') ? ' is-error' : ''),
      ensMsg: this.state.ensStatus === 'ok' ? '✓ الاسم متاح' : this.state.ensStatus === 'short' ? '3 أحرف على الأقل' : this.state.ensStatus === 'taken' ? 'هذا الاسم محجوز بالفعل' : 'متاح إذا كان 3 أحرف فأكثر وغير محجوز.',
      ensMsgCls: 'hint' + (this.state.ensStatus === 'ok' ? ' ok' : (this.state.ensStatus === 'short' || this.state.ensStatus === 'taken') ? ' err' : ''),
      amtVal: this.state.amtVal,
      onAmt: (e) => this.onAmt(e),
      amtInputCls: 'input' + (this.state.amtStatus === 'ok' ? ' is-success' : (this.state.amtStatus === 'bad' || this.state.amtStatus === 'over') ? ' is-error' : ''),
      amtMsg: this.state.amtStatus === 'ok' ? '✓ المبلغ متاح للإرسال' : this.state.amtStatus === 'over' ? 'الرصيد غير كافٍ (2.4 ETH)' : this.state.amtStatus === 'bad' ? 'أدخل مبلغًا صحيحًا' : 'الرصيد: 2.4 ETH',
      amtMsgCls: 'hint' + (this.state.amtStatus === 'ok' ? ' ok' : (this.state.amtStatus === 'bad' || this.state.amtStatus === 'over') ? ' err' : ''),
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
      runErr: () => this.runStateful('err'),
      ...this._tabVals()
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

<InputsSection v={V} />

<OtpSection v={V} />

<ControlsSection v={V} />

<SelectSection v={V} />

<ComboboxSection v={V} />

<SearchSliderSection v={V} />

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

<ModalSection v={V} />

<DrawerSection v={V} />

<LoadingSection v={V} />

<EmptySection v={V} />

<TabsSection v={V} />

<NavSection v={V} />

<StepperSection v={V} />

<AccordionSection v={V} />

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
