import express from 'express';
import { ClientLaboratoryController } from '../controller/ClientLaboratoryController';
import { pagerSuper } from '../services/pagerSuper';



const app = express();
const controller = new ClientLaboratoryController();



app.post('/lab', controller.create)
  .get('/lab/:id', controller.getOne)
  .get('/lab', controller.getAll,pagerSuper)
  .patch('/lab/:id', controller.update)
  .delete('/lab/:id', controller.delete);



export default app;