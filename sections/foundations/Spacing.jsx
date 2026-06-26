import React from 'react';
import SectionHeader from '../../docs/SectionHeader.jsx';
import ShowcasePanel from '../../docs/ShowcasePanel.jsx';
import TokenTable from '../../docs/TokenTable.jsx';

export default function Spacing({ v }) {
  return (
<section className="section" id="spacing" data-screen-label="Spacing">
<SectionHeader kicker={"01 — الأسس"} title={"المسافات"} desc={"مقياس أساسه 4 بكسل. التخطيطات تتنفّس — صفحة المصدر تعتمد على مساحات بيضاء كبيرة وواثقة."} />
<ShowcasePanel>
<TokenTable copy={"4px"} label={"space-1 · 4"} bar={"width:4px"} />
<TokenTable copy={"8px"} label={"space-2 · 8"} bar={"width:8px"} />
<TokenTable copy={"12px"} label={"space-3 · 12"} bar={"width:12px"} />
<TokenTable copy={"16px"} label={"space-4 · 16"} bar={"width:16px"} />
<TokenTable copy={"24px"} label={"space-6 · 24"} bar={"width:24px"} />
<TokenTable copy={"32px"} label={"space-8 · 32"} bar={"width:32px"} />
<TokenTable copy={"48px"} label={"space-12 · 48"} bar={"width:48px"} />
<TokenTable copy={"64px"} label={"space-16 · 64"} bar={"width:64px"} />
</ShowcasePanel>
</section>
  );
}
