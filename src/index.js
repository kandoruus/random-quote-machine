import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { quotes, colors } from './rand-arrays.js';
import { current } from '@reduxjs/toolkit';

const twitterURLBase = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=';

const getNewRandomArrayElement = (arr, prevRandElement) => {
  const newArr = arr.filter(element => element !== prevRandElement);
  return newArr[Math.floor(Math.random() * newArr.length)];
}

class QuoteBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      quoteData: getNewRandomArrayElement(quotes, null),
      themeColor: getNewRandomArrayElement(colors, null),
      textStyleClass: "animatedText fade",
      backgroundStyleClass: "animatedBackground"
    }
    this.onNewQuoteClick = this.onNewQuoteClick.bind(this);
    this.getTwitterURL = this.getTwitterURL.bind(this);
    this.onAnimationEnd = this.onAnimationEnd.bind(this);
  }

  onAnimationEnd() {
    this.setState({textStyleClass: "animatedText"});
  };

  getTwitterURL() {
    return twitterURLBase + encodeURI('"' + this.state.quoteData.quote + '" ' + this.state.quoteData.author);
  }

  onNewQuoteClick() {
    this.setState(oldState => ({ quoteData: getNewRandomArrayElement(quotes, oldState.quoteData), themeColor: getNewRandomArrayElement(colors, oldState.themeColor), textStyleClass: "animatedText fade"}));
  }

  render() {
    return (
      <div id="background" style={{backgroundColor: this.state.themeColor}} className={this.state.backgroundStyleClass}>
        <div id="quote-box">
          <div id="text" style={{color: this.state.themeColor}} className={this.state.textStyleClass} onAnimationEnd={this.onAnimationEnd}><i className="fa fa-quote-left"></i> {this.state.quoteData.quote}</div>
          <div id="author" style={{color: this.state.themeColor}} className={this.state.textStyleClass} onAnimationEnd={this.onAnimationEnd}>- {this.state.quoteData.author}</div>
          <div id="buttons">
            <a id="tweet-quote" rel="noreferrer" target="_blank" href={this.getTwitterURL()} style={{backgroundColor: this.state.themeColor}} className={this.state.backgroundStyleClass}>
              <i className="fa fa-twitter"></i>
            </a>
            <button id="new-quote" onClick={this.onNewQuoteClick} style={{backgroundColor: this.state.themeColor}} className={this.state.backgroundStyleClass}>New Quote</button>
          </div>
        </div>
      </div>
    );
  }
}


const root = ReactDOM.createRoot(document.getElementById('body'));

root.render(
  <React.StrictMode>
    <QuoteBox />
  </React.StrictMode>
);
