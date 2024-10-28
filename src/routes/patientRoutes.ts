import express from 'express';
import { pagerSuper } from '../services/pagerSuper';
import { pagerLab } from '../services/pagerLab';
import { PatientController } from '../controller/PatientController';


const app = express();
const controller = new PatientController();



app.post('/patient', controller.createSuper)
  .get('/patient', controller.getAllSuper,pagerSuper)
  .get('/patientlab/:lab', controller.getAll,pagerLab)
  .post('/patientlab/:lab', controller.create)
  .get('/patientlab/:lab/:patient', controller.getOne)
  .patch('/patientlab/:lab/:patient', controller.update)
  .delete('/patientlab/:lab/:patient', controller.delete)

export default app;