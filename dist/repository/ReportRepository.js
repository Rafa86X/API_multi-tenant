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
exports.ReportRepository = void 0;
const SingletonPrisma_1 = __importDefault(require("../ASingletonPrismaClient/SingletonPrisma"));
class ReportRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const created = yield SingletonPrisma_1.default.report.create({
                    data: {
                        id_clientLaboratory: data.id_clientLaboratory,
                        lab_fantazyName: data.lab_fantazyName,
                        lab_cnpj: data.lab_cnpj,
                        lab_numberCouncilLab: data.lab_numberCouncilLab,
                        lab_state: data.lab_state,
                        lab_cep: data.lab_cep,
                        lab_street: data.lab_street,
                        lab_numberStreet: data.lab_numberStreet,
                        lab_neighborhood: data.lab_neighborhood,
                        lab_additionalInfo: data.lab_additionalInfo,
                        rt_lab_name: data.rt_lab_name,
                        rt_lab_council: data.rt_lab_council,
                        rt_lab_number_council: data.rt_lab_number_council,
                        signatory_counsil: data.signatory_counsil,
                        signatory_number_council: data.signatory_number_council,
                        signatory_name: data.signatory_name,
                        patient_name: data.patient_name,
                        patient_dateBirth: data.patient_dateBirth,
                        patient_gender: data.patient_gender,
                        medicalAgreement_cnpj: data.medicalAgreement_cnpj,
                        medicalAgreement_fantazyName: data.medicalAgreement_fantazyName,
                        doctor_requesting_name: data.doctor_requesting_name,
                        doctor_requesting_counsil: data.doctor_requesting_counsil,
                        doctor_requesting_numCounsil: data.doctor_requesting_numCounsil,
                        exam_body: data.exam_body,
                        exam_name: data.exam_name,
                        exam_date: data.exam_date,
                        report_date: data.report_date,
                        report_state: data.report_state,
                        price: data.price
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
    getOne(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return {
                    statusCode: 500,
                    send: 'Essa operação não deve ser executada, use getOneByLab',
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
                const many = yield SingletonPrisma_1.default.report.findMany({
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
                const { lab, report } = req.params;
                const one = yield SingletonPrisma_1.default.report.findMany({
                    where: {
                        id_clientLaboratory: Number(lab),
                        id: String(report)
                    }
                });
                if (one.length == 0) {
                    throw new Error(`Nenhum laudo este id: ${report} do Lab codigo: ${lab}.`);
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
    updateByLab(lab, report, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const one = yield SingletonPrisma_1.default.report.findMany({
                    where: {
                        id_clientLaboratory: Number(lab),
                        id: String(report),
                    },
                });
                if (one.length === 0) {
                    throw new Error(`Nenhum Laudo encontrado para este código id: ${report}.`);
                }
                const updated = yield SingletonPrisma_1.default.report.update({
                    where: { id: String(report) },
                    data: {
                        lab_fantazyName: data.lab_fantazyName,
                        lab_cnpj: data.lab_cnpj,
                        lab_numberCouncilLab: data.lab_numberCouncilLab,
                        lab_state: data.lab_state,
                        lab_cep: data.lab_cep,
                        lab_street: data.lab_street,
                        lab_numberStreet: data.lab_numberStreet,
                        lab_neighborhood: data.lab_neighborhood,
                        lab_additionalInfo: data.lab_additionalInfo,
                        rt_lab_name: data.rt_lab_name,
                        rt_lab_council: data.rt_lab_council,
                        rt_lab_number_council: data.rt_lab_number_council,
                        signatory_counsil: data.signatory_counsil,
                        signatory_number_council: data.signatory_number_council,
                        signatory_name: data.signatory_name,
                        patient_name: data.patient_name,
                        patient_dateBirth: data.patient_dateBirth,
                        patient_gender: data.patient_gender,
                        medicalAgreement_cnpj: data.medicalAgreement_cnpj,
                        medicalAgreement_fantazyName: data.medicalAgreement_fantazyName,
                        doctor_requesting_name: data.doctor_requesting_name,
                        doctor_requesting_counsil: data.doctor_requesting_counsil,
                        doctor_requesting_numCounsil: data.doctor_requesting_numCounsil,
                        exam_body: data.exam_body,
                        exam_name: data.exam_name,
                        exam_date: data.exam_date,
                        report_date: data.report_date,
                        report_state: data.report_state,
                        price: data.price,
                        paid: data.paid,
                        ative: data.ative
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
                const many = yield SingletonPrisma_1.default.report.findMany({
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
    deleteByLab(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let deletedReport;
            try {
                const { lab, report } = req.params;
                const reportData = yield SingletonPrisma_1.default.report.findUnique({
                    where: {
                        id_clientLaboratory: Number(lab),
                        id: String(report),
                    },
                });
                if (reportData == null) {
                    throw new Error(`Nenhum laudo encontrado para o ID: ${report}`);
                }
                if (reportData && reportData.ative === false) {
                    deletedReport = yield SingletonPrisma_1.default.report.delete({
                        where: {
                            id: String(report),
                        },
                    });
                }
                else {
                    throw new Error("O Laudo não foi deletado porque o campo 'ATIVO' não está falso.");
                }
                return {
                    statusCode: 200,
                    send: `Laudo de id:${deletedReport.id} foi deletado com sucesso.`,
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
    dasative(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const updated = yield SingletonPrisma_1.default.report.update({
                    where: {
                        id: String(id),
                    },
                    data: {
                        ative: false,
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
                yield this.disconnect();
            }
        });
    }
    countAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const total = yield SingletonPrisma_1.default.report.count();
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
                const total = yield SingletonPrisma_1.default.report.count({ where: {
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
exports.ReportRepository = ReportRepository;
