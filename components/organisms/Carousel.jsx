import React from 'react';
import Icon from '../atoms/Icon.jsx';

/**
 * Carousel — معرض شرائح بتلاشٍ + أسهم + نقاط (RTL: السابق يمين، التالي يسار). توكنز فقط.
 * slides: عقد React (محتوى كل شريحة).
 * <Carousel slides={[<img…/>, <div…/>]} />
 */
export default function Carousel({ slides = [], ariaLabel = 'معرض شرائح', className = '' }) {
  const [idx, setIdx] = React.useState(0);
  const n = slides.length;
  if (!n) return null;
  const go = (i) => setIdx((i + n) % n);
  return (
    <div className={('carousel ' + className).trim()} role="group" aria-label={ariaLabel} aria-roledescription="carousel">
      <div className="carousel-viewport">
        {slides.map((s, i) => (
          <div className={'carousel-slide' + (i === idx ? ' on' : '')} key={i} aria-hidden={i !== idx}>{s}</div>
        ))}
      </div>
      {n > 1 ? (
        <React.Fragment>
          <button className="carousel-arrow prev" onClick={() => go(idx - 1)} aria-label="الشريحة السابقة"><Icon name="chevron-right" /></button>
          <button className="carousel-arrow next" onClick={() => go(idx + 1)} aria-label="الشريحة التالية"><Icon name="chevron-left" /></button>
          <div className="carousel-dots">
            {slides.map((_, i) => (
              <button key={i} className={'carousel-dot' + (i === idx ? ' on' : '')} onClick={() => setIdx(i)} aria-label={'الشريحة ' + (i + 1)} aria-current={i === idx ? 'true' : undefined} />
            ))}
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
}
