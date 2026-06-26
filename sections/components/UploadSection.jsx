import React from 'react';
import { css } from '../../app/lib/css.js';
import SectionHeader from '../../docs/SectionHeader.jsx';

export default function UploadSection({ v }) {
  const { dzCls, resetUpload, setUpC, setUpR, upCenteredCls, upCounter, upFiles, upRowCls } = v;
  return (
<section className="section" id="upload" data-screen-label="Upload">
<SectionHeader kicker={"02 — المكوّنات"} title={"رفع الملفات"} desc={"بطاقة رفع كاملة: منطقة إفلات، وقائمة ملفات بحالات (مكتمل، جارٍ الرفع، خطأ مع إعادة المحاولة)، وتبديل للتخطيط."} />
<div className="upcard"><div className="uphead"><div><div className="filename" style={css('font-size:15px')}>حزمة الرفع</div><div className="filemeta">{upCounter}</div></div><div className="fx ac gap8"><div className="upseg"><button className={upCenteredCls} onClick={setUpC}>مركّز</button><button className={upRowCls} onClick={setUpR}>صف</button></div><button className="upreset" onClick={resetUpload} aria-label="إعادة تعيين"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12a8 8 0 108-8 8 8 0 00-6 2.7M4 4v4h4"></path></svg></button></div></div><div className={dzCls}><div className="dz-ico">↑</div><div className="dz-title">أفلِت الملفات للرفع</div><div className="dz-sub">PDF، صور، فيديو أو ملفات مضغوطة</div></div>{(upFiles || []).map((f, $index) => (<React.Fragment key={$index}><div className="fileitem"><span className={f.icoCls}>{f.ext}</span><div className="filemain"><div className="filename">{f.name}</div><div className={f.metaCls}>{f.meta}</div>{(f.showBar) ? (<React.Fragment><div className="fileprog"><span style={css(`width:${f.progPct}`)}></span></div></React.Fragment>) : null}</div>{(f.showCheck) ? (<React.Fragment><span className="filestat ok"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"></path></svg></span></React.Fragment>) : null}{(f.showRetry) ? (<React.Fragment><button className="fileretry" onClick={f.retry}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12a8 8 0 108-8 8 8 0 00-6 2.7M4 4v4h4"></path></svg>إعادة</button></React.Fragment>) : null}</div></React.Fragment>))}</div>
</section>
  );
}
