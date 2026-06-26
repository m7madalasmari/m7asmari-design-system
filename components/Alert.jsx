import React from 'react';
export default function Alert({ variant = '', className = '', children, ...rest }) {
  return (<div className={('alert ' + variant + ' ' + className).trim()} {...rest}>{children}</div>);
}
