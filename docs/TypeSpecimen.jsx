import React from 'react';
export default function TypeSpecimen({ cls, sample, spec }) {
  return (<div className="typerow"><span className={cls}>{sample}</span><span className="typespec">{spec}</span></div>);
}
