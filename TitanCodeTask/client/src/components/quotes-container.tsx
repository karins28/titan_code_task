import { useQuery } from "@tanstack/react-query/build/lib/useQuery";
import { Quote } from "./quote";
import { item } from '../types/quote'



type Props = {
    amount: number;
    quotes: item[];
}
export const QuotesContainer = (results: Props) => {
    return <div className="quotesContainer">
        {results.quotes.map(quote=>
            <Quote key={quote.id} text={quote.body} author={quote.author}></Quote>
        )}
    </div>

}
