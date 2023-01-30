import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QuoteBox } from './QuoteBox.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <QuoteBox />
  </React.StrictMode>
);