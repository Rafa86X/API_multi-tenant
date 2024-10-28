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
exports.EmployeeRepository = void 0;
const client_1 = require("@prisma/client");
const segurity_1 = require("../security/segurity");
class EmployeeRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
        this.security = new segurity_1.Security();
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //laudo:JSON.stringify(data.laudo)
            try {
                const created = yield this.prisma.employee.create({
                    data: {
                        id_clientLaboratory: data.id_clientLaboratory,
                        name: data.name,
                        login: data.login,
                        password: yield this.security.encript(data.password),
                        dateInative: data.dateInative,
                        role_id: data.role_id,
                        newPassWord: data.newPassWord
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
                const one = yield this.prisma.employee.findUnique({
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
    getOnePassWord(loginUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const login = yield this.prisma.employee.findUnique({
                    where: {
                        login: loginUser,
                    },
                    select: {
                        password: true,
                        name: true,
                        role_id: true,
                        id_clientLaboratory: true
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
                    send: null,
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
                const updated = yield this.prisma.employee.update({
                    where: { id: Number(id) },
                    data: {
                        id_clientLaboratory: data.id_clientLaboratory,
                        name: data.name,
                        login: data.login,
                        password: data.password,
                        dateInative: data.dateInative,
                        role_id: data.role_id,
                        newPassWord: data.newPassWord
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
                const many = yield this.prisma.employee.findMany();
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
                const updated = yield this.prisma.employee.update({
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
exports.EmployeeRepository = EmployeeRepository;
