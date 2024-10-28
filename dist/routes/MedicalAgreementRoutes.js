"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pagerSuper_1 = require("../services/pagerSuper");
const pagerLab_1 = require("../services/pagerLab");
const MedicalAgreementController_1 = require("../controller/MedicalAgreementController");
const app = (0, express_1.default)();
const controller = new MedicalAgreementController_1.MedicalAgreementController();
app.post('/medicalAgreement', controller.createSuper)
    .get('/medicalAgreement', controller.getAllSuper, pagerSuper_1.pagerSuper)
    .get('/medicalAgreementlab/:lab', controller.getAll, pagerLab_1.pagerLab)
    .post('/medicalAgreementlab/:lab', controller.create)
    .get('/medicalAgreementlab/:lab/:ma', controller.getOne)
    .patch('/medicalAgreementlab/:lab/:ma', controller.update)
    .delete('/medicalAgreementlab/:lab/:ma', controller.delete);
exports.default = app;
