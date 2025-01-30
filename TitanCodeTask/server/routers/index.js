import express from 'express'
import { fetchRandomQuotes } from '../controllers/index.js';
const router = express.Router()

router.get('/quotes', fetchRandomQuotes)

export default router;
