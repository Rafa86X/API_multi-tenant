import express from 'express';
import { Security } from '../security/segurity';
import addTokenMiddleware from '../services/addTokenResponse';

const segurity = new Security();

const app = express();

app.use(segurity.tokenValidity);

app.use(addTokenMiddleware);

export default app;