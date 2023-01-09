import React from 'react';
import ReactDOM from 'react-dom/client';
// PHAI DAN NHAP CSS TU tailwindcss truoc khi IMPORT App component
import './index.css';
// Dan nhap COMPONENT SAU CUNG
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
