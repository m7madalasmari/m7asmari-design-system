import React from 'react';
import { css } from '../../app/lib/css.js';
import Avatar from '../../components/atoms/Avatar.jsx';
import SectionHeader from '../../docs/SectionHeader.jsx';
import ShowcasePanel from '../../docs/ShowcasePanel.jsx';

export default function AvatarsSection({ v }) {
  return (
<section className="section" id="avatars" data-screen-label="Avatars">
<SectionHeader kicker={"02 — المكوّنات"} title={"الصور الرمزية"} desc={"ثلاثة أحجام، ومؤشّر حالة، ومجموعة متراكبة."} />
<ShowcasePanel><div className="grid cols3" style={css('align-items:center')}>
<div><p className="subhead">الأحجام</p><div className="fx ac gap16"><Avatar variant="sm"><img src="assets/avatar.jpg" alt="" /></Avatar><Avatar variant=""><img src="assets/avatar.jpg" alt="" /></Avatar><Avatar variant="lg"><img src="assets/avatar.jpg" alt="" /></Avatar></div></div>
<div><p className="subhead">مع حالة</p><div className="fx ac gap16"><Avatar variant="lg"><img src="assets/avatar.jpg" alt="" /><span className="stat"></span></Avatar><Avatar variant="lg" style={css('background:#fb3d18')}>د<span className="stat" style={css('background:var(--text-muted)')}></span></Avatar></div></div>
<div><p className="subhead">مجموعة</p><div className="avgroup"><Avatar variant="" title="محمد الحسمري"><img src="assets/avatar.jpg" alt="" /></Avatar><Avatar variant="" style={css('background:#16bd74;color:#042c1c')} title="بدر">ب</Avatar><Avatar variant="" style={css('background:#f5a623;color:#3f2305')} title="منى">م</Avatar><Avatar variant="avmore" title="5 آخرون">5+</Avatar></div></div>
</div></ShowcasePanel>
</section>
  );
}
