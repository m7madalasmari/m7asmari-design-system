import React from 'react';
export default function Avatar({ variant = '', className = '', children, ...rest }) {
  return (<span className={('avatar ' + variant + ' ' + className).trim()} {...rest}>{children}</span>);
}
