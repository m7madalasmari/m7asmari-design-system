import React from 'react';
import { createRoot } from 'react-dom/client';
// نفس ترتيب الأنماط في بقية الصفحات (يحفظ الكاسكيد)
import '../tokens/primitive.css';
import '../tokens/semantic.css';
import '../tokens/component.css';
import '../tokens/pattern.css';
import '../styles/base.css';
import '../styles/components.css';
import CatalogPage from './CatalogPage.jsx';

createRoot(document.getElementById('root')).render(<CatalogPage />);
