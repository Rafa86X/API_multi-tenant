"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Agreement_ExamController_1 = require("../controller/Agreement_ExamController");
const app = (0, express_1.default)();
const controller = new Agreement_ExamController_1.Agreement_ExamController();
app.post('/agreement_exam', controller.createSuper)
    .post('/agreement_examlab/:lab', controller.create)
    .get('/getallexamcodebyagreement/:lab', controller.getAllExamsByAgrement)
    .get('/getallagreementbyexamcode/:lab', controller.getAllAgrementsByExam)
    .delete('/agreement_examlab/:lab', controller.delete);
exports.default = app;
