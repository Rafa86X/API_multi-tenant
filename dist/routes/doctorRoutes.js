"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DoctorController_1 = require("../controller/DoctorController");
const pagerSuper_1 = require("../services/pagerSuper");
const pagerLab_1 = require("../services/pagerLab");
const app = (0, express_1.default)();
const controller = new DoctorController_1.DoctorController();
app.post('/doctor', controller.createSuper)
    .get('/doctor', controller.getAllSuper, pagerSuper_1.pagerSuper)
    .get('/doctorlab/:lab', controller.getAll, pagerLab_1.pagerLab)
    .post('/doctorlab/:lab', controller.create)
    .get('/doctorlab/:lab/:doctor', controller.getOne)
    .patch('/doctorlab/:lab/:doctor', controller.update)
    .delete('/doctorlab/:lab/:doctor', controller.delete);
exports.default = app;
