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
exports.EmployeeRepository = void 0;
const client_1 = require("@prisma/client");
const segurity_1 = require("../security/segurity");
const SingletonPrisma_1 = __importDefault(require("../ASingletonPrismaClient/SingletonPrisma"));
class EmployeeRepository {
    constructor() {
        this.security = new segurity_1.Security();
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const created = yield SingletonPrisma_1.default.employee.create({
                    data: {
                        id_clientLaboratory: data.id_clientLaboratory,
                        name: data.name,
                        login: data.login,
                        password: yield this.security.encript(data.password),
                        counsil: data.counsil ? data.counsil : null,
                        number_council: data.number_council ? data.number_council : null,
                        medical_specialty: data.medical_specialty ? data.medical_specialty : null,
                        signatory: data.signatory ? data.signatory : null,
                        dateInative: data.dateInative,
                        role_id: data.role_id,
                    },
                    select: {
                        id_clientLaboratory: true,
                        id: true,
                        name: true,
                        login: true,
                        password: false,
                        role_id: true,
                        active: true,
                        counsil: true,
                        number_council: true,
                        medical_specialty: true,
                        signatory: true,
                        dateInative: true,
                        newPassWord: true
                    }
                });
                return {
                    statusCode: 200,
                    send: created,
                };
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    let errorMessage;
                    switch (error.code) {
                        case 'P2002':
                            errorMessage = 'O login já está em uso. Por favor, escolha outro.';
                            break;
                        case 'P2003':
                            errorMessage = 'O id_clientLaboratory é inválido.';
                            break;
                        default:
                            errorMessage = 'Ocorreu um erro ao processar a solicitação.';
                            break;
                    }
                    throw new Error(errorMessage);
                }
                else {
                    throw new Error(error);
                }
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
                const one = yield SingletonPrisma_1.default.employee.findUnique({
                    where: {
                        id: String(id),
                    }, select: {
                        id_clientLaboratory: true,
                        id: true,
                        name: true,
                        login: true,
                        password: false,
                        role_id: true,
                        counsil: true,
                        number_council: true,
                        medical_specialty: true,
                        signatory: true,
                        active: true,
                        dateInative: true,
                        newPassWord: true
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
                const many = yield SingletonPrisma_1.default.employee.findMany({
                    skip: skip,
                    take: limit,
                    select: {
                        id_clientLaboratory: true,
                        id: true,
                        name: true,
                        login: true,
                        password: false,
                        role_id: true,
                        counsil: true,
                        number_council: true,
                        medical_specialty: true,
                        signatory: true,
                        active: true,
                        dateInative: true,
                        newPassWord: true
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
    getOnePassWord(loginUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const login = yield SingletonPrisma_1.default.employee.findUnique({
                    where: {
                        login: loginUser,
                    },
                    select: {
                        password: true,
                        name: true,
                        role_id: true,
                        id_clientLaboratory: true,
                        counsil: true,
                        number_council: true,
                        medical_specialty: true,
                        signatory: true,
                        newPassWord: true,
                        active: true
                    },
                });
                return {
                    statusCode: 200,
                    send: login
                };
            }
            catch (error) {
                return {
                    statusCode: 400,
                    send: null
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
                    send: 'Essa operação não deve ser executada, use deleteByLab',
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
                const many = yield SingletonPrisma_1.default.employee.findMany({
                    skip: skip,
                    take: limit,
                    where: {
                        id_clientLaboratory: Number(lab)
                    },
                    select: {
                        id_clientLaboratory: true,
                        id: true,
                        name: true,
                        login: true,
                        password: false,
                        counsil: true,
                        number_council: true,
                        medical_specialty: true,
                        signatory: true,
                        role_id: true,
                        active: true,
                        dateInative: true
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
                const { lab, employee } = req.params;
                const one = yield SingletonPrisma_1.default.employee.findMany({
                    where: {
                        id_clientLaboratory: Number(lab),
                        id: String(employee)
                    },
                    select: {
                        id_clientLaboratory: true,
                        id: true,
                        name: true,
                        login: true,
                        password: false,
                        counsil: true,
                        number_council: true,
                        medical_specialty: true,
                        signatory: true,
                        role_id: true,
                        active: true,
                        dateInative: true
                    }
                });
                if (one.length == 0) {
                    throw new Error(`Nenhum funcionario encontrado para este id ${employee} do Lab codigo ${lab}.`);
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
    updatePassWord(lab, employee, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield SingletonPrisma_1.default.employee.update({
                    where: {
                        id_clientLaboratory: Number(lab),
                        id: String(employee)
                    },
                    data: {
                        password: yield this.security.encript(data.password),
                        newPassWord: false
                    }
                });
                return {
                    statusCode: 200,
                    send: "Senha atualizada com sucesso."
                };
            }
            catch (error) {
                throw new Error(error.mensage);
            }
            finally {
                yield this.disconnect();
            }
        });
    }
    updateByLab(lab, employee, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updated = yield SingletonPrisma_1.default.employee.update({
                    where: {
                        id_clientLaboratory: Number(lab),
                        id: String(employee)
                    },
                    data: {
                        name: data.name,
                        login: data.login,
                        dateInative: data.dateInative,
                        role_id: data.role_id,
                        counsil: data.counsil,
                        number_council: data.number_council,
                        medical_specialty: data.medical_specialty,
                        signatory: data.signatory,
                        newPassWord: data.newPassWord,
                        active: data.active
                    },
                    select: {
                        id_clientLaboratory: true,
                        id: true,
                        name: true,
                        login: true,
                        password: false,
                        role_id: true,
                        counsil: true,
                        number_council: true,
                        medical_specialty: true,
                        signatory: true,
                        active: true,
                        dateInative: true,
                        newPassWord: true
                    }
                });
                return {
                    statusCode: 200,
                    send: updated,
                };
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    let errorMessage;
                    switch (error.code) {
                        case 'P2002':
                            errorMessage = 'O login já está em uso. Por favor, escolha outro.';
                            break;
                        case 'P2003':
                            errorMessage = 'O id_clientLaboratory é inválido.';
                            break;
                        case 'P2025':
                            errorMessage = `Nenhum profissional encontrado para este id ${employee} do Lab codigo ${lab}.`;
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
            const { lab, employee } = req.params;
            try {
                const updated = yield SingletonPrisma_1.default.employee.delete({
                    where: {
                        id_clientLaboratory: Number(lab),
                        id: String(employee)
                    },
                    select: {
                        id_clientLaboratory: true,
                        id: true,
                        name: true,
                        login: true,
                        password: false,
                        role_id: true,
                        counsil: true,
                        number_council: true,
                        medical_specialty: true,
                        signatory: true,
                        active: true,
                        dateInative: true
                    }
                });
                return {
                    statusCode: 200,
                    send: `Funcionario nome: ${updated.name} de id:${updated.id} foi deletado com sucesso `,
                };
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    let errorMessage;
                    switch (error.code) {
                        case 'P2025':
                            errorMessage = `Nenhum profissional encontrado para este id ${employee} do Lab codigo ${lab}.`;
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
                const total = yield SingletonPrisma_1.default.employee.count();
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
                const total = yield SingletonPrisma_1.default.employee.count({ where: {
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
    dateNow() {
        const dateNow = new Date();
        const formattedDateNow = `${String(dateNow.getDate()).padStart(2, '0')}-${String(dateNow.getMonth() + 1).padStart(2, '0')}-${dateNow.getFullYear()} ${String(dateNow.getHours()).padStart(2, '0')}-${String(dateNow.getMinutes()).padStart(2, '0')}-${String(dateNow.getSeconds()).padStart(2, '0')}`;
        return formattedDateNow;
    }
}
exports.EmployeeRepository = EmployeeRepository;
