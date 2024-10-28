"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EmployeeController_1 = require("../controller/EmployeeController");
const app = (0, express_1.default)();
const controller = new EmployeeController_1.EmployeeController();
app.post('/auth/login', controller.login);
exports.default = app;
