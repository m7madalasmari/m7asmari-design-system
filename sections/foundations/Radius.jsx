import React from 'react';
import { css } from '../../app/lib/css.js';
import SectionHeader from '../../docs/SectionHeader.jsx';

export default function Radius({ v }) {
  return (
<section id="radius" data-screen-label="Radius">
<SectionHeader kicker={"01 — الأسس"} title={"الزوايا"} desc={""} />
<div className="grid cols4">
<div className="radbox" data-copy="10px"><div className="radshape" style={css('border-radius:10px')}></div><span className="radlabel">sm · 10</span></div>
<div className="radbox" data-copy="14px"><div className="radshape" style={css('border-radius:14px')}></div><span className="radlabel">md · 14</span></div>
<div className="radbox" data-copy="20px"><div className="radshape" style={css('border-radius:20px')}></div><span className="radlabel">lg · 20</span></div>
<div className="radbox" data-copy="999px"><div className="radshape" style={css('border-radius:999px')}></div><span className="radlabel">full</span></div>
</div>
</section>
  );
}
