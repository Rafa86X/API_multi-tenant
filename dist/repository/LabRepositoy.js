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
exports.LabRepository = void 0;
const client_1 = require("@prisma/client");
class LabRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prisma = new client_1.PrismaClient();
                const created = yield prisma.funcionario.create({ data: {
                        name: data.name,
                        laudo: JSON.stringify(data.laudo)
                    } });
                return {
                    statusCode: 200,
                    send: created
                };
            }
            catch (error) {
                return {
                    statusCode: 400,
                    send: error
                };
            }
        });
    }
    getOne(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const prisma = new client_1.PrismaClient();
                const created = yield prisma.funcionario.findUnique({
                    where: {
                        id: Number(id)
                    }
                });
                return {
                    statusCode: 200,
                    send: created
                };
            }
            catch (error) {
                return {
                    statusCode: 400,
                    send: error
                };
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return {
                    statusCode: 200,
                    send: 'ok'
                };
            }
            catch (error) {
                return {
                    statusCode: 400,
                    send: error
                };
            }
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return {
                    statusCode: 200,
                    send: 'ok'
                };
            }
            catch (error) {
                return {
                    statusCode: 400,
                    send: 'nao ok'
                };
            }
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return {
                    statusCode: 200,
                    send: 'ok'
                };
            }
            catch (error) {
                return {
                    statusCode: 400,
                    send: 'nao ok'
                };
            }
        });
    }
}
exports.LabRepository = LabRepository;
