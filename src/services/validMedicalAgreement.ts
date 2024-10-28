import z from 'zod';
import { IMedicalAgreement } from "../protocols/protocols";


export function validCreateMedicalAgreement(data:IMedicalAgreement):void | string[]{

    try {
      const employeeSchema = z.object({
        fantazyName: z.string()
            .min(5, { message: "O campo 'NOME FANTAZIA' deve ter no mínimo 5 caracteres." })
            .max(50, { message: "O campo 'NOME FANTAZIA' deve ter no máximo 50 caracteres." }),
        socialReason: z.string()
            .min(5, { message: "O campo 'RAZÃO SOCIAL' deve ter no mínimo 5 caracteres." })
            .max(50, { message: "O campo 'RAZÃO SOCIAL' deve ter no máximo 50 caracteres." }),
        cnpj: z.string()
            .min(5, { message: "O campo 'CNPJ' deve ter no mínimo 5 caracteres." })
            .max(20, { message: "O campo 'CNPJ' deve ter no máximo 20 caracteres." }),
        state: z.string()
            .min(2, { message: "O campo 'ESTADO' deve ter no mínimo 2 caracteres." })
            .max(50, { message: "O campo 'ESTADO' deve ter no máximo 50 caracteres." }),
        cep: z.string()
            .min(5, { message: "O campo 'CEP' deve ter no mínimo 5 caracteres." })
            .max(20, { message: "O campo 'CEP' deve ter no máximo 20 caracteres." }),
        street: z.string()
            .min(5, { message: "O campo 'RUA' deve ter no mínimo 5 caracteres." })
            .max(80, { message: "O campo 'RUA' deve ter no máximo 80 caracteres." }),
        number: z.string()
            .min(1, { message: "O campo 'NUMERO' deve ter no mínimo 1 caracteres." })
            .max(20, { message: "A campo 'NUMERO' deve ter no máximo 20 caracteres." }),
        neighborhood: z.string()
            .min(5, { message: "O campo 'BAIRRO' deve ter no mínimo 5 caracteres." })
            .max(50, { message: "O campo 'BAIRRO' deve ter no máximo 50 caracteres." }),
        additionalInfo: z.string()
            .max(100, { message: " O campo 'INFORMAÇOES ADICIONAIS' deve ter no máximo 100 caracteres." }),
        technicalManager: z.string()
            .min(5, { message: "A campo 'GERENTE TÉCNICO' deve ter no mínimo 5 caracteres." })
        .max(30, { message: "campo 'GERENTE TÉCNICO' deve ter no máximo 30 caracteres." }),
        financialManager: z.string()
            .min(5, { message: "O campo 'GERENTE FINANCEIRO' deve ter no mínimo 5 caracteres." })
            .max(30, { message: "O campo 'GERENTE FINACEIRO' deve ter no máximo 30 caracteres." }),
        email: z.string()
            .min(5, { message: "O campo 'EMAIL' deve ter no mínimo 5 caracteres." })
            .max(50, { message: "O campo 'EMAIL' deve ter no máximo 50 caracteres." }),
        phone: z.string()
            .min(8, { message: "O campo 'TELEFONE' deve ter no mínimo 8 caracteres." })
            .max(30, { message: "O campo 'TELEFONE' deve ter no máximo 30 caracteres." }),
    });
        
        employeeSchema.parse(data);       
    } catch (error) {
        const errorMessages = error.issues.map(issue => issue.message);
        throw new Error(errorMessages);
    }
    
}

export function validUpateMedicalAgreement(data:IMedicalAgreement):void | string[]{

  try {
    const schema = z.object({
        fantazyName: z.string()
            .min(5, { message: "O campo 'NOME FANTAZIA' deve ter no mínimo 5 caracteres." })
            .max(50, { message: "O campo 'NOME FANTAZIA' deve ter no máximo 50 caracteres." }).nullable().optional(),
        socialReason: z.string()
            .min(5, { message: "O campo 'RAZÃO SOCIAL' deve ter no mínimo 5 caracteres." })
            .max(50, { message: "O campo 'RAZÃO SOCIAL' deve ter no máximo 50 caracteres." }).nullable().optional(),
        cnpj: z.string()
            .min(5, { message: "O campo 'CNPJ' deve ter no mínimo 5 caracteres." })
            .max(20, { message: "O campo 'CNPJ' deve ter no máximo 20 caracteres." }).nullable().optional(),
        state: z.string()
            .min(2, { message: "O campo 'ESTADO' deve ter no mínimo 2 caracteres." })
            .max(50, { message: "O campo 'ESTADO' deve ter no máximo 50 caracteres." }).nullable().optional(),
        cep: z.string()
            .min(5, { message: "O campo 'CEP' deve ter no mínimo 5 caracteres." })
            .max(20, { message: "O campo 'CEP' deve ter no máximo 20 caracteres." }).nullable().optional(),
        street: z.string()
            .min(5, { message: "O campo 'RUA' deve ter no mínimo 5 caracteres." })
            .max(80, { message: "O campo 'RUA' deve ter no máximo 80 caracteres." }).nullable().optional(),
        number: z.string()
            .min(1, { message: "O campo 'NUMERO' deve ter no mínimo 1 caracteres." })
            .max(20, { message: "A campo 'NUMERO' deve ter no máximo 20 caracteres." }).nullable().optional(),
        neighborhood: z.string()
            .min(5, { message: "O campo 'BAIRRO' deve ter no mínimo 5 caracteres." })
            .max(50, { message: "O campo 'BAIRRO' deve ter no máximo 50 caracteres." }).nullable().optional(),
        additionalInfo: z.string()
            .max(100, { message: " O campo 'INFORMAÇOES ADICIONAIS' deve ter no máximo 100 caracteres." }).nullable().optional(),
        technicalManager: z.string()
            .min(5, { message: "A campo 'GERENTE TÉCNICO' deve ter no mínimo 5 caracteres." })
        .max(30, { message: "campo 'GERENTE TÉCNICO' deve ter no máximo 30 caracteres." }).nullable().optional(),
        financialManager: z.string()
            .min(5, { message: "O campo 'GERENTE FINANCEIRO' deve ter no mínimo 5 caracteres." })
            .max(30, { message: "O campo 'GERENTE FINACEIRO' deve ter no máximo 30 caracteres." }).nullable().optional(),
        email: z.string()
            .min(5, { message: "O campo 'EMAIL' deve ter no mínimo 5 caracteres." })
            .max(50, { message: "O campo 'EMAIL' deve ter no máximo 50 caracteres." }).nullable().optional(),
        phone: z.string()
            .min(8, { message: "O campo 'TELEFONE' deve ter no mínimo 8 caracteres." })
            .max(30, { message: "O campo 'TELEFONE' deve ter no máximo 30 caracteres." }).nullable().optional()
    });
      
    schema.parse(data);       
  } catch (error) {
      const errorMessages = error.issues.map(issue => issue.message);
      throw new Error(errorMessages);
  }
  
}
