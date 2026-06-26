import React from 'react';
export default function ColorScale({ name, varLabel, children }) {
  return (<div className="scalerow"><div className="scalehead"><span className="scalename">{name}</span><span className="scalevar">{varLabel}</span></div>{children}</div>);
}
