import React from 'react';
import { css } from '../../app/lib/css.js';
import SectionHeader from '../../docs/SectionHeader.jsx';
import ShowcasePanel from '../../docs/ShowcasePanel.jsx';
import TypeSpecimen from '../../docs/TypeSpecimen.jsx';

export default function Typography({ v }) {
  return (
<section className="section" id="type" data-screen-label="Typography">
<SectionHeader kicker={"01 — الأسس"} title={"الطباعة"} desc={"خط ثمانية Serif للعناوين، وثمانية Sans للنصوص والواجهة، وJetBrains Mono للأرقام والبيانات."} />
<ShowcasePanel>
<TypeSpecimen cls={"t-display"} sample={"محمد الاسمري"} spec={"عرض · 54 / 800"} />
<TypeSpecimen cls={"t-h1"} sample={"نظامك المفضّل"} spec={"عنوان 1 · 40 / 800"} />
<TypeSpecimen cls={"t-h2"} sample={"أرسل، استقبل، بادل"} spec={"عنوان 2 · 30 / 700"} />
<TypeSpecimen cls={"t-h3"} sample={"تفاصيل تهمّك"} spec={"عنوان 3 · 22 / 700"} />
<TypeSpecimen cls={"t-lg"} sample={"استكشف إيثيريوم بطريقة جديدة كليًا."} spec={"نص كبير · 18 / 500"} />
<TypeSpecimen cls={"t-body"} sample={"التعامل مع العملات الرقمية لم يكن بهذه البساطة — إعدادات افتراضية أنيقة ومسافات سخيّة."} spec={"نص · 16 / 400"} />
<TypeSpecimen cls={"t-sm"} sample={"نص ثانوي مساند ونصوص توضيحية."} spec={"صغير · 14 / 500"} />
<div className="typerow" style={css('border:none')}><span className="t-cap">BACKED UP · 2.4 ETH · 0x71C…9aF</span><span className="typespec">Mono · 12 / 500</span></div>
</ShowcasePanel>
</section>
  );
}
