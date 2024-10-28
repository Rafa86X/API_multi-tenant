"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pagerSuper_1 = require("../services/pagerSuper");
const pagerLab_1 = require("../services/pagerLab");
const ReportController_1 = require("../controller/ReportController");
const app = (0, express_1.default)();
const controller = new ReportController_1.ReportController();
app.post('/report', controller.createSuper)
    .get('/report', controller.getAllSuper, pagerSuper_1.pagerSuper)
    .get('/reportlab/:lab', controller.getAll, pagerLab_1.pagerLab)
    .post('/reportlab/:lab', controller.create)
    .get('/reportlab/:lab/:report', controller.getOne)
    .patch('/reportlab/:lab/:report', controller.update)
    .delete('/reportlab/:lab/:report', controller.delete);
exports.default = app;
