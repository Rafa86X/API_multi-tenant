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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientLaboratory = void 0;
const SingletonPrisma_1 = __importDefault(require("../ASingletonPrismaClient/SingletonPrisma"));
const client_1 = require("@prisma/client");
class ClientLaboratory {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const created = yield SingletonPrisma_1.default.clientLaboratory.create({
                    data: {
                        fantazyName: data.fantazyName,
                        socialReason: data.socialReason,
                        councilLab: data.councilLab,
                        numberCouncilLab: data.numberCouncilLab,
                        cnpj: data.cnpj,
                        state: data.state,
                        cep: data.cep,
                        street: data.street,
                        number: data.number,
                        neighborhood: data.neighborhood,
                        additionalInfo: data.additionalInfo,
                        nameTechnicalManager: data.nameTechnicalManager,
                        council_Tec_Manager: data.council_Tec_Manager,
                        number_Council_Tec_Manager: data.number_Council_Tec_Manager,
                        nameFinancialManager: data.nameFinancialManager,
                        email: data.email,
                        phone: data.phone
                    },
                });
                return {
                    statusCode: 200,
                    send: created,
                };
            }
            catch (error) {
                return {
                    statusCode: 400,
                    send: error,
                };
            }
            finally {
                yield this.disconnect();
            }
        });
    }
    getOneByLoging(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const one = yield SingletonPrisma_1.default.clientLaboratory.findMany({
                    where: {
                        id: Number(id),
                    },
                });
                if (one.length === 0) {
                    throw new Error(`Nenhum Laboratório encontrado para este id ${id}.`);
                }
                return {
                    statusCode: 200,
                    send: one,
                };
            }
            catch (error) {
                throw new Error(error);
            }
            finally {
                yield this.disconnect();
            }
        });
    }
    getOne(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const one = yield SingletonPrisma_1.default.clientLaboratory.findMany({
                    where: {
                        id: Number(id),
                    },
                });
                if (one.length === 0) {
                    throw new Error(`Nenhum Laboratório encontrado para este id ${id}.`);
                }
                return {
                    statusCode: 200,
                    send: one,
                };
            }
            catch (error) {
                throw new Error(error);
            }
            finally {
                yield this.disconnect();
            }
        });
    }
    update(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const data = req.body;
                const one = yield SingletonPrisma_1.default.clientLaboratory.findMany({
                    where: {
                        id: Number(id),
                    },
                });
                if (one.length === 0) {
                    throw new Error(`Nenhum Laboratório encontrado para este id ${id}.`);
                }
                const updated = yield SingletonPrisma_1.default.clientLaboratory.update({
                    where: { id: Number(id) },
                    data: {
                        fantazyName: data.fantazyName,
                        socialReason: data.socialReason,
                        councilLab: data.councilLab,
                        numberCouncilLab: data.numberCouncilLab,
                        cnpj: data.cnpj,
                        state: data.state,
                        cep: data.cep,
                        street: data.street,
                        number: data.number,
                        neighborhood: data.neighborhood,
                        additionalInfo: data.additionalInfo,
                        nameTechnicalManager: data.nameTechnicalManager,
                        council_Tec_Manager: data.council_Tec_Manager,
                        number_Council_Tec_Manager: data.number_Council_Tec_Manager,
                        nameFinancialManager: data.nameFinancialManager,
                        email: data.email,
                        phone: data.phone,
                        active: data.active,
                        adminBlock: data.adminBlock,
                        paymentBlock: data.paymentBlock
                    },
                });
                return {
                    statusCode: 200,
                    send: updated,
                };
            }
            catch (error) {
                throw new Error(error);
            }
            finally {
                yield this.disconnect();
            }
        });
    }
    getAll(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skip = (page - 1) * limit;
                const many = yield SingletonPrisma_1.default.clientLaboratory.findMany({
                    skip: skip,
                    take: limit
                });
                return {
                    statusCode: 200,
                    send: many,
                };
            }
            catch (error) {
                return {
                    statusCode: 400,
                    send: error,
                };
            }
            finally {
                yield this.disconnect();
            }
        });
    }
    delete(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                yield SingletonPrisma_1.default.clientLaboratory.delete({
                    where: {
                        id: Number(id),
                    }
                });
                return {
                    statusCode: 200,
                    send: `Laboratório id ${id} deletado com sucesso.`,
                };
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    let errorMessage;
                    switch (error.code) {
                        case 'P2025':
                            errorMessage = `Nenhum laboratório encontrado para este Lab codigo ${id}.`;
                            break;
                        case 'P2003':
                            errorMessage = `O laboratório com código ${id} não pode ser excluído porque há dependências em outras tabelas. Verifique os registros relacionados a esse laboratório.`;
                            break;
                        default:
                            errorMessage = error.message;
                            break;
                    }
                    throw new Error(errorMessage);
                }
                else {
                    throw new Error(error.mensage);
                }
            }
            finally {
                yield this.disconnect();
            }
        });
    }
    countAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const total = yield SingletonPrisma_1.default.clientLaboratory.count();
                return total;
            }
            catch (error) {
                throw new Error(error.message);
            }
            finally {
                yield this.disconnect();
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield SingletonPrisma_1.default.$disconnect();
        });
    }
}
exports.ClientLaboratory = ClientLaboratory;
