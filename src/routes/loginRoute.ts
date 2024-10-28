import express from 'express';
import { EmployeeController } from '../controller/EmployeeController';


const app = express();
const controller = new EmployeeController();
app.post('/auth/login', controller.login)
export default app;