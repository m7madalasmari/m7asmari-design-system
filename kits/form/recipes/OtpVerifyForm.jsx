import React from 'react';
import OtpInput from '../../../components/organisms/OtpInput.jsx';
import FieldMessage from '../../../components/atoms/FieldMessage.jsx';
import Button from '../../../components/atoms/Button.jsx';
import FormActions from '../../../components/molecules/FormActions.jsx';
import FormCard from '../FormCard.jsx';

/** تأكيد رمز التحقّق — OtpInput بست خانات (الرمز التجريبي 123456). */
export default function OtpVerifyForm() {
  const [status, setStatus] = React.useState('idle');
  const [done, setDone] = React.useState(false);
  const onComplete = (code) => {
    if (code === '123456') { setStatus('success'); setDone(true); }
    else setStatus('error');
  };
  return (
    <FormCard
      title="تأكيد رمز التحقّق"
      description="أرسلنا رمزًا من 6 أرقام إلى جوالك. (للتجربة: 123456)"
      done={done}
      doneText="تم تأكيد الرمز بنجاح."
    >
      <div className="fx col gap16">
        <OtpInput
          length={6}
          status={status}
          onComplete={onComplete}
          onChange={() => { if (status !== 'idle') setStatus('idle'); }}
        />
        {status === 'error'
          ? <FieldMessage status="error">الرمز غير صحيح، تأكّد وحاول مجددًا.</FieldMessage>
          : <FieldMessage>لم يصلك الرمز؟ يمكنك إعادة الإرسال بعد 30 ثانية.</FieldMessage>}
        <FormActions>
          <Button type="button" variant="brand">تأكيد</Button>
          <Button type="button" variant="ghost">إعادة إرسال الرمز</Button>
        </FormActions>
      </div>
    </FormCard>
  );
}
