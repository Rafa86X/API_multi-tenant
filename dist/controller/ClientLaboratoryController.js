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
exports.ClientLaboratoryController = void 0;
const protocols_1 = require("../protocols/protocols");
const ClientLaboratoryRepository_1 = require("../repository/ClientLaboratoryRepository");
const segurity_1 = require("../security/segurity");
const validLaboratory_1 = require("../services/validLaboratory");
class ClientLaboratoryController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new ClientLaboratoryRepository_1.ClientLaboratory();
            const segurity = new segurity_1.Security();
            try {
                const data = req.body;
                const operation = 'C';
                yield segurity.tokenAuthenticatorByEndpoint(protocols_1.Tables.super, operation, req);
                (0, validLaboratory_1.validCreateLaboratory)(data);
                const registered = yield repository.create(data);
                return res.status(200).json(registered.send);
            }
            catch (error) {
                return res.status(400).json({ message: "Erro ao criar novo laboratório.", error: error.message });
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new ClientLaboratoryRepository_1.ClientLaboratory();
            const segurity = new segurity_1.Security();
            try {
                const operation = 'R';
                yield segurity.tokenAuthenticatorByEndpoint(protocols_1.Tables.super, operation, req);
                req.repository = repository;
                next();
            }
            catch (error) {
                return res.status(400).json({ message: 'Erro ao buscar laboratórios', error: error.message });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new ClientLaboratoryRepository_1.ClientLaboratory();
            const segurity = new segurity_1.Security();
            try {
                const operation = 'R';
                yield segurity.tokenAuthenticatorByEndpoint(protocols_1.Tables.super, operation, req);
                const one = yield repository.getOne(req);
                return res.status(200).json(one.send);
            }
            catch (error) {
                return res.status(400).json({ message: 'Erro ao buscar pelo laboratório', error: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new ClientLaboratoryRepository_1.ClientLaboratory();
            const segurity = new segurity_1.Security();
            try {
                const data = req.body;
                const operation = 'U';
                yield segurity.tokenAuthenticatorByEndpoint(protocols_1.Tables.super, operation, req);
                const updated = yield repository.update(req);
                (0, validLaboratory_1.validUpateLaboratory)(data);
                return res.status(200).json(updated.send);
            }
            catch (error) {
                return res.status(400).json({ message: 'Erro ao atualizar laboratório', error: error.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new ClientLaboratoryRepository_1.ClientLaboratory();
            const segurity = new segurity_1.Security();
            try {
                const operation = 'D';
                yield segurity.tokenAuthenticatorByEndpoint(protocols_1.Tables.super, operation, req);
                const one = yield repository.delete(req);
                return res.status(200).json(one.send);
            }
            catch (error) {
                return res.status(400).json({ message: 'Erro ao tentar inativar laboratório', error: error.message });
            }
        });
    }
}
exports.ClientLaboratoryController = ClientLaboratoryController;
