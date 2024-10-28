"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validCreateLaboratory = validCreateLaboratory;
exports.validUpateLaboratory = validUpateLaboratory;
const zod_1 = __importDefault(require("zod"));
function validCreateLaboratory(data) {
    try {
        const schema = zod_1.default.object({
            fantazyName: zod_1.default.string()
                .min(5, { message: "O campo 'NOME FANTAZIA' deve ter no mínimo 5 caracteres." })
                .max(50, { message: "O campo 'NOME FANTAZIA' deve ter no máximo 50 caracteres." }),
            socialReason: zod_1.default.string()
                .min(5, { message: "O campo 'RAZÃO SOCIAL' deve ter no mínimo 5 caracteres." })
                .max(50, { message: "O campo 'RAZÃO SOCIAL' deve ter no máximo 50 caracteres." }),
            councilLab: zod_1.default.string()
                .min(3, { message: "O campo 'CONSELHO DO LABORATÓRIO' deve ter no mínimo 3 caracteres." })
                .max(20, { message: "O campo 'CONSELHO DO LABORATÓRIO' deve ter no máximo 20 caracteres." }),
            numberCouncilLab: zod_1.default.string()
                .min(3, { message: "O campo 'NÚMERO DO CONSELHO DO LABORATÓRIO' deve ter no mínimo 3 caracteres." })
                .max(20, { message: "O campo NÚMERO DO CONSELHO DO LABORATÓRIO' deve ter no máximo 20 caracteres." }),
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
            nameTechnicalManager: zod_1.default.string()
                .min(5, { message: "A campo 'RESPONSAVEL TÉCNICO' deve ter no mínimo 5 caracteres." })
                .max(30, { message: "campo 'RESPONSAVEL TÉCNICO' deve ter no máximo 30 caracteres." }),
            council_Tec_Manager: zod_1.default.string()
                .min(2, { message: "A campo 'CONSELHO DO LABORATÓRIO' deve ter no mínimo 2 caracteres." })
                .max(10, { message: "campo 'CONSELHO DO LABORATÓRIO' deve ter no máximo 10 caracteres." }),
            number_Council_Tec_Manager: zod_1.default.string()
                .min(4, { message: "A campo 'NÚMERO DO CONSELHO DO LABORATÓRIO' deve ter no mínimo 4 caracteres." })
                .max(20, { message: "campo 'NÚMERO DO CONSELHO DO LABORATÓRIO' deve ter no máximo 20 caracteres." }),
            nameFinancialManager: zod_1.default.string()
                .min(5, { message: "O campo 'GERENTE FINANCEIRO' deve ter no mínimo 5 caracteres." })
                .max(30, { message: "O campo 'GERENTE FINACEIRO' deve ter no máximo 30 caracteres." }),
            email: zod_1.default.string()
                .min(5, { message: "O campo 'EMAIL' deve ter no mínimo 5 caracteres." })
                .max(50, { message: "O campo 'EMAIL' deve ter no máximo 50 caracteres." }),
            phone: zod_1.default.string()
                .min(8, { message: "O campo 'TELEFONE' deve ter no mínimo 8 caracteres." })
                .max(30, { message: "O campo 'TELEFONE' deve ter no máximo 30 caracteres." }),
        });
        schema.parse(data);
    }
    catch (error) {
        const errorMessages = error.issues.map(issue => issue.message);
        throw new Error(errorMessages);
    }
}
function validUpateLaboratory(data) {
    try {
        const schema = zod_1.default.object({
            fantazyName: zod_1.default.string()
                .min(5, { message: "O campo 'NOME FANTAZIA' deve ter no mínimo 5 caracteres." })
                .max(50, { message: "O campo 'NOME FANTAZIA' deve ter no máximo 50 caracteres." }).nullable().optional(),
            socialReason: zod_1.default.string()
                .min(5, { message: "O campo 'RAZÃO SOCIAL' deve ter no mínimo 5 caracteres." })
                .max(50, { message: "O campo 'RAZÃO SOCIAL' deve ter no máximo 50 caracteres." }).nullable().optional(),
            councilLab: zod_1.default.string()
                .min(3, { message: "O campo 'CONSELHO DO LABORATÓRIO' deve ter no mínimo 3 caracteres." })
                .max(20, { message: "O campo 'CONSELHO DO LABORATÓRIO' deve ter no máximo 20 caracteres." }).nullable().optional(),
            numberCouncilLab: zod_1.default.string()
                .min(3, { message: "O campo 'NÚMERO DO CONSELHO DO LABORATÓRIO' deve ter no mínimo 3 caracteres." })
                .max(20, { message: "O campo NÚMERO DO CONSELHO DO LABORATÓRIO' deve ter no máximo 20 caracteres." }).nullable().optional(),
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
            nameTechnicalManager: zod_1.default.string()
                .min(5, { message: "A campo 'RESPONSAVEL TÉCNICO' deve ter no mínimo 5 caracteres." })
                .max(30, { message: "campo 'RESPONSAVEL TÉCNICO' deve ter no máximo 30 caracteres." }).nullable().optional(),
            council_Tec_Manager: zod_1.default.string()
                .min(2, { message: "A campo 'CONSELHO DO LABORATÓRIO' deve ter no mínimo 2 caracteres." })
                .max(10, { message: "campo 'CONSELHO DO LABORATÓRIO' deve ter no máximo 10 caracteres." }).nullable().optional(),
            number_Council_Tec_Manager: zod_1.default.string()
                .min(4, { message: "A campo 'NÚMERO DO CONSELHO DO LABORATÓRIO' deve ter no mínimo 4 caracteres." })
                .max(20, { message: "campo 'NÚMERO DO CONSELHO DO LABORATÓRIO' deve ter no máximo 20 caracteres." }).nullable().optional(),
            nameFinancialManager: zod_1.default.string()
                .min(5, { message: "O campo 'GERENTE FINANCEIRO' deve ter no mínimo 5 caracteres." })
                .max(30, { message: "O campo 'GERENTE FINACEIRO' deve ter no máximo 30 caracteres." }).nullable().optional(),
            email: zod_1.default.string()
                .min(5, { message: "O campo 'EMAIL' deve ter no mínimo 5 caracteres." })
                .max(50, { message: "O campo 'EMAIL' deve ter no máximo 50 caracteres." }).nullable().optional(),
            phone: zod_1.default.string()
                .min(8, { message: "O campo 'TELEFONE' deve ter no mínimo 8 caracteres." })
                .max(30, { message: "O campo 'TELEFONE' deve ter no máximo 30 caracteres." }).nullable().optional(),
            active: zod_1.default.boolean().nullable().optional(),
            adminBlock: zod_1.default.boolean().nullable().optional(),
            PaymentBlock: zod_1.default.boolean().nullable().optional()
        });
        schema.parse(data);
    }
    catch (error) {
        const errorMessages = error.issues.map(issue => issue.message);
        throw new Error(errorMessages);
    }
}
