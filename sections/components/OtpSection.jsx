import React from 'react';
import { css } from '../../app/lib/css.js';
import Button from '../../components/Button.jsx';
import SectionHeader from '../../docs/SectionHeader.jsx';
import ShowcasePanel from '../../docs/ShowcasePanel.jsx';

export default function OtpSection({ v }) {
  const { otpBoxes, otpMsg, otpMsgCls, otpPaste, otpWrapCls, resetOtp } = v;
  return (
<section className="section" id="otp" data-screen-label="OTP input">
<SectionHeader kicker={"02 — المكوّنات"} title={"رمز التحقّق"} desc={"ستّ خانات بتقدّم تلقائي ودعم اللصق و Backspace. الرمز الصحيح 123456 — يتحقّق فور اكتمال الإدخال."} />
<ShowcasePanel><div className="field" style={css('gap:14px')}><label className="label">رمز التحقّق</label><div className={otpWrapCls} onPaste={otpPaste}>{(otpBoxes || []).map((b, $index) => (<React.Fragment key={$index}><input className="otpbox" inputMode="numeric" autoComplete="one-time-code" value={b.d} ref={b.ref} onChange={b.onInput} onKeyDown={b.onKey} /></React.Fragment>))}</div><div className="fx ac jb"><span className={otpMsgCls}>{otpMsg}</span><Button variant="ghost sm" onClick={resetOtp}>مسح</Button></div></div></ShowcasePanel>
</section>
  );
}
