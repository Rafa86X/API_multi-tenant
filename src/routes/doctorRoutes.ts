import express from 'express';
import { DoctorController } from '../controller/DoctorController';
import { pagerSuper } from '../services/pagerSuper';
import { pagerLab } from '../services/pagerLab';


const app = express();
const controller = new DoctorController();


app.post('/doctor', controller.createSuper)
  .get('/doctor', controller.getAllSuper,pagerSuper)
  .get('/doctorlab/:lab', controller.getAll,pagerLab)
  .post('/doctorlab/:lab', controller.create)
  .get('/doctorlab/:lab/:doctor', controller.getOne)
  .patch('/doctorlab/:lab/:doctor', controller.update)
  .delete('/doctorlab/:lab/:doctor', controller.delete)

export default app;