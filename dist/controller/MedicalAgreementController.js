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
exports.MedicalAgreementController = void 0;
const protocols_1 = require("../protocols/protocols");
const segurity_1 = require("../security/segurity");
const getLabByToken_1 = require("../services/getLabByToken");
const MedicalAgreementRepository_1 = require("../repository/MedicalAgreementRepository");
const validMedicalAgreement_1 = require("../services/validMedicalAgreement");
class MedicalAgreementController {
    createSuper(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new MedicalAgreementRepository_1.MedicalAgreementRepository();
            const segurity = new segurity_1.Security();
            try {
                const data = req.body;
                const operation = 'C';
                yield segurity.tokenAuthenticatorByEndpoint(protocols_1.Tables.super, operation, req);
                (0, validMedicalAgreement_1.validCreateMedicalAgreement)(data);
                const registered = yield repository.create(data);
                return res.status(200).json(registered.send);
            }
            catch (error) {
                return res.status(400).json({ message: "Erro ao criar novo convênio", error: error.message });
            }
            finally {
                repository.disconnect();
            }
        });
    }
    getAllSuper(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new MedicalAgreementRepository_1.MedicalAgreementRepository();
            const segurity = new segurity_1.Security();
            try {
                const operation = 'C';
                yield segurity.tokenAuthenticatorByEndpoint(protocols_1.Tables.super, operation, req);
                req.repository = repository;
                next();
            }
            catch (error) {
                return res.status(400).json({ message: 'Erro ao buscar convênio', error: error.message });
            }
            finally {
                repository.disconnect();
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new MedicalAgreementRepository_1.MedicalAgreementRepository();
            const segurity = new segurity_1.Security();
            try {
                const dataIncomplett = req.body;
                const operation = 'C';
                const dataComplet = (0, getLabByToken_1.getLabByToken)(req, dataIncomplett);
                yield segurity.tokenAuthenticatorByEndpoint(protocols_1.Tables.medicalAgreement, operation, req);
                (0, validMedicalAgreement_1.validCreateMedicalAgreement)(dataComplet);
                const registered = yield repository.create(dataComplet);
                return res.status(200).json(registered.send);
            }
            catch (error) {
                return res.status(400).json({ message: "Erro ao criar novo convênio", error: error.message });
            }
            finally {
                repository.disconnect();
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new MedicalAgreementRepository_1.MedicalAgreementRepository();
            const segurity = new segurity_1.Security();
            try {
                const operation = 'R';
                yield segurity.tokenAuthenticatorByEndpoint(protocols_1.Tables.medicalAgreement, operation, req);
                const one = yield repository.getOneByLab(req);
                return res.status(200).json(one.send);
            }
            catch (error) {
                return res.status(400).json({ message: 'Erro ao buscar por convênio', error: error.message });
            }
            finally {
                repository.disconnect();
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new MedicalAgreementRepository_1.MedicalAgreementRepository();
            const segurity = new segurity_1.Security();
            try {
                const operation = 'R';
                yield segurity.tokenAuthenticatorByEndpoint(protocols_1.Tables.medicalAgreement, operation, req);
                req.repository = repository;
                next();
            }
            catch (error) {
                return res.status(400).json({ message: 'Erro ao buscar convênio', error: error.message });
            }
            finally {
                repository.disconnect();
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new MedicalAgreementRepository_1.MedicalAgreementRepository();
            const segurity = new segurity_1.Security();
            try {
                let { lab, ma } = req.params;
                const data = req.body;
                const operation = 'U';
                yield segurity.tokenAuthenticatorByEndpoint(protocols_1.Tables.medicalAgreement, operation, req);
                data.id_clientLaboratory = Number(lab);
                (0, validMedicalAgreement_1.validUpateMedicalAgreement)(data);
                const updated = yield repository.updateByLab(lab, ma, data);
                return res.status(200).json(updated.send);
            }
            catch (error) {
                return res.status(400).json({ message: 'Erro ao atualizar convênio', error: error.message });
            }
            finally {
                repository.disconnect();
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new MedicalAgreementRepository_1.MedicalAgreementRepository();
            const segurity = new segurity_1.Security();
            try {
                const operation = 'D';
                yield segurity.tokenAuthenticatorByEndpoint(protocols_1.Tables.medicalAgreement, operation, req);
                const one = yield repository.deleteByLab(req);
                return res.status(200).json({ message: one.send });
            }
            catch (error) {
                return res.status(400).json({ message: 'Erro ao deletar convênio', error: error.message });
            }
            finally {
                repository.disconnect();
            }
        });
    }
}
exports.MedicalAgreementController = MedicalAgreementController;
