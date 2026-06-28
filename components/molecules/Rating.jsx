import React from 'react';
import Icon from '../atoms/Icon.jsx';

/**
 * Rating — تقييم نجوم تفاعلي/للقراءة (RTL). توكنز فقط.
 * <Rating value={4} onChange={setV} /> · <Rating value={3.5} readOnly />
 */
export default function Rating({ value = 0, max = 5, onChange, readOnly = false, size = 22, ariaLabel = 'تقييم', className = '' }) {
  const [hover, setHover] = React.useState(0);
  const cur = hover || value;
  const stars = Array.from({ length: max }, (_, i) => i + 1);
  return (
    <div className={('rating ' + className).trim()} role={readOnly ? 'img' : 'radiogroup'} aria-label={ariaLabel + ': ' + value + ' من ' + max}>
      {stars.map((s) => (
        <button
          type="button"
          key={s}
          className={'rating-star' + (s <= cur ? ' on' : '')}
          disabled={readOnly}
          role={readOnly ? undefined : 'radio'}
          aria-checked={readOnly ? undefined : s === value}
          aria-label={s + ' نجوم'}
          onMouseEnter={() => !readOnly && setHover(s)}
          onMouseLeave={() => !readOnly && setHover(0)}
          onClick={() => !readOnly && onChange && onChange(s)}
        >
          <Icon name="star" size={size} />
        </button>
      ))}
    </div>
  );
}
