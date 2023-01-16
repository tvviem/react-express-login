import React from 'react';
import ReactDOM from 'react-dom/client';
// PHAI DAN NHAP CSS TU tailwindcss truoc khi IMPORT App component
import './index.css';
// Dan nhap COMPONENT SAU CUNG
import App from './App';

// NOTE: when using React.StrictMode, from react-18 components duplicate its Restate
// but only right DEV-mode
// Production is still ok
// Link REF: https://reactjs.org/docs/strict-mode.html#ensuring-reusable-state
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  // <App />
);
