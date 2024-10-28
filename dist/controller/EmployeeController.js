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
exports.EmployeeController = void 0;
const protocols_1 = require("../protocols/protocols");
const EmployeeRepositoy_1 = require("../repository/EmployeeRepositoy");
const segurity_1 = require("../security/segurity");
const validEmployee_1 = require("../services/validEmployee");
const getLabByToken_1 = require("../services/getLabByToken");
const ClientLaboratoryRepository_1 = require("../repository/ClientLaboratoryRepository");
class EmployeeController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repositoryLabClient = new ClientLaboratoryRepository_1.ClientLaboratory();
            const repositoryEmploye = new EmployeeRepositoy_1.EmployeeRepository();
            const segurity = new segurity_1.Security();
            try {
                const data = req.body;
                const login = (yield repositoryEmploye.getOnePassWord(data.login)).send;
                if (login == null) {
                    throw new Error("Login ou senha Inválido");
                }
                const labInfos = (yield repositoryLabClient.getOneByLoging(login.id_clientLaboratory)).send;
                const loginAproved = yield segurity.checkPassword(data.password, login, labInfos);
                return res.status(200).json(loginAproved);
            }
            catch (error) {
                console.log(error);
                return res.status(400).json({ message: "Login Reprovado", error: error.message });
            }
            finally {
                repositoryEmploye.disconnect();
                repositoryLabClient.disconnect();
            }
        });
    }
    createSuper(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new EmployeeRepositoy_1.EmployeeRepository();
            const segurity = new segurity_1.Security();
            try {
                const data = req.body;
                const operation = 'C';
                yield segurity.tokenAuthenticatorByEndpoint(protocols_1.Tables.super, operation, req);
                (0, validEmployee_1.validCreateEmployee)(data);
                const registered = yield repository.create(data);
                return res.status(200).json(registered.send);
            }
            catch (error) {
                return res.status(400).json({ message: "Erro ao criar novo funcionário", error: error.message });
            }
            finally {
                repository.disconnect();
            }
        });
    }
    getAllSuper(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new EmployeeRepositoy_1.EmployeeRepository();
            const segurity = new segurity_1.Security();
            try {
                const operation = 'C';
                yield segurity.tokenAuthenticatorByEndpoint(protocols_1.Tables.super, operation, req);
                req.repository = repository;
                next();
            }
            catch (error) {
                return res.status(400).json({ message: 'Erro ao buscar funcionaios', error: error.message });
            }
            finally {
                repository.disconnect();
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new EmployeeRepositoy_1.EmployeeRepository();
            const segurity = new segurity_1.Security();
            try {
                const dataIncomplett = req.body;
                const operation = 'C';
                const dataComplet = (0, getLabByToken_1.getLabByToken)(req, dataIncomplett);
                yield segurity.tokenAuthenticatorByEndpoint(protocols_1.Tables.employe, operation, req);
                (0, validEmployee_1.validCreateEmployee)(dataComplet);
                const registered = yield repository.create(dataComplet);
                return res.status(200).json(registered.send);
            }
            catch (error) {
                return res.status(400).json({ message: "Erro ao criar novo funcionário", error: error.message });
            }
            finally {
                repository.disconnect();
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new EmployeeRepositoy_1.EmployeeRepository();
            const segurity = new segurity_1.Security();
            try {
                const operation = 'R';
                yield segurity.tokenAuthenticatorByEndpoint(protocols_1.Tables.employe, operation, req);
                const one = yield repository.getOneByLab(req);
                return res.status(200).json(one.send);
            }
            catch (error) {
                return res.status(400).json({ message: 'Erro ao buscar por funcionário', error: error.message });
            }
            finally {
                repository.disconnect();
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new EmployeeRepositoy_1.EmployeeRepository();
            const segurity = new segurity_1.Security();
            try {
                const operation = 'R';
                yield segurity.tokenAuthenticatorByEndpoint(protocols_1.Tables.employe, operation, req);
                req.repository = repository;
                next();
            }
            catch (error) {
                return res.status(400).json({ message: 'Erro ao buscar funcionaios', error: error.message });
            }
            finally {
                repository.disconnect();
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new EmployeeRepositoy_1.EmployeeRepository();
            const segurity = new segurity_1.Security();
            try {
                let { lab, employee } = req.params;
                const data = req.body;
                const operation = 'U';
                yield segurity.tokenAuthenticatorByEndpoint(protocols_1.Tables.employe, operation, req);
                data.id_clientLaboratory = Number(lab);
                (0, validEmployee_1.validUpateEmployee)(data);
                const updated = yield repository.updateByLab(lab, employee, data);
                return res.status(200).json(updated.send);
            }
            catch (error) {
                return res.status(400).json({ message: 'Erro ao atualizar funcionario', error: error.message });
            }
            finally {
                repository.disconnect();
            }
        });
    }
    updatePassWord(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new EmployeeRepositoy_1.EmployeeRepository();
            const segurity = new segurity_1.Security();
            try {
                let { lab, employee } = req.params;
                const data = req.body;
                const operation = 'NP';
                yield segurity.tokenAuthenticatorByEndpoint(protocols_1.Tables.employe, operation, req);
                data.id_clientLaboratory = Number(lab);
                (0, validEmployee_1.validUpateEmployee)(data);
                const updated = yield repository.updatePassWord(lab, employee, data);
                return res.status(200).json(updated.send);
            }
            catch (error) {
                return res.status(400).json({ message: 'Erro ao atualizar senha', error: error.message });
            }
            finally {
                repository.disconnect();
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new EmployeeRepositoy_1.EmployeeRepository();
            const segurity = new segurity_1.Security();
            try {
                const operation = 'D';
                yield segurity.tokenAuthenticatorByEndpoint(protocols_1.Tables.employe, operation, req);
                const one = yield repository.deleteByLab(req);
                return res.status(200).json({ message: one.send });
            }
            catch (error) {
                return res.status(400).json({ message: 'Erro ao deletar funcionário', error: error.message });
            }
            finally {
                repository.disconnect();
            }
        });
    }
}
exports.EmployeeController = EmployeeController;
