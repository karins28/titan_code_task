type quote ={
text: string;
author: string;
}

export const Quote = (quote: quote) => {
    return <div className="quote">
        <span className="text">"{quote.text}"</span> <span className="author">-&nbsp;{quote.author}</span>
    </div>
}