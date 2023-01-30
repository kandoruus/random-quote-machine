import './index.css';
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { getNewRandomArrayElement } from './helperFunctions';
import {colors, twitterURLBase, quotesSourceURL, backgroundStyleClass} from './constants';

export function QuoteBox(): JSX.Element {
  const [themeColor, setThemeColor] = useState(getNewRandomArrayElement<string>(colors, null));
  const [quoteList, setQuoteList] = useState([{quote: "", author: ""}]);
  const [quoteData, setQuoteData] = useState(getNewRandomArrayElement<{quote: string, author: string}>(quoteList, null));
  const [textStyleClass, setTextStyleClass] = useState("animatedText fade");
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const [hasDataLoaded, setHasDataLoaded] = useState(false);

  async function loadQuotes () {
      const quotesListJSON = await axios.get(quotesSourceURL);
      setQuoteList(quotesListJSON.data.quotes);
      setQuoteData(getNewRandomArrayElement<{quote: string, author: string}>(quotesListJSON.data.quotes, quoteData));
      setHasDataLoaded(true);
  }

  function onAnimationEnd() {
    setTextStyleClass("animatedText");
    setButtonEnabled(true);
  };

  function onNewQuoteClick() {
    setQuoteData(getNewRandomArrayElement<{quote: string, author: string}>(quoteList, quoteData));
    setThemeColor(getNewRandomArrayElement<string>(colors, themeColor));
    setTextStyleClass("animatedText fade");
    setButtonEnabled(false);
  }

  function getTwitterURL(): string {
    return twitterURLBase + encodeURI('"' + quoteData.quote + '" ' + quoteData.author);
  }


  useEffect(() => {
    if(!hasDataLoaded) loadQuotes().catch(alert);
  });

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