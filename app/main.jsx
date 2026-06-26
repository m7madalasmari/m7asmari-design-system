import React from 'react';
import { createRoot } from 'react-dom/client';
// Design tokens + styles (load order preserves the cascade)
import '../tokens/tokens.css';
import '../tokens/themes.css';
import '../styles/base.css';
import '../styles/components.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<App />);
