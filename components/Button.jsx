import React from 'react';
export default function Button({ variant = '', className = '', children, ...rest }) {
  return (<button className={('btn ' + variant + ' ' + className).trim()} {...rest}>{children}</button>);
}
