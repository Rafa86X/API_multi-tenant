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
exports.ClientLaboratory = void 0;
const client_1 = require("@prisma/client");
class ClientLaboratory {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const created = yield this.prisma.clientLaboratory.create({
                    data: {
                        fantazyName: data.fantazyName,
                        socialReason: data.socialReason,
                        cnpj: data.cnpj,
                        state: data.state,
                        cep: data.cep,
                        street: data.street,
                        number: data.number,
                        neighborhood: data.neighborhood,
                        additionalInfo: data.additionalInfo,
                        technicalManager: data.technicalManager,
                        financialManager: data.financialManager,
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
                this.disconnect();
            }
        });
    }
    getOne(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const one = yield this.prisma.clientLaboratory.findUnique({
                    where: {
                        id: Number(id),
                    },
                });
                return {
                    statusCode: 200,
                    send: one,
                };
            }
            catch (error) {
                return {
                    statusCode: 400,
                    send: error,
                };
            }
            finally {
                this.disconnect();
            }
        });
    }
    update(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const data = req.body;
                const updated = yield this.prisma.clientLaboratory.update({
                    where: { id: Number(id) },
                    data: {
                        fantazyName: data.fantazyName,
                        socialReason: data.socialReason,
                        cnpj: data.cnpj,
                        state: data.state,
                        cep: data.cep,
                        street: data.street,
                        number: data.number,
                        neighborhood: data.neighborhood,
                        additionalInfo: data.additionalInfo,
                        technicalManager: data.technicalManager,
                        financialManager: data.financialManager,
                        email: data.email,
                        phone: data.phone,
                    },
                });
                return {
                    statusCode: 200,
                    send: updated,
                };
            }
            catch (error) {
                return {
                    statusCode: 400,
                    send: "nao ok",
                };
            }
            finally {
                this.disconnect();
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const many = yield this.prisma.clientLaboratory.findMany();
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
                this.disconnect();
            }
        });
    }
    delete(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const updated = yield this.prisma.clientLaboratory.update({
                    where: {
                        id: Number(id),
                    },
                    data: {
                        active: false,
                    },
                });
                return {
                    statusCode: 200,
                    send: updated,
                };
            }
            catch (error) {
                return {
                    statusCode: 400,
                    send: error,
                };
            }
            finally {
                this.disconnect();
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.$disconnect();
        });
    }
}
exports.ClientLaboratory = ClientLaboratory;
