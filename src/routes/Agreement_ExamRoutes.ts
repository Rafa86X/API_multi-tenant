import express from 'express';
import { Agreement_ExamController } from '../controller/Agreement_ExamController';

const app = express();
const controller = new Agreement_ExamController();



app.post('/agreement_exam', controller.createSuper)
  .post('/agreement_examlab/:lab', controller.create)
  .get('/getallexamcodebyagreement/:lab', controller.getAllExamsByAgrement)
  .get('/getallagreementbyexamcode/:lab', controller.getAllAgrementsByExam)
  .delete('/agreement_examlab/:lab', controller.delete)


export default app;