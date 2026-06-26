import React from 'react';
import { css } from '../app/lib/css.js';
export default function TokenTable({ copy, label, bar }) {
  return (<div className="sparow" data-copy={copy}><span className="spalabel">{label}</span><span className="spabar" style={css(bar)}></span></div>);
}
