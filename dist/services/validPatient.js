"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validCreatePatient = validCreatePatient;
exports.validUpatePatient = validUpatePatient;
const zod_1 = __importDefault(require("zod"));
function validCreatePatient(data) {
    try {
        const schema = zod_1.default.object({
            id_clientLaboratory: zod_1.default.number().min(1, { message: "O campo 'id_clientLaboratory' não pode estar vazio." }),
            name: zod_1.default.string()
                .max(100, { message: "O campo 'NOME' deve ter no máximo 100 caracteres." }),
            id_medicalAgreement: zod_1.default.string().min(1, { message: "O campo 'ID CONVENIO' não pode estar vazio." }),
            dateBirth: zod_1.default.string()
                .length(10, { message: "O campo 'DATA DE NACIMENTO' deve ter exatamente 10 caracteres no formato dd/mm/aaaa" }),
            gender: zod_1.default.string()
                .refine(val => ["masculino", "feminino"].includes(val), {
                message: "O valor do campo 'SEXO' deve ser 'masculino' ou 'feminino'."
            }),
            cpf: zod_1.default.string()
                .max(11, { message: "O campo 'CPF' deve ter no máximo 11 caracteres." }),
            email: zod_1.default.string()
                .max(50, { message: "O campo 'EMAIL' deve ter no máximo 50 caracteres." }),
            phone: zod_1.default.string()
                .max(20, { message: "O campo 'TELEFONE' deve ter no máximo 20 caracteres." }),
            socialName: zod_1.default.string()
                .max(100, { message: "O campo 'NOME SOCIAL' deve ter no máximo 100 caracteres." }),
        });
        schema.parse(data);
    }
    catch (error) {
        const errorMessages = error.issues.map(issue => issue.message);
        throw new Error(errorMessages);
    }
}
function validUpatePatient(data) {
    try {
        const schema = zod_1.default.object({
            name: zod_1.default.string()
                .max(100, { message: "O campo 'NOME' deve ter no máximo 100 caracteres." }).nullable().optional(),
            id_medicalAgreement: zod_1.default.string().min(1, { message: "O campo 'ID CONVENIO' não pode estar vazio." }).nullable().optional(),
            dateBirth: zod_1.default.string()
                .length(10, { message: "O campo 'DATA DE NACIMENTO' deve ter exatamente 10 caracteres no formato dd/mm/aaaa" }).nullable().optional(),
            gender: zod_1.default.string()
                .refine(val => ["masculino", "feminino"].includes(val), { message: "O valor do campo 'SEXO' deve ser 'masculino' ou 'feminino'." }).nullable().optional(),
            cpf: zod_1.default.string()
                .max(11, { message: "O campo 'CPF' deve ter no máximo 11 caracteres." }).nullable().optional(),
            email: zod_1.default.string()
                .max(50, { message: "O campo 'EMAIL' deve ter no máximo 50 caracteres." }).nullable().optional(),
            phone: zod_1.default.string()
                .max(20, { message: "O campo 'TELEFONE' deve ter no máximo 20 caracteres." }).nullable().optional(),
            socialName: zod_1.default.string()
                .max(100, { message: "O campo 'NOME SOCIAL' deve ter no máximo 100 caracteres." }).nullable().optional(),
        });
        schema.parse(data);
    }
    catch (error) {
        const errorMessages = error.issues.map(issue => issue.message);
        throw new Error(errorMessages);
    }
}
