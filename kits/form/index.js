// kits/form/index.js — سجلّ Form Kit: كتالوج وصفات قابل للقراءة آليًا (جاهز للأجنت لاحقًا).
// كل وصفة: id/عنوان/فئة + المكوّن React + المكوّنات المستخدمة (uses) من M7 core.
// الكِت طبقة تشغيل: لا هوية/توكنز/CSS خاصة — يركّب مكوّنات core فقط.
import LoginForm from './recipes/LoginForm.jsx';
import RegisterForm from './recipes/RegisterForm.jsx';
import ForgotPasswordForm from './recipes/ForgotPasswordForm.jsx';
import OtpVerifyForm from './recipes/OtpVerifyForm.jsx';
import ChangePasswordForm from './recipes/ChangePasswordForm.jsx';
import ContactForm from './recipes/ContactForm.jsx';
import FeedbackForm from './recipes/FeedbackForm.jsx';
import NewsletterForm from './recipes/NewsletterForm.jsx';
import ProfileForm from './recipes/ProfileForm.jsx';
import AddressForm from './recipes/AddressForm.jsx';
import PaymentForm from './recipes/PaymentForm.jsx';
import WizardForm from './recipes/WizardForm.jsx';
import SurveyForm from './recipes/SurveyForm.jsx';
import SearchFilterForm from './recipes/SearchFilterForm.jsx';

export const CATEGORIES = [
  { id: 'auth', title: 'المصادقة' },
  { id: 'engage', title: 'التفاعل' },
  { id: 'data', title: 'البيانات' },
  { id: 'advanced', title: 'متقدّمة' },
];

export const RECIPES = [
  { id: 'login', title: 'تسجيل الدخول', category: 'auth', component: LoginForm, uses: ['Field', 'Input', 'PasswordInput', 'Checkbox', 'Button', 'Form', 'FormActions'] },
  { id: 'register', title: 'إنشاء حساب', category: 'auth', component: RegisterForm, uses: ['Field', 'Input', 'PhoneInput', 'PasswordInput', 'Select', 'Checkbox', 'Button', 'Form'] },
  { id: 'forgot', title: 'استعادة كلمة المرور', category: 'auth', component: ForgotPasswordForm, uses: ['Field', 'Input', 'Button', 'Form'] },
  { id: 'otp', title: 'تأكيد رمز التحقّق', category: 'auth', component: OtpVerifyForm, uses: ['OtpInput', 'FieldMessage', 'Button'] },
  { id: 'change-password', title: 'تغيير كلمة المرور', category: 'auth', component: ChangePasswordForm, uses: ['Field', 'PasswordInput', 'Button', 'Form'] },

  { id: 'contact', title: 'تواصل معنا', category: 'engage', component: ContactForm, uses: ['Field', 'Input', 'Textarea', 'Select', 'Button', 'Form'] },
  { id: 'feedback', title: 'ملاحظات وتقييم', category: 'engage', component: FeedbackForm, uses: ['Field', 'RadioGroup', 'Select', 'Textarea', 'Switch', 'Button'] },
  { id: 'newsletter', title: 'اشتراك النشرة', category: 'engage', component: NewsletterForm, uses: ['Field', 'Input', 'Checkbox', 'RadioGroup', 'Button'] },

  { id: 'profile', title: 'الملف الشخصي', category: 'data', component: ProfileForm, uses: ['Field', 'Input', 'Textarea', 'DatePicker', 'Select', 'FileUpload', 'Switch', 'Button'] },
  { id: 'address', title: 'عنوان الشحن', category: 'data', component: AddressForm, uses: ['Field', 'Input', 'Combobox', 'Select', 'Checkbox', 'Button'] },
  { id: 'payment', title: 'بيانات الدفع', category: 'data', component: PaymentForm, uses: ['Field', 'Input', 'Select', 'Checkbox', 'Button'] },

  { id: 'wizard', title: 'تسجيل متعدّد الخطوات', category: 'advanced', component: WizardForm, uses: ['Stepper', 'Field', 'Input', 'PhoneInput', 'Select', 'Button'] },
  { id: 'survey', title: 'استبيان', category: 'advanced', component: SurveyForm, uses: ['Field', 'Select', 'RadioGroup', 'Slider', 'Textarea', 'Button'] },
  { id: 'search-filter', title: 'بحث وفلترة', category: 'advanced', component: SearchFilterForm, uses: ['Field', 'Combobox', 'Select', 'Slider', 'Checkbox', 'Button'] },
];

export const FORM_KIT = {
  id: 'form',
  title: 'Form Kit',
  description: 'توليد نماذج عربية RTL متعددة من مكوّنات وتوكنز M7 — بلا هوية أو توكنز خاصة.',
  categories: CATEGORIES,
  recipes: RECIPES,
};

export default FORM_KIT;
