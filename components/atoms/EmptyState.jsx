import React from 'react';
export default function EmptyState({ variant = '', className = '', children, ...rest }) {
  return (<div className={('empty ' + variant + ' ' + className).trim()} {...rest}>{children}</div>);
}
