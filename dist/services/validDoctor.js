"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validCreateDoctor = validCreateDoctor;
exports.validUpateDoctor = validUpateDoctor;
const zod_1 = __importDefault(require("zod"));
function validCreateDoctor(data) {
    try {
        const schema = zod_1.default.object({
            id_clientLaboratory: zod_1.default.number().min(1, { message: "id_clientLaboratory não pode estar vazio." }),
            name: zod_1.default.string()
                .min(5, { message: "O campo 'NOME' deve ter no mínimo 5 caracteres." })
                .max(100, { message: "O campo 'NOME' deve ter no máximo 100 caracteres." }),
            typeDoctor: zod_1.default.string()
                .min(5, { message: "O campo 'TIPO DE PROFISSIONAL' deve ter no mínimo 5 caracteres." })
                .max(20, { message: "O campo 'TIPO DE PROFISSIONAL' deve ter no máximo 20 caracteres." }),
            council: zod_1.default.string()
                .min(2, { message: "O campo 'CONSELHO' deve ter no mínimo 2 caracteres." })
                .max(20, { message: "O campo 'CONSELHO' deve ter no máximo 20 caracteres." }),
            numberCouncil: zod_1.default.string()
                .min(3, { message: "O campo 'NUMERO CONSELHO' deve ter no mínimo 3 caracteres." })
                .max(20, { message: "O campo 'NUMERO CONSELHO' deve ter no máximo 20 caracteres." }),
            dateInative: zod_1.default.string()
                .max(8, { message: "O campo 'DATA DE INATIVAÇÃO' data de inativação deve ter no máximo 8 caracteres." }).nullable().optional(),
        });
        schema.parse(data);
    }
    catch (error) {
        const errorMessages = error.issues.map(issue => issue.message);
        throw new Error(errorMessages);
    }
}
function validUpateDoctor(data) {
    try {
        const schema = zod_1.default.object({
            id_clientLaboratory: zod_1.default.number().min(1, { message: "id_clientLaboratory não pode estar vazio." }).nullable().optional(),
            name: zod_1.default.string()
                .min(5, { message: "O campo 'NOME' deve ter no mínimo 5 caracteres." })
                .max(100, { message: "O campo 'NOME' deve ter no máximo 100 caracteres." }).nullable().optional(),
            typeDoctor: zod_1.default.string()
                .min(5, { message: "O campo 'TIPO DE PROFISSIONAL' deve ter no mínimo 5 caracteres." })
                .max(20, { message: "O campo 'TIPO DE PROFISSIONAL' deve ter no máximo 20 caracteres." }).nullable().optional(),
            council: zod_1.default.string()
                .min(2, { message: "O campo 'CONSELHO' deve ter no mínimo 2 caracteres." })
                .max(20, { message: "O campo 'CONSELHO' deve ter no máximo 20 caracteres." }).nullable().optional(),
            numberCouncil: zod_1.default.string()
                .min(3, { message: "O campo 'NUMERO CONSELHO' deve ter no mínimo 3 caracteres." })
                .max(20, { message: "O campo 'NUMERO CONSELHO' deve ter no máximo 20 caracteres." }).nullable().optional(),
            dateInative: zod_1.default.string()
                .length(10, { message: "O campo 'dateInative' deve ter exatamente 10 caracteres no formato dd/mm/aaaa" })
                .nullable().optional(),
        });
        schema.parse(data);
    }
    catch (error) {
        const errorMessages = error.issues.map(issue => issue.message);
        throw new Error(errorMessages);
    }
}
