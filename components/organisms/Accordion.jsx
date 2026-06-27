import React from 'react';

/**
 * Accordion — قائمة قابلة للطيّ، عنصر واحد مفتوح في كل مرة.
 *
 * <Accordion items={[{ id, icon, title, body }]} defaultOpen="id" />
 *
 * a11y: ترويسة كل بند زرّ حقيقي (لوحة مفاتيح أصلية) مع aria-expanded + aria-controls،
 * والمحتوى role="region" مرتبط بالترويسة. تنقّل بالأسهم/Home/End بين الترويسات.
 */
export default function Accordion({ items = [], defaultOpen = null, allowToggle = true }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const btnRefs = React.useRef([]);

  const onKeyDown = (e, i) => {
    const last = items.length - 1;
    let next = null;
    if (e.key === 'ArrowDown') next = i === last ? 0 : i + 1;
    else if (e.key === 'ArrowUp') next = i === 0 ? last : i - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next !== null) {
      e.preventDefault();
      const el = btnRefs.current[next];
      if (el) el.focus();
    }
  };

  return (
    <div className="acc">
      {items.map((it, i) => {
        const isOpen = open === it.id;
        return (
          <div className={'acc-item' + (isOpen ? ' open' : '')} key={it.id}>
            <button
              type="button"
              className="acc-head"
              id={'acc-head-' + it.id}
              aria-expanded={isOpen}
              aria-controls={'acc-panel-' + it.id}
              ref={(el) => { btnRefs.current[i] = el; }}
              onClick={() => setOpen((o) => (o === it.id ? (allowToggle ? null : o) : it.id))}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <span className="acc-ico2"><i data-lucide={it.icon}></i></span>
              <span className="acc-title2">{it.title}</span>
              <span className="acc-chev"><i data-lucide="chevron-down"></i></span>
            </button>
            <div
              className="acc-wrap"
              id={'acc-panel-' + it.id}
              role="region"
              aria-labelledby={'acc-head-' + it.id}
            >
              <div className="acc-inner"><div className="acc-body">{it.body}</div></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
