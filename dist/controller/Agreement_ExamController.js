"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agreement_ExamController = void 0;
const protocols_1 = require("../protocols/protocols");
const segurity_1 = require("../security/segurity");
const getLabByToken_1 = require("../services/getLabByToken");
const Agreement_ExamRepository_1 = require("../repository/Agreement_ExamRepository");
class Agreement_ExamController {
    createSuper(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new Agreement_ExamRepository_1.Agreement_ExamRepository();
            const segurity = new segurity_1.Security();
            try {
                const data = req.body;
                const operation = 'C';
                yield segurity.tokenAuthenticatorByEndpoint(protocols_1.Tables.super, operation, req);
                const registered = yield repository.create(data);
                return res.status(200).json(registered.send);
            }
            catch (error) {
                return res.status(400).json({ message: "Erro ao criar novo profissional", error: error.message });
            }
            finally {
                repository.disconnect();
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new Agreement_ExamRepository_1.Agreement_ExamRepository();
            const segurity = new segurity_1.Security();
            try {
                const dataIncomplett = req.body;
                const operation = 'C';
                const dataComplet = (0, getLabByToken_1.getLabByToken)(req, dataIncomplett);
                yield segurity.tokenAuthenticatorByEndpoint(protocols_1.Tables.exam_Model, operation, req);
                const registered = yield repository.create(dataComplet);
                return res.status(200).json(registered.send);
            }
            catch (error) {
                return res.status(400).json({ message: "Erro ao criar novo Modelo de Exame", error: error.message });
            }
            finally {
                repository.disconnect();
            }
        });
    }
    getAllExamsByAgrement(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new Agreement_ExamRepository_1.Agreement_ExamRepository();
            const segurity = new segurity_1.Security();
            try {
                const operation = 'C';
                yield segurity.tokenAuthenticatorByEndpoint(protocols_1.Tables.exam_Model, operation, req);
                const finded = yield repository.getExamCodesByAgrements(req);
                return res.status(200).json(finded);
            }
            catch (error) {
                return res.status(400).json({ message: "Erro ao criar novo Modelo de Exame", error: error.message });
            }
            finally {
                repository.disconnect();
            }
        });
    }
    getAllAgrementsByExam(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new Agreement_ExamRepository_1.Agreement_ExamRepository();
            const segurity = new segurity_1.Security();
            try {
                const operation = 'C';
                yield segurity.tokenAuthenticatorByEndpoint(protocols_1.Tables.exam_Model, operation, req);
                const finded = yield repository.getAllFantazyNamesByExamCode(req);
                return res.status(200).json(finded);
            }
            catch (error) {
                return res.status(400).json({ message: "Erro ao criar novo Modelo de Exame", error: error.message });
            }
            finally {
                repository.disconnect();
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new Agreement_ExamRepository_1.Agreement_ExamRepository();
            const segurity = new segurity_1.Security();
            try {
                const operation = 'D';
                yield segurity.tokenAuthenticatorByEndpoint(protocols_1.Tables.exam_Model, operation, req);
                const one = yield repository.delete(req);
                return res.status(200).json({ message: one.send });
            }
            catch (error) {
                return res.status(400).json({ message: 'Erro ao deletar Modelo de Exame', error: error.message });
            }
            finally {
                repository.disconnect();
            }
        });
    }
}
exports.Agreement_ExamController = Agreement_ExamController;
