import express from 'express';
import { pagerSuper } from '../services/pagerSuper';
import { pagerLab } from '../services/pagerLab';
import { Exam_ModelController } from '../controller/Exam_ModelController';


const app = express();
const controller = new Exam_ModelController();



app.post('/exammodel', controller.createSuper)
  .get('/exammodel', controller.getAllSuper,pagerSuper)
  .get('/exammodellab/:lab', controller.getAll,pagerLab)
  .post('/exammodellab/:lab', controller.create)
  .get('/exammodellab/:lab/:em', controller.getOne)
  .patch('/exammodellab/:lab/:em', controller.update)
  .delete('/exammodellab/:lab/:em', controller.delete)

export default app;