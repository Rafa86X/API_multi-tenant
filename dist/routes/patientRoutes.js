"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pagerSuper_1 = require("../services/pagerSuper");
const pagerLab_1 = require("../services/pagerLab");
const PatientController_1 = require("../controller/PatientController");
const app = (0, express_1.default)();
const controller = new PatientController_1.PatientController();
app.post('/patient', controller.createSuper)
    .get('/patient', controller.getAllSuper, pagerSuper_1.pagerSuper)
    .get('/patientlab/:lab', controller.getAll, pagerLab_1.pagerLab)
    .post('/patientlab/:lab', controller.create)
    .get('/patientlab/:lab/:patient', controller.getOne)
    .patch('/patientlab/:lab/:patient', controller.update)
    .delete('/patientlab/:lab/:patient', controller.delete);
exports.default = app;
