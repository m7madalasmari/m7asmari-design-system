import React from 'react';
import { css } from '../../app/lib/css.js';
import Button from '../../components/Button.jsx';
import OtpInput from '../../components/OtpInput.jsx';
import SectionHeader from '../../docs/SectionHeader.jsx';
import ShowcasePanel from '../../docs/ShowcasePanel.jsx';

export default function OtpSection() {
  const [status, setStatus] = React.useState('idle');
  const [resetKey, setResetKey] = React.useState(0);
  const msg = status === 'success' ? 'تم التحقّق ✓' : status === 'error' ? 'رمز خاطئ، حاول مجددًا.' : 'أدخل 123456 للتحقّق.';
  const msgCls = 'hint' + (status === 'success' ? ' ok' : status === 'error' ? ' err' : '');
  return (
<section className="section" id="otp" data-screen-label="OTP input">
<SectionHeader kicker={"02 — المكوّنات"} title={"رمز التحقّق"} desc={"ستّ خانات بتقدّم تلقائي ودعم اللصق و Backspace. الرمز الصحيح 123456 — يتحقّق فور اكتمال الإدخال."} />
<ShowcasePanel><div className="field" style={css('gap:14px')}><label className="label">رمز التحقّق</label>
<OtpInput
  key={resetKey}
  length={6}
  status={status}
  label="رمز التحقّق"
  onChange={(code) => { if (code.length < 6) setStatus('idle'); }}
  onComplete={(code) => setStatus(code === '123456' ? 'success' : 'error')}
/>
<div className="fx ac jb"><span className={msgCls}>{msg}</span><Button variant="ghost sm" onClick={() => { setStatus('idle'); setResetKey((k) => k + 1); }}>مسح</Button></div></div></ShowcasePanel>
</section>
  );
}
