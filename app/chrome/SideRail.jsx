import React from 'react';
import { css } from '../lib/css.js';

export default function SideRail({ navItems }) {
  return (
    <nav className="siderail">{(navItems || []).map((n, $index) => (<React.Fragment key={$index}><a className={n.cls} href={n.href}>{n.label}</a></React.Fragment>))}</nav>
  );
}
