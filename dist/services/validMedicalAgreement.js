"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validCreateMedicalAgreement = validCreateMedicalAgreement;
exports.validUpateMedicalAgreement = validUpateMedicalAgreement;
const zod_1 = __importDefault(require("zod"));
function validCreateMedicalAgreement(data) {
    try {
        const employeeSchema = zod_1.default.object({
            fantazyName: zod_1.default.string()
                .min(5, { message: "O campo 'NOME FANTAZIA' deve ter no mínimo 5 caracteres." })
                .max(50, { message: "O campo 'NOME FANTAZIA' deve ter no máximo 50 caracteres." }),
            socialReason: zod_1.default.string()
                .min(5, { message: "O campo 'RAZÃO SOCIAL' deve ter no mínimo 5 caracteres." })
                .max(50, { message: "O campo 'RAZÃO SOCIAL' deve ter no máximo 50 caracteres." }),
            cnpj: zod_1.default.string()
                .min(5, { message: "O campo 'CNPJ' deve ter no mínimo 5 caracteres." })
                .max(20, { message: "O campo 'CNPJ' deve ter no máximo 20 caracteres." }),
            state: zod_1.default.string()
                .min(2, { message: "O campo 'ESTADO' deve ter no mínimo 2 caracteres." })
                .max(50, { message: "O campo 'ESTADO' deve ter no máximo 50 caracteres." }),
            cep: zod_1.default.string()
                .min(5, { message: "O campo 'CEP' deve ter no mínimo 5 caracteres." })
                .max(20, { message: "O campo 'CEP' deve ter no máximo 20 caracteres." }),
            street: zod_1.default.string()
                .min(5, { message: "O campo 'RUA' deve ter no mínimo 5 caracteres." })
                .max(80, { message: "O campo 'RUA' deve ter no máximo 80 caracteres." }),
            number: zod_1.default.string()
                .min(1, { message: "O campo 'NUMERO' deve ter no mínimo 1 caracteres." })
                .max(20, { message: "A campo 'NUMERO' deve ter no máximo 20 caracteres." }),
            neighborhood: zod_1.default.string()
                .min(5, { message: "O campo 'BAIRRO' deve ter no mínimo 5 caracteres." })
                .max(50, { message: "O campo 'BAIRRO' deve ter no máximo 50 caracteres." }),
            additionalInfo: zod_1.default.string()
                .max(100, { message: " O campo 'INFORMAÇOES ADICIONAIS' deve ter no máximo 100 caracteres." }),
            technicalManager: zod_1.default.string()
                .min(5, { message: "A campo 'GERENTE TÉCNICO' deve ter no mínimo 5 caracteres." })
                .max(30, { message: "campo 'GERENTE TÉCNICO' deve ter no máximo 30 caracteres." }),
            financialManager: zod_1.default.string()
                .min(5, { message: "O campo 'GERENTE FINANCEIRO' deve ter no mínimo 5 caracteres." })
                .max(30, { message: "O campo 'GERENTE FINACEIRO' deve ter no máximo 30 caracteres." }),
            email: zod_1.default.string()
                .min(5, { message: "O campo 'EMAIL' deve ter no mínimo 5 caracteres." })
                .max(50, { message: "O campo 'EMAIL' deve ter no máximo 50 caracteres." }),
            phone: zod_1.default.string()
                .min(8, { message: "O campo 'TELEFONE' deve ter no mínimo 8 caracteres." })
                .max(30, { message: "O campo 'TELEFONE' deve ter no máximo 30 caracteres." }),
        });
        employeeSchema.parse(data);
    }
    catch (error) {
        const errorMessages = error.issues.map(issue => issue.message);
        throw new Error(errorMessages);
    }
}
function validUpateMedicalAgreement(data) {
    try {
        const schema = zod_1.default.object({
            fantazyName: zod_1.default.string()
                .min(5, { message: "O campo 'NOME FANTAZIA' deve ter no mínimo 5 caracteres." })
                .max(50, { message: "O campo 'NOME FANTAZIA' deve ter no máximo 50 caracteres." }).nullable().optional(),
            socialReason: zod_1.default.string()
                .min(5, { message: "O campo 'RAZÃO SOCIAL' deve ter no mínimo 5 caracteres." })
                .max(50, { message: "O campo 'RAZÃO SOCIAL' deve ter no máximo 50 caracteres." }).nullable().optional(),
            cnpj: zod_1.default.string()
                .min(5, { message: "O campo 'CNPJ' deve ter no mínimo 5 caracteres." })
                .max(20, { message: "O campo 'CNPJ' deve ter no máximo 20 caracteres." }).nullable().optional(),
            state: zod_1.default.string()
                .min(2, { message: "O campo 'ESTADO' deve ter no mínimo 2 caracteres." })
                .max(50, { message: "O campo 'ESTADO' deve ter no máximo 50 caracteres." }).nullable().optional(),
            cep: zod_1.default.string()
                .min(5, { message: "O campo 'CEP' deve ter no mínimo 5 caracteres." })
                .max(20, { message: "O campo 'CEP' deve ter no máximo 20 caracteres." }).nullable().optional(),
            street: zod_1.default.string()
                .min(5, { message: "O campo 'RUA' deve ter no mínimo 5 caracteres." })
                .max(80, { message: "O campo 'RUA' deve ter no máximo 80 caracteres." }).nullable().optional(),
            number: zod_1.default.string()
                .min(1, { message: "O campo 'NUMERO' deve ter no mínimo 1 caracteres." })
                .max(20, { message: "A campo 'NUMERO' deve ter no máximo 20 caracteres." }).nullable().optional(),
            neighborhood: zod_1.default.string()
                .min(5, { message: "O campo 'BAIRRO' deve ter no mínimo 5 caracteres." })
                .max(50, { message: "O campo 'BAIRRO' deve ter no máximo 50 caracteres." }).nullable().optional(),
            additionalInfo: zod_1.default.string()
                .max(100, { message: " O campo 'INFORMAÇOES ADICIONAIS' deve ter no máximo 100 caracteres." }).nullable().optional(),
            technicalManager: zod_1.default.string()
                .min(5, { message: "A campo 'GERENTE TÉCNICO' deve ter no mínimo 5 caracteres." })
                .max(30, { message: "campo 'GERENTE TÉCNICO' deve ter no máximo 30 caracteres." }).nullable().optional(),
            financialManager: zod_1.default.string()
                .min(5, { message: "O campo 'GERENTE FINANCEIRO' deve ter no mínimo 5 caracteres." })
                .max(30, { message: "O campo 'GERENTE FINACEIRO' deve ter no máximo 30 caracteres." }).nullable().optional(),
            email: zod_1.default.string()
                .min(5, { message: "O campo 'EMAIL' deve ter no mínimo 5 caracteres." })
                .max(50, { message: "O campo 'EMAIL' deve ter no máximo 50 caracteres." }).nullable().optional(),
            phone: zod_1.default.string()
                .min(8, { message: "O campo 'TELEFONE' deve ter no mínimo 8 caracteres." })
                .max(30, { message: "O campo 'TELEFONE' deve ter no máximo 30 caracteres." }).nullable().optional()
        });
        schema.parse(data);
    }
    catch (error) {
        const errorMessages = error.issues.map(issue => issue.message);
        throw new Error(errorMessages);
    }
}
