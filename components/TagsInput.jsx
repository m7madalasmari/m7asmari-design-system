import React from 'react';

/**
 * TagsInput — حقل وسوم: إضافة بـ Enter، حذف بزرّ ×.
 *
 * <TagsInput defaultTags={['تصميم']} onChange={(tags)=>…}
 *            placeholder="أضف وسماً ثم Enter…" ariaLabel="حقل وسوم" />
 *
 * a11y: role="list"/"listitem" · زرّ حذف بـ aria-label واضح لكل وسم · aria-label للحقل.
 */
export default function TagsInput({ defaultTags = [], onChange, placeholder = 'أضف وسماً ثم Enter…', ariaLabel = 'حقل وسوم' }) {
  const [tags, setTags] = React.useState(defaultTags);

  const update = (next) => { setTags(next); if (onChange) onChange(next); };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const v = e.target.value.trim();
      if (v) { update([...tags, v]); e.target.value = ''; }
    } else if (e.key === 'Backspace' && !e.target.value && tags.length) {
      update(tags.slice(0, -1));
    }
  };

  const remove = (i) => update(tags.filter((_, k) => k !== i));

  return (
    <div className="tagsbox" role="list">
      {tags.map((t, i) => (
        <span className="tagchip" role="listitem" key={i}>
          {t}
          <button type="button" aria-label={'حذف الوسم ' + t} onClick={() => remove(i)}>×</button>
        </span>
      ))}
      <input className="taginput" aria-label={ariaLabel} onKeyDown={onKeyDown} placeholder={placeholder} />
    </div>
  );
}
