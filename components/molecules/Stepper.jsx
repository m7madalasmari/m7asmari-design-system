import React from 'react';

/**
 * Stepper — مؤشّر خطوات أفقي على أصناف M7 (.stepper/.step). يعرض المكتملة/النشطة/القادمة.
 * <Stepper steps={['الحساب','التحقّق','تم']} current={1} />
 */
export default function Stepper({ steps = [], current = 0, className = '' }) {
  return (
    <div className={'stepper' + (className ? ' ' + className : '')} role="list" aria-label="خطوات">
      {steps.map((label, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : '';
        return (
          <React.Fragment key={i}>
            <div
              className={'step' + (state ? ' ' + state : '')}
              role="listitem"
              aria-current={i === current ? 'step' : undefined}
            >
              <span className="step-dot">{i < current ? '✓' : i + 1}</span>
              <span className="step-label">{label}</span>
            </div>
            {i < steps.length - 1 ? <span className={'step-line' + (i < current ? ' done' : '')}></span> : null}
          </React.Fragment>
        );
      })}
    </div>
  );
}
