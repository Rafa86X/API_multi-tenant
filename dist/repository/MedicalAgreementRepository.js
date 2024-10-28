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
exports.MedicalAgreementRepository = void 0;
const client_1 = require("@prisma/client");
const SingletonPrisma_1 = __importDefault(require("../ASingletonPrismaClient/SingletonPrisma"));
class MedicalAgreementRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const one = yield SingletonPrisma_1.default.medicalAgreement.findMany({
                    where: {
                        id_clientLaboratory: Number(data.id_clientLaboratory),
                        cnpj: data.cnpj
                    }
                });
                if (one.length != 0) {
                    throw new Error(`Já existe um conênio cadastrado com o  numero CNPJ: ${data.cnpj} nesse laboratório de Id: ${data.id_clientLaboratory}.`);
                }
                const created = yield SingletonPrisma_1.default.medicalAgreement.create({
                    data: {
                        id_clientLaboratory: data.id_clientLaboratory,
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
                    }
                });
                return {
                    statusCode: 200,
                    send: created,
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
                const one = yield SingletonPrisma_1.default.medicalAgreement.findUnique({
                    where: {
                        id: String(id),
                    }
                });
                return {
                    statusCode: 200,
                    send: one,
                };
            }
            catch (error) {
                return {
                    statusCode: 400,
                    send: error.message,
                };
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
                const many = yield SingletonPrisma_1.default.medicalAgreement.findMany({
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
    update(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return {
                    statusCode: 500,
                    send: 'Essa operação não deve ser executada, use updateByLab',
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
            try {
                return {
                    statusCode: 500,
                    send: 'Essa operação não deve ser executada, , use deleteByLab',
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
    getAllByLab(limit, page, lab) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skip = (page - 1) * limit;
                const many = yield SingletonPrisma_1.default.medicalAgreement.findMany({
                    skip: skip,
                    take: limit,
                    where: {
                        id_clientLaboratory: Number(lab)
                    }
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
    getOneByLab(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { lab, ma } = req.params;
                const one = yield SingletonPrisma_1.default.medicalAgreement.findMany({
                    where: {
                        id_clientLaboratory: Number(lab),
                        id: String(ma)
                    }
                });
                if (one.length == 0) {
                    throw new Error(`Nenhum convênio encontrado para este id ${ma} do Lab codigo ${lab}.`);
                }
                return {
                    statusCode: 200,
                    send: one,
                };
            }
            catch (error) {
                throw new Error(error.message);
            }
            finally {
                yield this.disconnect();
            }
        });
    }
    updateByLab(lab, ma, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updated = yield SingletonPrisma_1.default.medicalAgreement.update({
                    where: {
                        id_clientLaboratory: Number(lab),
                        id: String(ma)
                    },
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
                    }
                });
                return {
                    statusCode: 200,
                    send: updated,
                };
            }
            catch (error) {
                let errorMessage;
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    switch (error.code) {
                        case 'P2025':
                            errorMessage = `Nenhum convênio encontrado para este id ${ma} do Lab codigo ${lab}.`;
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
    deleteByLab(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { lab, ma } = req.params;
            try {
                const updated = yield SingletonPrisma_1.default.medicalAgreement.delete({
                    where: {
                        id_clientLaboratory: Number(lab),
                        id: String(ma)
                    }
                });
                return {
                    statusCode: 200,
                    send: ` Convênio nome: ${updated.fantazyName} de id:${updated.id} foi deletado com sucesso `,
                };
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    let errorMessage;
                    switch (error.code) {
                        case 'P2025':
                            errorMessage = `Nenhum convênio encontrado para este id ${ma} do Lab codigo ${lab}.`;
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
                const total = yield SingletonPrisma_1.default.medicalAgreement.count();
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
    countAllByLab(lab) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const total = yield SingletonPrisma_1.default.medicalAgreement.count({ where: {
                        id_clientLaboratory: Number(lab)
                    } });
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
exports.MedicalAgreementRepository = MedicalAgreementRepository;
