import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { quotes, colors } from './rand-arrays.js';

const getRandomArrayElement = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
}

const twitterURLBase = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=';


class QuoteBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      themeColor: getRandomArrayElement(colors),
      quoteData: getRandomArrayElement(quotes),
    }
    this.onNewQuoteClick = this.onNewQuoteClick.bind(this);
    this.getTwitterURL = this.getTwitterURL.bind(this);
  }

  getTwitterURL() {
    return twitterURLBase + encodeURI('"' + this.state.quoteData.quote + '" ' + this.state.quoteData.author);
  }

  onNewQuoteClick() {
    this.setState({
      themeColor: getRandomArrayElement(colors),
      quoteData: getRandomArrayElement(quotes)
    });
  }

  render() {
    return (
      <div id="quote-box">
        <div id="text">{this.state.quoteData.quote}</div>
        <div id="author">{this.state.quoteData.author}</div>
        <a id="tweet-quote" rel="noreferrer" target="_blank" href={this.getTwitterURL()}>
          <i className="fa fa-twitter"></i>
        </a>
        <button id="new-quote" onClick={this.onNewQuoteClick}>New Quote</button>
      </div>
    );
  }
}


const container = document.getElementById('wrapper');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <QuoteBox />
  </React.StrictMode>
);
