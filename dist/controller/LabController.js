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
exports.LabController = void 0;
const LabRepositoy_1 = require("../repository/LabRepositoy");
class LabController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const repository = new LabRepositoy_1.LabRepository();
                const registrado = yield repository.create(data);
                return res.status(registrado.statusCode).json(registrado.send);
            }
            catch (error) {
                return res.status(400).json({ message: 'Erro ao criar lab' });
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
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new LabRepositoy_1.LabRepository();
                const one = yield repository.getOne(req);
                const laudo = one.send;
                console.log(laudo.laudo);
                return res.status(one.statusCode).json(one.send);
            }
            catch (error) {
                return res.status(400).json({ message: 'Erro ao criar lab' });
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
                    send: error
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
                    send: error
                };
            }
        });
    }
}
exports.LabController = LabController;
