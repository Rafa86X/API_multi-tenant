import express from 'express';
import { pagerSuper } from '../services/pagerSuper';
import { pagerLab } from '../services/pagerLab';
import { MedicalAgreementController } from '../controller/MedicalAgreementController';


const app = express();
const controller = new MedicalAgreementController();



app.post('/medicalAgreement', controller.createSuper)
  .get('/medicalAgreement', controller.getAllSuper,pagerSuper)
  .get('/medicalAgreementlab/:lab', controller.getAll,pagerLab)
  .post('/medicalAgreementlab/:lab', controller.create)
  .get('/medicalAgreementlab/:lab/:ma', controller.getOne)
  .patch('/medicalAgreementlab/:lab/:ma', controller.update)
  .delete('/medicalAgreementlab/:lab/:ma', controller.delete)

export default app;