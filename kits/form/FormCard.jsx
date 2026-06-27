import React from 'react';
import Card from '../../components/atoms/Card.jsx';
import Alert from '../../components/atoms/Alert.jsx';

/**
 * FormCard — غلاف عرض موحّد لوصفات الـKit (ليس core): بطاقة (.panel) + عنوان + وصف،
 * وتبديل تلقائي لحالة النجاح بعد الإرسال. يعيد استخدام Card و Alert من M7.
 */
export default function FormCard({ title, description, done = false, doneText = 'تم الإرسال بنجاح.', children }) {
  return (
    <Card variant="panel" className="panel-pad">
      <div className="fx col gap16">
        <div>
          <h3 className="t-h3">{title}</h3>
          {description ? <p className="t-sm">{description}</p> : null}
        </div>
        {done ? (
          <Alert variant="ok">
            <span className="alert-ico" aria-hidden="true">✓</span>
            <div>
              <div className="alert-title">تم بنجاح</div>
              <div className="alert-text">{doneText}</div>
            </div>
          </Alert>
        ) : children}
      </div>
    </Card>
  );
}
