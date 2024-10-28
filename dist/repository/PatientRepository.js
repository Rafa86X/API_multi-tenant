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
exports.PatientRepository = void 0;
const client_1 = require("@prisma/client");
const SingletonPrisma_1 = __importDefault(require("../ASingletonPrismaClient/SingletonPrisma"));
class PatientRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (data.id_medicalAgreement != null) {
                    const one = yield SingletonPrisma_1.default.medicalAgreement.findMany({
                        where: {
                            id_clientLaboratory: Number(data.id_clientLaboratory),
                            id: String(data.id_medicalAgreement)
                        }
                    });
                    if (one.length == 0) {
                        throw new Error(`Não existe cadastro de um convênio id: ${data.id_medicalAgreement} para o seu laboraório id: ${data.id_clientLaboratory}.`);
                    }
                }
                const created = yield SingletonPrisma_1.default.patient.create({
                    data: {
                        id_clientLaboratory: data.id_clientLaboratory,
                        name: data.name,
                        id_medicalAgreement: String(data.id_medicalAgreement),
                        dateBirth: data.dateBirth,
                        gender: data.gender,
                        cpf: data.cpf,
                        email: data.email,
                        phone: data.phone,
                        socialName: data.socialName
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
                const one = yield SingletonPrisma_1.default.patient.findUnique({
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
                const many = yield SingletonPrisma_1.default.patient.findMany({
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
                const many = yield SingletonPrisma_1.default.patient.findMany({
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
                const { lab, patient } = req.params;
                const one = yield SingletonPrisma_1.default.patient.findMany({
                    where: {
                        id_clientLaboratory: Number(lab),
                        id: String(patient)
                    }
                });
                if (one.length == 0) {
                    throw new Error(`Nenhum paciente encontrado para este id ${patient} do Lab codigo ${lab}.`);
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
    updateByLab(lab, patient, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updated = yield SingletonPrisma_1.default.patient.update({
                    where: {
                        id_clientLaboratory: Number(lab),
                        id: String(patient)
                    },
                    data: {
                        name: data.name,
                        id_medicalAgreement: data.id_medicalAgreement,
                        dateBirth: data.dateBirth,
                        gender: data.gender,
                        cpf: data.cpf,
                        email: data.email,
                        phone: data.phone,
                        socialName: data.socialName
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
                            errorMessage = `Nenhum paciente encontrado para este id ${patient} do Lab codigo ${lab}.`;
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
            const { lab, patient } = req.params;
            try {
                const updated = yield SingletonPrisma_1.default.patient.delete({
                    where: {
                        id_clientLaboratory: Number(lab),
                        id: String(patient)
                    }
                });
                return {
                    statusCode: 200,
                    send: `Paciente nome: ${updated.name} de id:${updated.id} foi deletado com sucesso.`,
                };
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    let errorMessage;
                    switch (error.code) {
                        case 'P2025':
                            errorMessage = `Nenhum paciente encontrado para este id ${patient} do Lab codigo ${lab}.`;
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
                const total = yield SingletonPrisma_1.default.patient.count();
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
                const total = yield SingletonPrisma_1.default.patient.count({ where: {
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
exports.PatientRepository = PatientRepository;
