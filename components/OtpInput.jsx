import React from 'react';

/**
 * OtpInput — إدخال رمز تحقّق بعدّة خانات.
 *
 * <OtpInput length={6} status="idle|success|error"
 *           onChange={(code)=>…} onComplete={(code)=>…} label="رمز التحقّق" />
 *
 * يدير داخليًا: التقدّم التلقائي · Backspace للخانة السابقة · اللصق · أرقام فقط.
 * لإعادة التعيين من الخارج، غيّر prop المفتاح key لإعادة التركيب.
 * a11y: مجموعة role="group" + aria-label لكل خانة (الرقم n من length).
 */
export default function OtpInput({ length = 6, status = 'idle', onChange, onComplete, label = 'رمز التحقّق' }) {
  const [digits, setDigits] = React.useState(() => Array(length).fill(''));
  const refs = React.useRef([]);

  const emit = (next) => {
    const code = next.join('');
    if (onChange) onChange(code);
    if (code.length === length && next.every((d) => d !== '') && onComplete) onComplete(code);
  };

  const setChar = (i, ch) => {
    const next = [...digits]; next[i] = ch;
    setDigits(next);
    emit(next);
  };

  const onInput = (i) => (e) => {
    const v = (e.target.value || '').replace(/\D/g, '');
    if (!v) { setChar(i, ''); return; }
    setChar(i, v[v.length - 1]);
    if (i < length - 1) { const n = refs.current[i + 1]; if (n) n.focus(); }
  };

  const onKey = (i) => (e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      const p = refs.current[i - 1]; if (p) p.focus();
      setChar(i - 1, '');
    }
  };

  const onPaste = (e) => {
    e.preventDefault();
    const src = (e.clipboardData || window.clipboardData);
    const t = ((src && src.getData('text')) || '').replace(/\D/g, '').slice(0, length);
    if (!t) return;
    const next = Array(length).fill('');
    for (let k = 0; k < t.length; k++) next[k] = t[k];
    setDigits(next); emit(next);
    const idx = Math.min(t.length, length - 1);
    const el = refs.current[idx]; if (el) el.focus();
  };

  const wrapCls = 'otpwrap' + (status === 'success' ? ' ok' : '') + (status === 'error' ? ' err' : '');

  return (
    <div className={wrapCls} role="group" aria-label={label} onPaste={onPaste}>
      {digits.map((d, i) => (
        <input
          key={i}
          className="otpbox"
          inputMode="numeric"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          aria-label={'الرقم ' + (i + 1) + ' من ' + length}
          maxLength={1}
          value={d}
          ref={(el) => { refs.current[i] = el; }}
          onChange={onInput(i)}
          onKeyDown={onKey(i)}
        />
      ))}
    </div>
  );
}
