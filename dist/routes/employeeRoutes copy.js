"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EmployeeController_1 = require("../controller/EmployeeController");
const app = (0, express_1.default)();
const controller = new EmployeeController_1.EmployeeController();
app.post('/employee', controller.create)
    .post('/employee/login', controller.login)
    .get('/employee/:id', controller.getOne)
    .get('/employee', controller.getAll)
    .patch('/employee/:id', controller.update)
    .delete('/employee/:id', controller.delete);
exports.default = app;
