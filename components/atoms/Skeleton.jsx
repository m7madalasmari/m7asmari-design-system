import React from 'react';

/**
 * Skeleton — هيكل تحميل وامض (shimmer). توكنز فقط.
 * أشكال: سطر (افتراضي) · دائرة (circle) · أسطر متعددة (lines).
 * <Skeleton width="60%" /> · <Skeleton circle height={40} /> · <Skeleton lines={3} />
 */
export default function Skeleton({ width = '100%', height = 16, radius = 'var(--radius-sm)', circle = false, lines, className = '' }) {
  if (lines) {
    return (
      <div className={('fx col gap8 ' + className).trim()}>
        {Array.from({ length: lines }, (_, i) => (
          <span key={i} className="skeleton" style={{ height, width: i === lines - 1 ? '70%' : '100%', borderRadius: radius, display: 'block' }} />
        ))}
      </div>
    );
  }
  return <span className={('skeleton ' + className).trim()} style={{ width: circle ? height : width, height, borderRadius: circle ? 'var(--radius-full)' : radius, display: 'block' }} />;
}
