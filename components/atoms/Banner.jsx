import React from 'react';
export default function Banner({ variant = '', className = '', children, ...rest }) {
  return (<div className={('banner ' + variant + ' ' + className).trim()} {...rest}>{children}</div>);
}
