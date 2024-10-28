"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pagerSuper_1 = require("../services/pagerSuper");
const pagerLab_1 = require("../services/pagerLab");
const Exam_ModelController_1 = require("../controller/Exam_ModelController");
const app = (0, express_1.default)();
const controller = new Exam_ModelController_1.Exam_ModelController();
app.post('/exammodel', controller.createSuper)
    .get('/exammodel', controller.getAllSuper, pagerSuper_1.pagerSuper)
    .get('/exammodellab/:lab', controller.getAll, pagerLab_1.pagerLab)
    .post('/exammodellab/:lab', controller.create)
    .get('/exammodellab/:lab/:em', controller.getOne)
    .patch('/exammodellab/:lab/:em', controller.update)
    .delete('/exammodellab/:lab/:em', controller.delete);
exports.default = app;
