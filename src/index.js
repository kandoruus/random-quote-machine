import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QuoteBox } from './QuoteBox_axios_hooks.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <QuoteBox />
  </React.StrictMode>
);