import React, { useState } from 'react';
import './App.css';
import { MAXQUOTES } from './utils/consts';
import { QuotesContainer } from './components/quotes-container';
import { useQuery } from '@tanstack/react-query';
import { item } from './types/quote';

 

const fetchQuotes = async (count: number) => {
  const res = await fetch("http://localhost:3001/api/quotes?count="+ count);
  const data = await res.json();
  return data;

};

function App() {
  let [number, setNumber] = useState(0)

  const { data, isLoading, error, refetch } = useQuery(['quotes'], () => {return fetchQuotes(number)}, {
    enabled: false
  });

  const isNumberValid = number < MAXQUOTES && number > 0
  
  return (
    <div>
      <header>
        <p style={{textAlign: 'center'}}>Quotes Generator</p>
        </header>
        <div className="quotes">
        <div className="quotesLabel">
        <label>Enter a valid number of quotes: </label>
        <input className={isNumberValid? 'valid': 'invalid'}
        type="number" value={number} onChange={(val)=>setNumber(Number(val.target.value))}>  
         </input>
</div>
        <button disabled={!isNumberValid} onClick={() => {refetch()}}>
          Generate
        </button>
        </div>
        {isLoading && isNumberValid && <span>loading...</span>}
        {error && <span>error fetching quotes</span>}
        {!isLoading && data && <QuotesContainer quotes={data.data} amount={data.count} />}
        </div>
  );
}

export default App;
