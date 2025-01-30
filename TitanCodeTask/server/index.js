import express from 'express'
import cors from 'cors'
import router from './routers/index.js';
import dotenv from 'dotenv'

dotenv.config()

const app = express();
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});

app.use('/api', router)
