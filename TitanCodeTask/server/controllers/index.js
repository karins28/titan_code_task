import { HttpStatusCode } from 'axios';
import { client } from '../axios.js';
import { FETCH_LIMIT } from '../consts.js'


async function fetchPage(page, amountInLastPage, isLastPage=false) {
    const response = await client.get('/quotes', 
        { params: { page }
    })
    const quotes = response.data.quotes;
    //if i wanted a number that doesnt divide in 25 
    return isLastPage && quotes ? quotes.slice(0, amountInLastPage): quotes;
}


export const fetchRandomQuotes = async (request, response) => {
    const count = request.query.count
    const numOfRequests = Math.ceil(count/FETCH_LIMIT)
    let currPage = 1;
    let batch = []
    while(currPage <= numOfRequests){
        const isLastPage = currPage === numOfRequests 
        const resultsInLastPage = count%FETCH_LIMIT || FETCH_LIMIT

        batch.push(fetchPage(currPage, resultsInLastPage, isLastPage))
        currPage ++;
    }
    const result = await Promise.all(batch).catch(function(err) {
        return response.status(HttpStatusCode.InternalServerError).json({msg: err})
      })
     
    if (response.headersSent) return;

    const allResults = result.flat().filter(result=>result.id !== 0);
    
    return response.status(201).json({data: allResults, amount: allResults.length})

}
