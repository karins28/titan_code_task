import { HttpStatusCode } from 'axios';
import { client } from '../axios.js';
import { FETCH_LIMIT, MAX_COUNT } from '../consts.js'

const isValidCount = (count) => {
 return !isNaN(count) && (count > 0 && count <= MAX_COUNT)
}

async function fetchPage(page, amountInLastPage, filter, type, isLastPage=false) {
    const response = await client.get('/quotes', 
        { params: { page, filter, type }
    })
    const quotes = response.data.quotes;
    //if i want a number that doesnt divide in 25 
    return isLastPage && quotes ? quotes.slice(0, amountInLastPage): quotes;
}

//todo: add type verifications
export const fetchRandomQuotes = async (request, response) => {
    const { count, filter, type} = request.query
    const numOfRequests = Math.ceil(count/FETCH_LIMIT)
    if(!isValidCount(Number(count))){
        return response.status(HttpStatusCode.BadRequest).json({msg: "count is invalid"})
    }
    let currPage = 1;
    let batch = []
    while(currPage <= numOfRequests){
        const isLastPage = currPage === numOfRequests 
        const resultsInLastPage = count%FETCH_LIMIT || FETCH_LIMIT

        batch.push(fetchPage(currPage, resultsInLastPage, filter, type, isLastPage))
        currPage ++;
    }
    const result = await Promise.all(batch).catch(function(err) {
        return response.status(HttpStatusCode.InternalServerError).json({msg: err})
      })
     
    if (response.headersSent) return;

    const allResults = result.flat().filter(result=>result.id !== 0);
    
    return response.status(201).json({data: allResults, amount: allResults.length})

}
