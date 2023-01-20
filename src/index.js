import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { quotes, colors } from './rand-arrays.js';

const twitterURLBase = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=';

const getRandomArrayElement = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
}

const updateTheme = () => {
  const oldTheme = document.documentElement.style.getPropertyValue('--theme');
  document.documentElement.style.setProperty('--theme', getRandomArrayElement(colors.filter(color => color !== oldTheme)));
}


class QuoteBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      quoteData: getRandomArrayElement(quotes),
    }
    document.documentElement.style.setProperty('--theme', getRandomArrayElement(colors));
    this.onNewQuoteClick = this.onNewQuoteClick.bind(this);
    this.getTwitterURL = this.getTwitterURL.bind(this);
  }

  getTwitterURL() {
    return twitterURLBase + encodeURI('"' + this.state.quoteData.quote + '" ' + this.state.quoteData.author);
  }

  onNewQuoteClick() {
    this.setState({
      quoteData: getRandomArrayElement(quotes)
    });
    updateTheme();
  }

  render() {
    return (
      <div id="quote-box">
        <div id="text"><i class="fa fa-quote-left"></i> {this.state.quoteData.quote}</div>
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
