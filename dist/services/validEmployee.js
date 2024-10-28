"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validCreateEmployee = validCreateEmployee;
exports.validUpateEmployee = validUpateEmployee;
const zod_1 = __importDefault(require("zod"));
function validCreateEmployee(data) {
    try {
        const schema = zod_1.default.object({
            id_clientLaboratory: zod_1.default.number().min(1, { message: "id_clientLaboratory não pode estar vazio." }),
            name: zod_1.default.string()
                .min(5, { message: "O campo 'NOME' deve ter no mínimo 5 caracteres." })
                .max(100, { message: "O campo 'NOME' deve ter no máximo 100 caracteres." }),
            login: zod_1.default.string()
                .min(5, { message: "O campo 'LOGIN' deve ter no mínimo 5 caracteres." })
                .max(20, { message: "O campo 'lOGIN' deve ter no máximo 20 caracteres." }),
            password: zod_1.default.string()
                .min(5, { message: "O campo 'SENHA' deve ter no mínimo 5 caracteres." })
                .max(20, { message: "O campo 'SENHA' deve ter no máximo 20 caracteres." }),
            counsil: zod_1.default.string()
                .min(2, { message: "A campo 'CONSELHO DO ANALISTA' deve ter no mínimo 2 caracteres." })
                .max(20, { message: "campo 'CONSELHO DO ANALISTA' deve ter no máximo 20 caracteres." }).nullable().optional(),
            number_council: zod_1.default.string()
                .min(4, { message: "A campo 'NÚMERO DO CONSELHO' deve ter no mínimo 4 caracteres." })
                .max(20, { message: "campo 'NÚMERO DO CONSELHO' deve ter no máximo 20 caracteres." }).nullable().optional(),
            medical_specialty: zod_1.default.string()
                .min(4, { message: "A campo 'NOME DA ESPECIALIDADE MÉDICA' deve ter no mínimo 4 caracteres." })
                .max(20, { message: "campo 'NOME DA ESPECIALIDADE MÉDICA' deve ter no máximo 20 caracteres." }).nullable().optional(),
            dateInative: zod_1.default.string()
                .length(10, { message: "O campo 'DATA DE INATIVAÇÃO' deve ter exatamente 10 caracteres no formato dd/mm/aaaa" })
                .nullable().optional(),
            role_id: zod_1.default.number()
                .int()
                .refine(val => [1, 2].includes(val), { message: "Selecione o Cargo" }),
            newPassWord: zod_1.default.string().nullable().optional(),
        });
        schema.parse(data);
    }
    catch (error) {
        const errorMessages = error.issues.map(issue => issue.message);
        throw new Error(errorMessages);
    }
}
function validUpateEmployee(data) {
    try {
        const schema = zod_1.default.object({
            id_clientLaboratory: zod_1.default.number().min(1, { message: "id_clientLaboratory não pode estar vazio." }),
            name: zod_1.default.string()
                .min(5, { message: "O campo 'NOME' deve ter no mínimo 5 caracteres." })
                .max(100, { message: "O campo 'NOME' deve ter no máximo 100 caracteres." }).nullable().optional(),
            login: zod_1.default.string()
                .min(5, { message: "O campo 'LOGIN' deve ter no mínimo 5 caracteres." })
                .max(20, { message: "O campo 'lOGIN' deve ter no máximo 20 caracteres." }).nullable().optional(),
            password: zod_1.default.string()
                .min(5, { message: "O campo 'SENHA' deve ter no mínimo 5 caracteres." })
                .max(20, { message: "O campo 'SENHA' deve ter no máximo 20 caracteres." }).nullable().optional(),
            counsil: zod_1.default.string()
                .min(2, { message: "A campo 'CONSELHO DO ANALISTA' deve ter no mínimo 2 caracteres." })
                .max(20, { message: "campo 'CONSELHO DO ANALISTA' deve ter no máximo 20 caracteres." }).nullable().optional(),
            number_council: zod_1.default.string()
                .min(4, { message: "A campo 'NÚMERO DO CONSELHO' deve ter no mínimo 4 caracteres." })
                .max(20, { message: "campo 'NÚMERO DO CONSELHO' deve ter no máximo 20 caracteres." }).nullable().optional(),
            medical_specialty: zod_1.default.string()
                .min(4, { message: "A campo 'NOME DA ESPECIALIDADE MÉDICA' deve ter no mínimo 4 caracteres." })
                .max(20, { message: "campo 'NOME DA ESPECIALIDADE MÉDICA' deve ter no máximo 20 caracteres." }).nullable().optional(),
            dateInative: zod_1.default.string()
                .length(10, { message: "O campo 'DATA DE INATIVAÇÃO' deve ter exatamente 10 caracteres no formato dd/mm/aaaa" })
                .nullable().optional(),
            newPassWord: zod_1.default.string().nullable().optional(),
            role_id: zod_1.default.number()
                .int().refine(val => [1, 2].includes(val), { message: "Selecione o Cargo" }).nullable().optional(),
            active: zod_1.default.boolean().nullable().optional(),
        });
        schema.parse(data);
    }
    catch (error) {
        const errorMessages = error.issues.map(issue => issue.message);
        throw new Error(errorMessages);
    }
}
