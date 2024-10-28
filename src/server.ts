import express from 'express';
import { config } from 'dotenv';
import routes from './routes/router';
import cors from 'cors';

config();


const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on ports ${port}`));

app.use(cors());
app.use(express.json()).use(routes);