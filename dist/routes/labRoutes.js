"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ClientLaboratoryController_1 = require("../controller/ClientLaboratoryController");
const pagerSuper_1 = require("../services/pagerSuper");
const app = (0, express_1.default)();
const controller = new ClientLaboratoryController_1.ClientLaboratoryController();
app.post('/lab', controller.create)
    .get('/lab/:id', controller.getOne)
    .get('/lab', controller.getAll, pagerSuper_1.pagerSuper)
    .patch('/lab/:id', controller.update)
    .delete('/lab/:id', controller.delete);
exports.default = app;
