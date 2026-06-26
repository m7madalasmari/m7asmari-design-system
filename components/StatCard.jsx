import React from 'react';
export default function StatCard({ variant = '', className = '', children, ...rest }) {
  return (<div className={('statcard ' + variant + ' ' + className).trim()} {...rest}>{children}</div>);
}
