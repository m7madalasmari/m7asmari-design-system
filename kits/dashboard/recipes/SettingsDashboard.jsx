import React from 'react';
import { css } from '../../../app/lib/css.js';
import DashboardLayout from '../../../patterns/DashboardLayout.jsx';
import DashboardCard from '../DashboardCard.jsx';
import Breadcrumb from '../../../components/molecules/Breadcrumb.jsx';
import Tabs from '../../../components/organisms/Tabs.jsx';
import Field from '../../../components/molecules/Field.jsx';
import Input from '../../../components/atoms/Input.jsx';
import Textarea from '../../../components/atoms/Textarea.jsx';
import Switch from '../../../components/atoms/Switch.jsx';
import Select from '../../../components/organisms/Select.jsx';
import RadioGroup from '../../../components/molecules/RadioGroup.jsx';
import Button from '../../../components/atoms/Button.jsx';

/**
 * SettingsDashboard — صفحة إعدادات بتبويبات (يجسر Form Kit مع اللوحة):
 * الملف الشخصي / الإشعارات / الأمان — حقول M7 (Field/Input/Switch/Select/RadioGroup).
 */
export default function SettingsDashboard() {
  const [lang, setLang] = React.useState('ar');
  const [notif, setNotif] = React.useState({ email: true, push: false, weekly: true });
  const [freq, setFreq] = React.useState('daily');
  const [timeout, setTimeoutVal] = React.useState('30');
  const [twofa, setTwofa] = React.useState(true);
  const set = (k) => (v) => setNotif((s) => ({ ...s, [k]: v }));

  const profile = (
    <div className="grid cols2" style={css('align-items:start;gap:20px')}>
      <Field label="الاسم الكامل"><Input defaultValue="محمد الأسمري" /></Field>
      <Field label="البريد الإلكتروني"><Input type="email" dir="ltr" defaultValue="m@company.com" /></Field>
      <Field label="اللغة">
        <Select ariaLabel="اللغة" value={lang} onChange={setLang} options={[{ value: 'ar', label: 'العربية' }, { value: 'en', label: 'الإنجليزية' }]} />
      </Field>
      <Field label="نبذة"><Textarea placeholder="اكتب نبذة قصيرة…" /></Field>
    </div>
  );

  const notifications = (
    <div className="fx col gap16">
      <Switch checked={notif.email} onChange={set('email')}>إشعارات البريد الإلكتروني</Switch>
      <Switch checked={notif.push} onChange={set('push')}>الإشعارات الفورية (Push)</Switch>
      <Switch checked={notif.weekly} onChange={set('weekly')}>الملخّص الأسبوعي</Switch>
      <div className="dashsep" style={css('margin:4px 0')}></div>
      <Field label="تكرار الملخّص">
        <RadioGroup
          ariaLabel="تكرار الملخّص"
          value={freq}
          onChange={setFreq}
          options={[{ value: 'daily', label: 'يومي' }, { value: 'weekly', label: 'أسبوعي' }, { value: 'monthly', label: 'شهري' }]}
        />
      </Field>
    </div>
  );

  const security = (
    <div className="fx col gap16">
      <Switch checked={twofa} onChange={setTwofa}>التحقّق بخطوتين (2FA)</Switch>
      <Field label="انتهاء الجلسة (دقائق)">
        <Select ariaLabel="انتهاء الجلسة" value={timeout} onChange={setTimeoutVal} options={[{ value: '15', label: '15 دقيقة' }, { value: '30', label: '30 دقيقة' }, { value: '60', label: 'ساعة' }]} />
      </Field>
      <div className="btnrow"><Button variant="secondary">تغيير كلمة المرور</Button></div>
    </div>
  );

  const tabs = [
    { id: 'profile', label: 'الملف الشخصي', panel: profile },
    { id: 'notifications', label: 'الإشعارات', panel: notifications },
    { id: 'security', label: 'الأمان', panel: security },
  ];

  return (
    <DashboardLayout
      className="auto"
      header={<Breadcrumb variant="dash" leadingIcon="home" items={['الإعدادات']} />}
    >
      <DashboardCard title="إعدادات الحساب">
        <Tabs variant="und" tabs={tabs} defaultActive="profile" ariaLabel="أقسام الإعدادات" showPanel />
        <div className="btnrow" style={css('margin-top:22px')}>
          <Button variant="brand">حفظ التغييرات</Button>
          <Button variant="ghost">إلغاء</Button>
        </div>
      </DashboardCard>
    </DashboardLayout>
  );
}
