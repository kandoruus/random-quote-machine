import './index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
//import { Provider } from 'react-redux';

class NewQuoteButton extends React.Component {
  render() {
    return (
      <button id="new-quote">New Quote</button>
    );
  }
}

const container = document.getElementById('new-quote-container');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <NewQuoteButton />
  </React.StrictMode>
);
