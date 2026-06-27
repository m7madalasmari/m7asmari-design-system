import React from 'react';
export default function Card({ variant = '', className = '', children, ...rest }) {
  return (<div className={(variant + ' ' + className).trim()} {...rest}>{children}</div>);
}
