import React from 'react';
import { css } from '../app/lib/css.js';
export default function ColorSwatch({ copy, chip, name, hex }) {
  return (<div className="swatch" data-copy={copy}><div className="swatch-chip" style={css(chip)}></div><div className="swatch-meta"><div className="swatch-name">{name}</div><div className="swatch-hex">{hex}</div></div></div>);
}
