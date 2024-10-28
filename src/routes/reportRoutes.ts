import express from 'express';
import { pagerSuper } from '../services/pagerSuper';
import { pagerLab } from '../services/pagerLab';
import { ReportController } from '../controller/ReportController';

const app = express();
const controller = new ReportController();



app.post('/report', controller.createSuper)
  .get('/report', controller.getAllSuper,pagerSuper)
  .get('/reportlab/:lab', controller.getAll,pagerLab)
  .post('/reportlab/:lab', controller.create)
  .get('/reportlab/:lab/:report', controller.getOne)
  .patch('/reportlab/:lab/:report', controller.update)
  .delete('/reportlab/:lab/:report', controller.delete)

export default app;