import React from 'react';
export default function Badge({ variant = '', className = '', children, ...rest }) {
  return (<span className={('badge ' + variant + ' ' + className).trim()} {...rest}>{children}</span>);
}
