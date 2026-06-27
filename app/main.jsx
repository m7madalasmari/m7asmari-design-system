import React from 'react';
import { createRoot } from 'react-dom/client';
// Design tokens + styles (load order preserves the cascade)
import '../tokens/primitive.css';
import '../tokens/semantic.css';
import '../tokens/component.css';
import '../tokens/pattern.css';
import '../styles/base.css';
import '../styles/components.css';
import '../styles/theme-builder.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<App />);
