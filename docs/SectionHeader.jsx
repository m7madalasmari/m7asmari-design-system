import React from 'react';
export default function SectionHeader({ kicker, title, desc }) {
  return (<div className="sectionhead"><div><span className="kicker">{kicker}</span><h2 className="sectitle">{title}</h2></div>{desc ? <p className="secdesc">{desc}</p> : null}</div>);
}
