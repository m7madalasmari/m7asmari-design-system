import React from 'react';
import Select from '../organisms/Select.jsx';
import { DIAL_OPTIONS } from '../../app/lib/countries.js';

/**
 * PhoneInput — حقل جوال RTL موحّد على أصناف M7: مفتاح الدولة (Select bare) *داخل* الحقل
 * يفصله خطّ عن حقل الرقم (جزيرة LTR). يعمل داخل Field (يستقبل id/status/aria للرقم).
 *   dial/onDial → مفتاح الدولة · value/onChange → الرقم · status/disabled مثل بقية الحقول.
 * <PhoneInput dial="+966" onDial={setDial} value={num} onChange={e=>setNum(e.target.value)} status="error" />
 */
export default function PhoneInput({
  dial = '+966',
  onDial,
  value = '',
  onChange,
  status = '',
  disabled = false,
  id,
  className = '',
  ...rest
}) {
  const cls = ('fk-phone'
    + (status === 'error' ? ' is-error' : '')
    + (status === 'success' ? ' is-success' : '')
    + (disabled ? ' is-disabled' : '')
    + (className ? ' ' + className : ''));
  return (
    <div className={cls} dir="ltr">
      <div className="fk-phone-dial">
        <Select bare options={DIAL_OPTIONS} value={dial} onChange={onDial} ariaLabel="مفتاح الدولة" />
      </div>
      <input
        type="tel"
        dir="ltr"
        inputMode="tel"
        className="fk-phone-num"
        value={value}
        onChange={onChange}
        id={id}
        disabled={disabled}
        {...(status === 'error' ? { 'aria-invalid': true } : {})}
        {...rest}
      />
    </div>
  );
}
