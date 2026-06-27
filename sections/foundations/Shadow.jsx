import React from 'react';
import { css } from '../../app/lib/css.js';
import SectionHeader from '../../docs/SectionHeader.jsx';

export default function Shadow({ v }) {
  return (
<section id="shadow" data-screen-label="Shadows">
<SectionHeader kicker={"01 — الأسس"} title={"الظلال"} desc={""} />
<div className="grid cols3">
<div className="shadowdemo" data-copy="var(--shadow-sm)" style={css('box-shadow:var(--shadow-sm)')}>sm</div>
<div className="shadowdemo" data-copy="var(--shadow-md)" style={css('box-shadow:var(--shadow-md)')}>md</div>
<div className="shadowdemo" data-copy="var(--shadow-lg)" style={css('box-shadow:var(--shadow-lg)')}>lg</div>
</div>
</section>
  );
}
