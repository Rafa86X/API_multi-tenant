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
exports.Agreement_ExamRepository = void 0;
const client_1 = require("@prisma/client");
const SingletonPrisma_1 = __importDefault(require("../ASingletonPrismaClient/SingletonPrisma"));
class Agreement_ExamRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const one = yield SingletonPrisma_1.default.medicalAgreement_ExamModel.findMany({
                    where: {
                        id_clientLaboratory: data.id_clientLaboratory,
                        id_MedicalAgreement: data.id_MedicalAgreement,
                        id_exam_model: data.id_exam_model
                    },
                });
                if (one.length != 0) {
                    throw new Error(`Já existe a relação entre esse Convênio e este Exame`);
                }
                const created = yield SingletonPrisma_1.default.medicalAgreement_ExamModel.create({
                    data: {
                        id_clientLaboratory: data.id_clientLaboratory,
                        id_MedicalAgreement: data.id_MedicalAgreement,
                        id_exam_model: data.id_exam_model
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
    getExamCodesByAgrements(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { lab } = req.params;
            const { fname } = req.body;
            try {
                const examCodes = yield SingletonPrisma_1.default.medicalAgreement.findMany({
                    where: {
                        id_clientLaboratory: Number(lab),
                        fantazyName: String(fname),
                    },
                    select: {
                        MedicalAgreement_ExamModel: {
                            select: {
                                Exam_Model: {
                                    select: {
                                        exam_code: true
                                    },
                                },
                            },
                        },
                    },
                });
                const codes = examCodes.flatMap(agreement => agreement.MedicalAgreement_ExamModel.flatMap(m => m.Exam_Model ? [m.Exam_Model.exam_code] : []));
                if (codes.length === 0) {
                    return {
                        statusCode: 404,
                        send: 'Nenhum exame cadastrado para esse convênio.',
                    };
                }
                return {
                    statusCode: 200,
                    send: codes,
                };
            }
            catch (error) {
                return {
                    statusCode: 500,
                    send: error.message,
                };
            }
            finally {
                yield this.disconnect();
            }
        });
    }
    getAllFantazyNamesByExamCode(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { lab } = req.params;
            const { examCode } = req.body;
            try {
                const agreements = yield SingletonPrisma_1.default.medicalAgreement.findMany({
                    where: {
                        id_clientLaboratory: Number(lab),
                        MedicalAgreement_ExamModel: {
                            some: {
                                Exam_Model: {
                                    exam_code: examCode,
                                },
                            },
                        },
                    },
                    select: {
                        fantazyName: true,
                    },
                });
                const fantazyNames = agreements.map(agreement => agreement.fantazyName);
                if (fantazyNames.length === 0) {
                    return {
                        statusCode: 404,
                        send: 'Nenhum convênio cadastrado para esse exame.',
                    };
                }
                return {
                    statusCode: 200,
                    send: fantazyNames,
                };
            }
            catch (error) {
                return {
                    statusCode: 500,
                    send: error.message,
                };
            }
            finally {
                yield this.disconnect();
            }
        });
    }
    delete(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { lab } = req.params;
            const { id_exam_model, id_MedicalAgreement } = req.body;
            try {
                yield SingletonPrisma_1.default.medicalAgreement_ExamModel.delete({
                    where: {
                        id_clientLaboratory_id_exam_model_id_MedicalAgreement: {
                            id_clientLaboratory: Number(lab),
                            id_exam_model: id_exam_model,
                            id_MedicalAgreement: id_MedicalAgreement
                        }
                    }
                });
                return {
                    statusCode: 500,
                    send: 'Relação médico exame deletada com sucesso.',
                };
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    let errorMessage;
                    switch (error.code) {
                        case 'P2025':
                            errorMessage = `Nenhuma relação deste Exame id: ${id_exam_model} com este Convênio id: ${id_MedicalAgreement} encontrada para esse laboratório id: ${lab}.`;
                            break;
                        default:
                            errorMessage = error.message;
                            break;
                    }
                    throw new Error(errorMessage);
                }
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
exports.Agreement_ExamRepository = Agreement_ExamRepository;
