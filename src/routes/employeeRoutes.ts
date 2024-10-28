import express from 'express';
import { EmployeeController } from '../controller/EmployeeController';
import { pagerSuper } from '../services/pagerSuper';
import { pagerLab } from '../services/pagerLab';

const app = express();
const controller = new EmployeeController();

app.post('/employee', controller.createSuper)
  .post('/employee/login', controller.login)
  .post('/employee/newpassword/:lab/:employee', controller.updatePassWord)
  .get('/employee', controller.getAllSuper,pagerSuper)
  .get('/employeelab/:lab', controller.getAll,pagerLab)
  .post('/employeelab/:lab', controller.create)
  .get('/employeelab/:lab/:employee', controller.getOne)
  .patch('/employeelab/:lab/:employee', controller.update)
  .delete('/employeelab/:lab/:employee', controller.delete)


export default app;