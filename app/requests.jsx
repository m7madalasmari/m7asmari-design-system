import React from 'react';
import { createRoot } from 'react-dom/client';
// نفس ترتيب الأنماط في الصفحة الرئيسية (يحفظ الكاسكيد)
import '../tokens/primitive.css';
import '../tokens/semantic.css';
import '../tokens/component.css';
import '../tokens/pattern.css';
import '../styles/base.css';
import '../styles/components.css';
import '../styles/requests.css';
import RequestsPage from './RequestsPage.jsx';

createRoot(document.getElementById('root')).render(<RequestsPage />);
