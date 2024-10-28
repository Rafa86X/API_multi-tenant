"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EmployeeController_1 = require("../controller/EmployeeController");
const pagerSuper_1 = require("../services/pagerSuper");
const pagerLab_1 = require("../services/pagerLab");
const app = (0, express_1.default)();
const controller = new EmployeeController_1.EmployeeController();
app.post('/employee', controller.createSuper)
    .post('/employee/login', controller.login)
    .post('/employee/newpassword/:lab/:employee', controller.updatePassWord)
    .get('/employee', controller.getAllSuper, pagerSuper_1.pagerSuper)
    .get('/employeelab/:lab', controller.getAll, pagerLab_1.pagerLab)
    .post('/employeelab/:lab', controller.create)
    .get('/employeelab/:lab/:employee', controller.getOne)
    .patch('/employeelab/:lab/:employee', controller.update)
    .delete('/employeelab/:lab/:employee', controller.delete);
exports.default = app;
