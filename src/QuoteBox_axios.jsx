import './index.css';
import colorListJSON from './colorList.json';
import React from 'react';
import axios from 'axios';

const twitterURLBase = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=';

const quotesSourceURL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

const getNewRandomArrayElement = (arr, prevRandElement) => {
  const newArr = arr.filter(element => element !== prevRandElement);
  return newArr[Math.floor(Math.random() * newArr.length)];
}

export class QuoteBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      quoteData: {quote: "", author: ""},
      themeColor: getNewRandomArrayElement(colorListJSON.colors, null),
      textStyleClass: "animatedText fade",
      backgroundStyleClass: "animatedBackground",
      buttonEnabled: true,
      quoteList: [],
      colorList: colorListJSON.colors
    };
    this.onNewQuoteClick = this.onNewQuoteClick.bind(this);
    this.getTwitterURL = this.getTwitterURL.bind(this);
    this.onAnimationEnd = this.onAnimationEnd.bind(this);
    this.loadQuotes = this.loadQuotes.bind(this);
  }

  async loadQuotes () {
    const quotesListJSON = await axios.get(quotesSourceURL);
    this.setState({
      quoteData: getNewRandomArrayElement(quotesListJSON.data.quotes, null),
      quoteList: quotesListJSON.data.quotes,
    });
  }

  async componentDidMount() {
    this.loadQuotes().catch(alert);
  }
  
  onAnimationEnd() {
    this.setState({textStyleClass: "animatedText", buttonEnabled: true});
  };

  getTwitterURL() {
    return twitterURLBase + encodeURI('"' + this.state.quoteData.quote + '" ' + this.state.quoteData.author);
  }

  onNewQuoteClick() {
    this.setState(oldState => ({
      quoteData: getNewRandomArrayElement(oldState.quoteList, oldState.quoteData),
      themeColor: getNewRandomArrayElement(oldState.colorList, oldState.themeColor),
      textStyleClass: "animatedText fade",
      buttonEnabled: false
    }));
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
            <button id="new-quote" onClick={this.onNewQuoteClick} style={{backgroundColor: this.state.themeColor}} className={this.state.backgroundStyleClass} disabled={!this.state.buttonEnabled}>New Quote</button>
          </div>
        </div>
      </div>
    );
  }
}