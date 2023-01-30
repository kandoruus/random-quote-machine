import './index.css';
import colorListJSON from './colorList.json';
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const twitterURLBase = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=';

const quotesSourceURL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

//TODO: move to a helper functions file
const getNewRandomArrayElement = (arr, prevRandElement) => {
  const newArr = arr.filter(element => element !== prevRandElement);
  return newArr[Math.floor(Math.random() * newArr.length)];
}

interface IQuoteBoxState {
  quoteData: {quote: string, author: string }; 
  themeColor: string, textStyleClass: string;
  backgroundStyleClass: string;
  buttonEnabled: boolean;
  quoteList: Array<object>;
  colorList: Array<string>;
}

export function QuoteBox(props) {
  const [colorList, setColorList] = useState(colorListJSON.colors);
  const [themeColor, setThemeColor] = useState(getNewRandomArrayElement(colorList, null));
  const [quoteList, setQuoteList] = useState([{quote: "", author: ""}]);
  const [quoteData, setQuoteData] = useState(getNewRandomArrayElement(quoteList, null));
  const [textStyleClass, setTextStyleClass] = useState("animatedText fade");
  const [backgroundStyleClass, setBackgroundStyleClass] = useState("animatedBackground");
  const [buttonEnabled, setButtonEnabled] = useState(true);

  async function loadQuotes () {
    const quotesListJSON = await axios.get(quotesSourceURL);
    setQuoteList(quotesListJSON.data.quotes);
    setQuoteData(getNewRandomArrayElement(quotesListJSON.data.quotes, null));
  }

  function onAnimationEnd() {
    setTextStyleClass("animatedText");
    setButtonEnabled(true);
  };

  function onNewQuoteClick() {
    setQuoteData(getNewRandomArrayElement(quoteList, quoteData));
    setThemeColor(getNewRandomArrayElement(colorList, themeColor));
    setTextStyleClass("animatedText fade");
    setButtonEnabled(false);
  }

  function getTwitterURL() {
    return twitterURLBase + encodeURI('"' + quoteData.quote + '" ' + quoteData.author);
  }


  useEffect(() => {
    loadQuotes().catch(alert);
  }, []);

  return(
    <div id="background" style={{backgroundColor: themeColor}} className={backgroundStyleClass}>
        <div id="quote-box">
          <div id="text" style={{color: themeColor}} className={textStyleClass} onAnimationEnd={onAnimationEnd}><i className="fa fa-quote-left"></i> {quoteData.quote}</div>
          <div id="author" style={{color: themeColor}} className={textStyleClass} onAnimationEnd={onAnimationEnd}>- {quoteData.author}</div>
          <div id="buttons">
            <a id="tweet-quote" rel="noreferrer" target="_blank" href={getTwitterURL()} style={{backgroundColor: themeColor}} className={backgroundStyleClass}>
              <i className="fa fa-twitter"></i>
            </a>
            <button id="new-quote" onClick={onNewQuoteClick} style={{backgroundColor: themeColor}} className={backgroundStyleClass} disabled={!buttonEnabled}>New Quote</button>
          </div>
        </div>
      </div>
  );
}