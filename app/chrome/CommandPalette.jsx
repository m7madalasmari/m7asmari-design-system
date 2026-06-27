import React from 'react';

export default function CommandPalette({ closeCmd, cmdQuery, cmdResults, cmdScrimCls, onCmdInput, stop }) {
  return (
    <div className={cmdScrimCls} onClick={closeCmd}><div className="cmdbox" onClick={stop}><div className="cmdfield"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"></circle><path d="M21 21l-4.5-4.5"></path></svg><input value={cmdQuery} onChange={onCmdInput} placeholder="ابحث عن مكوّن أو قسم…" /><span className="cmdkbd">Esc</span></div><div className="cmdlist">{(cmdResults || []).map((c, $index) => (<React.Fragment key={$index}><div className="cmditem" onClick={c.go}><span>{c.label}</span><span className="cmdcat">{c.cat}</span></div></React.Fragment>))}</div></div></div>
  );
}
