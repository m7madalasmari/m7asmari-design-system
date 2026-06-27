import React from 'react';

/**
 * PasswordInput — حقل كلمة مرور على صنف M7 (.input) مع زرّ إظهار/إخفاء (.pwfield/.pwtoggle)
 * ومقياس قوّة اختياري (.pwmeter). meter=true يفعّل المقياس.
 * <PasswordInput value={pw} onChange={e=>setPw(e.target.value)} meter status="error" />
 */
const strength = (v) => {
  let s = 0;
  if (v.length >= 8) s++;
  if (/[A-Z]/.test(v) && /[a-z]/.test(v)) s++;
  if (/\d/.test(v)) s++;
  if (/[^A-Za-z0-9]/.test(v)) s++;
  return Math.min(s, 3);
};
const LABELS = ['—', 'ضعيفة', 'متوسطة', 'قوية'];
const SEGCLS = ['', 'weak', 'medium', 'strong'];

export default function PasswordInput({
  value = '',
  onChange,
  meter = false,
  status = '',
  id,
  className = '',
  ...rest
}) {
  const [show, setShow] = React.useState(false);
  const lvl = meter && value ? Math.max(strength(value), 1) : 0; // 1..3
  const inputCls = ('input'
    + (status === 'error' ? ' is-error' : '')
    + (status === 'success' ? ' is-success' : '')
    + (className ? ' ' + className : ''));
  return (
    <div>
      <div className="pwfield">
        <input
          type={show ? 'text' : 'password'}
          className={inputCls}
          value={value}
          onChange={onChange}
          id={id}
          {...(status === 'error' ? { 'aria-invalid': true } : {})}
          {...rest}
        />
        <button
          type="button"
          className="pwtoggle"
          aria-pressed={show}
          aria-label={show ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
          onClick={() => setShow((x) => !x)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
            <circle cx="12" cy="12" r="3" />
            {show ? <path d="M3 3l18 18" /> : null}
          </svg>
        </button>
      </div>
      {meter && value ? (
        <div className="pwmeter" role="img" aria-label={'قوة كلمة المرور: ' + LABELS[lvl]}>
          {[1, 2, 3].map((n) => (
            <span key={n} className={'pwseg' + (n <= lvl ? ' ' + SEGCLS[lvl] : '')}></span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
