import { HttpStatusCode } from "axios";
import axios from "axios";
import axiosRetry from 'axios-retry'
import dotenv from 'dotenv'

//since it's a static file i had to initialize it separately
dotenv.config()
export const client = axios.create({ baseURL: process.env.API_URL });

 client.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${process.env.AUTH_TOKEN}`
    return config;
  });
  
axiosRetry(client, {
    retries: process.env.RETRY_AMOUNT,
    retryDelay: (retryCount) => {
        console.log(`retry attempt: ${retryCount}`);
        return retryCount * 2000; // exponential backoff (firs)
    },
    retryCondition: (error) => error.response && error.response.status === HttpStatusCode.TooManyRequests
    });
