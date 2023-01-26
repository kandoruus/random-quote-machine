import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QuoteBox } from './QuoteBox_async_await.jsx';

const root = ReactDOM.createRoot(document.getElementById('body'));

root.render(
  <React.StrictMode>
    <QuoteBox />
  </React.StrictMode>
);