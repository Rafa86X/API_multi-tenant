"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validCreateExam_Model = validCreateExam_Model;
exports.validUpateExam_Model = validUpateExam_Model;
const zod_1 = __importDefault(require("zod"));
function validCreateExam_Model(data) {
    try {
        const schema = zod_1.default.object({
            id_clientLaboratory: zod_1.default.number().min(1, { message: "id_clientLaboratory não pode estar vazio." }),
            name: zod_1.default.string()
                .min(5, { message: "O campo 'NOME' deve ter no mínimo 5 caracteres." })
                .max(100, { message: "O campo 'NOME' deve ter no máximo 100 caracteres." }),
            exam_code: zod_1.default.string()
                .min(2, { message: "O campo 'CÓDIGO DO EXAME' deve ter no mínimo 2 caracteres." })
                .max(20, { message: "O campo 'CÓDIGO DO EXAME' deve ter no máximo 20 caracteres." }),
            deadline_days: zod_1.default.string()
                .min(2, { message: "O campo 'PRAZO EM DIAS' deve ter no mínimo 2 caracteres." })
                .max(20, { message: "O campo 'PRAZO EM DIAS' deve ter no máximo 20 caracteres." }),
            price: zod_1.default.string()
                .min(3, { message: "O campo 'PREÇO' deve ter no mínimo 3 caracteres." })
                .max(20, { message: "O campo 'PREÇO' deve ter no máximo 20 caracteres." }),
        });
        schema.parse(data);
    }
    catch (error) {
        const errorMessages = error.issues.map(issue => issue.message);
        throw new Error(errorMessages);
    }
}
function validUpateExam_Model(data) {
    try {
        const schema = zod_1.default.object({
            id_clientLaboratory: zod_1.default.number().min(1, { message: "id_clientLaboratory não pode estar vazio." }).nullable().optional(),
            name: zod_1.default.string()
                .min(5, { message: "O campo 'NOME' deve ter no mínimo 5 caracteres." })
                .max(100, { message: "O campo 'NOME' deve ter no máximo 100 caracteres." }).nullable().optional(),
            exam_code: zod_1.default.string()
                .min(5, { message: "O campo 'CÓDIGO DO EXAME' deve ter no mínimo 5 caracteres." })
                .max(20, { message: "O campo 'CÓDIGO DO EXAME' deve ter no máximo 20 caracteres." }).nullable().optional(),
            deadline_days: zod_1.default.string()
                .min(2, { message: "O campo 'PRAZO EM DIAS' deve ter no mínimo 2 caracteres." })
                .max(20, { message: "O campo 'PRAZO EM DIAS' deve ter no máximo 20 caracteres." }).nullable().optional(),
            price: zod_1.default.string()
                .min(3, { message: "O campo 'PREÇO' deve ter no mínimo 3 caracteres." })
                .max(20, { message: "O campo 'PREÇO' deve ter no máximo 20 caracteres." }).nullable().optional(),
            internet_delivery: zod_1.default.boolean().nullable().optional(),
        });
        schema.parse(data);
    }
    catch (error) {
        const errorMessages = error.issues.map(issue => issue.message);
        throw new Error(errorMessages);
    }
}
