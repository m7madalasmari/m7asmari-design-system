import React from 'react';
import { css } from '../../app/lib/css.js';
import SectionHeader from '../../docs/SectionHeader.jsx';

export default function TablesSection({ v }) {
  const { sortBal, sortChg, sortName, sortPrice, tblRows, thBal, thChg, thName, thPrice } = v;
  return (
<section className="section" id="tables" data-screen-label="Tables">
<SectionHeader kicker={"02 — المكوّنات"} title={"الجداول"} desc={"حدود هادئة، أرقام أحادية المسافة، وصفوف تتفاعل عند المرور لبيانات سهلة المسح."} />
<div className="tablewrap"><table className="tbl"><thead><tr><th className="sortable" onClick={sortName}>{thName}</th><th className="sortable" style={css('text-align: center')} onClick={sortBal}>{thBal}</th><th className="sortable" style={css('text-align: center')} onClick={sortPrice}>{thPrice}</th><th className="sortable" style={css('text-align: center')} onClick={sortChg}>{thChg}</th><th style={css('text-align: center')}>الحالة</th></tr></thead><tbody>
{(tblRows || []).map((r, $index) => (<React.Fragment key={$index}><tr><td><div className="fx ac gap16"><span className="av" style={css(`background:${r.avc}`)}>{r.av}</span><span className="cellname" style={css('padding-right: 8px')}>{r.name}</span></div></td><td className="tnum" style={css('text-align: center')}>{r.bal}</td><td className="tnum" style={css('text-align: center')}>{r.price}</td><td style={css('text-align: center')}><span className={r.chgCls}>{r.chg}</span></td><td style={css('text-align: center')}><span className={r.statusCls}><span className="dot"></span>{r.status}</span></td></tr></React.Fragment>))}
</tbody></table></div>
</section>
  );
}
